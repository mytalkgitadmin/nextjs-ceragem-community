/**
 * Direct FamilyTown API Client
 *
 * ⚠️ 경고: 이 클라이언트는 브라우저에서 FamilyTown API를 직접 호출합니다.
 *
 * 주의사항:
 * - CORS 설정이 필요합니다
 * - 인증 토큰을 직접 관리해야 합니다 (보안 위험)
 * - 가능하면 BFF(bff-client.ts)를 사용하는 것을 권장합니다
 *
 * 사용 케이스:
 * - 개발/테스트 환경
 * - 특별한 요구사항이 있는 경우
 *
 * @module shared/api/direct-client
 */

import axios, { AxiosInstance, AxiosError } from "axios";
import qs from "qs";

type PathParams = Record<string, string | number>;
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface DirectEndpoint {
  url: string;
  method: HttpMethod;
}

/**
 * FamilyTown API의 실제 base URL을 가져옵니다
 * 환경 변수에서 설정되어야 합니다
 */
function getDirectApiBaseUrl(): string {
  // 브라우저 환경에서는 NEXT_PUBLIC_ 접두사가 필요합니다
  const baseUrl = process.env.NEXT_PUBLIC_FAMILYTOWN_API_BASE_URL;

  if (!baseUrl) {
    console.warn(
      "NEXT_PUBLIC_FAMILYTOWN_API_BASE_URL이 설정되지 않았습니다. " +
        "직접 API 호출이 실패할 수 있습니다."
    );
    return "";
  }

  return baseUrl.replace(/\/$/, ""); // 마지막 슬래시 제거
}

/**
 * FamilyTown API를 직접 호출하는 Axios 인스턴스
 * ⚠️ 보안 주의: 토큰 관리가 필요합니다
 */
export const directAxiosInstance: AxiosInstance = axios.create({
  baseURL: getDirectApiBaseUrl(),
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Accept-Language": "ko-KR,ko;",
    "X-DOMAIN-SERVICE": "FETA",
  },
  timeout: 15000, // BFF보다 약간 더 긴 타임아웃
  withCredentials: true, // 쿠키 전송을 위해 필요 (CORS 설정 필요)
  paramsSerializer: (params: Record<string, unknown>) =>
    qs.stringify(params, { arrayFormat: "repeat" }),
});

/**
 * 인증 토큰을 설정합니다
 * ⚠️ 보안 주의: 토큰이 브라우저에 노출됩니다
 *
 * @param token - Bearer 토큰
 */
export function setDirectAuthToken(token: string | null) {
  if (token) {
    directAxiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  } else {
    delete directAxiosInstance.defaults.headers.common["Authorization"];
  }
}

/**
 * 로컬 스토리지에서 토큰을 가져와 설정합니다
 * ⚠️ 보안 주의: 로컬 스토리지는 XSS 공격에 취약합니다
 */
export function loadTokenFromStorage() {
  if (typeof window === "undefined") return;

  const token = localStorage.getItem("familytown_token");
  if (token) {
    setDirectAuthToken(token);
  }
}

/**
 * URL 템플릿에서 pathParams를 치환하는 헬퍼 함수
 */
function buildPath(template: string, pathParams?: PathParams): string {
  if (!pathParams) return template;
  return Object.keys(pathParams).reduce((acc, key) => {
    const value = String(pathParams[key]);
    return acc.replace(new RegExp(`{${key}}`, "g"), encodeURIComponent(value));
  }, template);
}

/**
 * FamilyTown API를 직접 호출하는 함수
 *
 * @template TResponse - API 응답 타입
 * @param endpoint - API 엔드포인트 정보
 * @param body - 요청 본문
 * @param options - 추가 옵션 (pathParams, query, headers)
 * @returns API 응답 데이터
 *
 * @example
 * // 먼저 토큰 설정
 * setDirectAuthToken("your-token-here");
 *
 * // 또는 로컬 스토리지에서 로드
 * loadTokenFromStorage();
 *
 * // GET 요청
 * const users = await directRequest<User[]>({ url: "/users", method: "GET" });
 *
 * // POST 요청 with body
 * const newUser = await directRequest<User>(
 *   { url: "/users", method: "POST" },
 *   { name: "John", email: "john@example.com" }
 * );
 */
export async function directRequest<TResponse>(
  endpoint: DirectEndpoint,
  body?: unknown,
  options?: {
    pathParams?: PathParams;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): Promise<TResponse> {
  const path = buildPath(endpoint.url, options?.pathParams);
  const normalized = path.startsWith("/") ? path : "/" + path;

  const headers = {
    ...options?.headers,
  };

  try {
    const config = {
      method: endpoint.method,
      url: normalized,
      params: options?.query,
      headers,
      data: body,
    } as const;

    const { data } = await directAxiosInstance.request<TResponse>(config);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      // 401 에러 시 토큰 제거
      if (axiosError.response?.status === 401) {
        setDirectAuthToken(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("familytown_token");
        }
      }

      // CORS 에러 체크
      if (!axiosError.response && axiosError.message === "Network Error") {
        console.error(
          "네트워크 에러: CORS 정책을 확인하세요. " +
            "FamilyTown API가 현재 도메인에서의 요청을 허용하는지 확인하세요."
        );
      }
    }
    throw error;
  }
}

/**
 * Direct GET 요청 헬퍼
 */
export function directGet<T = unknown>(
  url: string,
  options?: {
    pathParams?: PathParams;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): Promise<T> {
  return directRequest<T>({ url, method: "GET" }, undefined, options);
}

/**
 * Direct POST 요청 헬퍼
 */
export function directPost<T = unknown>(
  url: string,
  body?: unknown,
  options?: {
    pathParams?: PathParams;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): Promise<T> {
  return directRequest<T>({ url, method: "POST" }, body, options);
}

/**
 * Direct PUT 요청 헬퍼
 */
export function directPut<T = unknown>(
  url: string,
  body?: unknown,
  options?: {
    pathParams?: PathParams;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): Promise<T> {
  return directRequest<T>({ url, method: "PUT" }, body, options);
}

/**
 * Direct PATCH 요청 헬퍼
 */
export function directPatch<T = unknown>(
  url: string,
  body?: unknown,
  options?: {
    pathParams?: PathParams;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): Promise<T> {
  return directRequest<T>({ url, method: "PATCH" }, body, options);
}

/**
 * Direct DELETE 요청 헬퍼
 */
export function directDelete<T = unknown>(
  url: string,
  body?: unknown,
  options?: {
    pathParams?: PathParams;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): Promise<T> {
  return directRequest<T>({ url, method: "DELETE" }, body, options);
}

/**
 * 파일 업로드용 Direct Axios 인스턴스 생성
 */
export function createDirectFileUploadInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: getDirectApiBaseUrl(),
    headers: {
      "Accept-Language": "ko-KR,ko;",
      "X-DOMAIN-SERVICE": "FETA",
      // Content-Type은 FormData 사용 시 브라우저가 자동 설정
    },
    timeout: 30000, // 파일 업로드는 더 긴 타임아웃
    withCredentials: true,
  });

  // 현재 설정된 토큰 복사
  const currentAuth =
    directAxiosInstance.defaults.headers.common["Authorization"];
  if (currentAuth) {
    instance.defaults.headers.common["Authorization"] = currentAuth;
  }

  return instance;
}
