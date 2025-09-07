/**
 * BFF (Backend for Frontend) Client
 *
 * Next.js API Routes를 거쳐서 FamilyTown API를 호출하는 클라이언트
 * - 인증 토큰은 httpOnly 쿠키로 관리되어 서버에서 자동 처리
 * - /api/familytown/* 프록시를 통해 FamilyTown API 호출
 *
 * @module shared/api/bff-client
 */

import axios, { AxiosInstance } from "axios";
import qs from "qs";
import { API_BASE_URL, DEFAULT_SERVICE_HEADERS } from "../config/api";

type PathParams = Record<string, string | number>;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface Endpoint {
  url: string;
  method: HttpMethod;
}

/**
 * BFF를 통해 FamilyTown API를 호출하는 Axios 인스턴스
 * Next.js API Routes (/api/familytown)를 거쳐서 호출
 */
export const bffAxiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL, // "/api/familytown"
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Accept-Language": "ko-KR,ko;",
  },
  timeout: 10000,
  paramsSerializer: (params: Record<string, unknown>) =>
    qs.stringify(params, { arrayFormat: "repeat" }),
  // 사용법: bffAxiosInstance.get("/search", { params: { tags: ["a", "b"] } });
});

/**
 * URL 템플릿에서 pathParams를 치환하는 헬퍼 함수
 * @example
 * buildPath("/users/{userId}/posts/{postId}", { userId: 1, postId: 2 })
 * // → "/users/1/posts/2"
 */
function buildPath(template: string, pathParams?: PathParams): string {
  if (!pathParams) return template;
  return Object.keys(pathParams).reduce((acc, key) => {
    const value = String(pathParams[key]);
    return acc.replace(new RegExp(`{${key}}`, "g"), encodeURIComponent(value));
  }, template);
}

/**
 * BFF를 거쳐서 FamilyTown API를 호출하는 함수
 *
 * @template TResponse - API 응답 타입
 * @param endpoint - API 엔드포인트 정보
 * @param body - 요청 본문
 * @param options - 추가 옵션 (pathParams, query, headers)
 * @returns API 응답 데이터
 *
 * @example
 * // GET 요청
 * const users = await bffRequest<User[]>({ url: "/users", method: "GET" });
 *
 * // POST 요청 with body
 * const newUser = await bffRequest<User>(
 *   { url: "/users", method: "POST" },
 *   { name: "John", email: "john@example.com" }
 * );
 *
 * // Path parameters 사용
 * const user = await bffRequest<User>(
 *   { url: "/users/{id}", method: "GET" },
 *   undefined,
 *   { pathParams: { id: 123 } }
 * );
 */
export async function bffRequest<TResponse>(
  endpoint: Endpoint,
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
    ...DEFAULT_SERVICE_HEADERS,
    ...options?.headers,
  };

  const config = {
    method: endpoint.method,
    url: normalized,
    params: options?.query,
    headers,
    data: body,
  } as const;

  const { data } = await bffAxiosInstance.request<TResponse>(config);
  return data;
}

/**
 * BFF GET 요청 헬퍼
 */
export function bffGet<T = unknown>(
  url: string,
  options?: {
    pathParams?: PathParams;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): Promise<T> {
  return bffRequest<T>({ url, method: "GET" }, undefined, options);
}

/**
 * BFF POST 요청 헬퍼
 */
export function bffPost<T = unknown>(
  url: string,
  body?: unknown,
  options?: {
    pathParams?: PathParams;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): Promise<T> {
  return bffRequest<T>({ url, method: "POST" }, body, options);
}

/**
 * BFF PUT 요청 헬퍼
 */
export function bffPut<T = unknown>(
  url: string,
  body?: unknown,
  options?: {
    pathParams?: PathParams;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): Promise<T> {
  return bffRequest<T>({ url, method: "PUT" }, body, options);
}

/**
 * BFF PATCH 요청 헬퍼
 */
export function bffPatch<T = unknown>(
  url: string,
  body?: unknown,
  options?: {
    pathParams?: PathParams;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): Promise<T> {
  return bffRequest<T>({ url, method: "PATCH" }, body, options);
}

/**
 * BFF DELETE 요청 헬퍼
 */
export function bffDelete<T = unknown>(
  url: string,
  body?: unknown,
  options?: {
    pathParams?: PathParams;
    query?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): Promise<T> {
  return bffRequest<T>({ url, method: "DELETE" }, body, options);
}

// 이전 버전과의 호환성을 위한 export (deprecated)
/**
 * @deprecated Use `bffRequest` instead
 */
export const appApiFTRequest = bffRequest;

/**
 * @deprecated Use `bffAxiosInstance` instead
 */
export const axiosInstance = bffAxiosInstance;
