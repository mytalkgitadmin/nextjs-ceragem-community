/**
 * 통합 API 클라이언트
 *
 * 이 모듈은 프로젝트의 주요 API 인터페이스를 제공합니다.
 * - BFF를 통한 FamilyTown API 호출 (기본)
 * - FETA 마이그레이션을 위한 호환성 레이어
 *
 * @module shared/api
 */

import axios, { AxiosInstance } from "axios";
import {
  bffRequest,
  bffGet,
  bffPost,
  bffPut,
  bffPatch,
  bffDelete,
  // Legacy exports for backward compatibility
  appApiFTRequest,
  bffAxiosInstance,
} from "./bff-client";
import { API_BASE_URL, getApiBaseUrl as _getApiBaseUrl } from "../config/api";

// ============================================================
// Re-exports
// ============================================================

// BFF 클라이언트 exports (새로운 코드에서 권장)
export {
  bffRequest,
  bffGet,
  bffPost,
  bffPut,
  bffPatch,
  bffDelete,
  bffAxiosInstance,
  type Endpoint,
} from "./bff-client";

// Direct 클라이언트 exports (특수한 경우에만 사용)
export {
  directRequest,
  directGet,
  directPost,
  directPut,
  directPatch,
  directDelete,
  directAxiosInstance,
  setDirectAuthToken,
  loadTokenFromStorage,
  createDirectFileUploadInstance,
  type DirectEndpoint,
} from "./direct-client";

// Legacy exports for backward compatibility (기존 코드 호환용)
export { appApiFTRequest };

// ============================================================
// Type Definitions
// ============================================================

export type RequestParams = Record<string, unknown>;

export interface ApiRequestOptions {
  url: string;
  data?: unknown;
  params?: RequestParams;
  pathParams?: Record<string, string | number>;
}

export type ApiResponse<T = unknown> = T;

// ============================================================
// Configuration
// ============================================================

// Base URL used by viewer/file helpers to compose absolute URLs via Next API proxy
export const BASE_URL = API_BASE_URL;
export const getApiBaseUrl = () => _getApiBaseUrl();

// ============================================================
// FETA 호환성 레이어
// 기존 FETA 코드와의 호환성을 위한 래퍼 함수들
// 새로운 코드에서는 bff* 함수들을 직접 사용하는 것을 권장
// ============================================================

/**
 * GET 요청 (FETA 호환용)
 * @deprecated 새로운 코드에서는 bffGet을 사용하세요
 */
export function get<T = unknown>(
  { url, params, pathParams }: ApiRequestOptions,
  _customAxios?: AxiosInstance
): Promise<T> {
  return bffGet<T>(url, {
    pathParams,
    query: params,
  });
}

/**
 * POST 요청 (FETA 호환용)
 * @deprecated 새로운 코드에서는 bffPost를 사용하세요
 */
export function post<T = unknown>(
  { url, data, params, pathParams }: ApiRequestOptions,
  _customAxios?: AxiosInstance
): Promise<T> {
  return bffPost<T>(url, data, {
    pathParams,
    query: params,
  });
}

/**
 * PUT 요청 (FETA 호환용)
 * @deprecated 새로운 코드에서는 bffPut을 사용하세요
 */
export function put<T = unknown>(
  { url, data, params, pathParams }: ApiRequestOptions,
  _customAxios?: AxiosInstance
): Promise<T> {
  return bffPut<T>(url, data, {
    pathParams,
    query: params,
  });
}

/**
 * PATCH 요청 (FETA 호환용)
 * @deprecated 새로운 코드에서는 bffPatch를 사용하세요
 */
export function patch<T = unknown>(
  { url, data, params, pathParams }: ApiRequestOptions,
  _customAxios?: AxiosInstance
): Promise<T> {
  return bffPatch<T>(url, data, {
    pathParams,
    query: params,
  });
}

/**
 * DELETE 요청 (FETA 호환용)
 * @deprecated 새로운 코드에서는 bffDelete를 사용하세요
 */
export function remove<T = unknown>(
  { url, data, params, pathParams }: ApiRequestOptions,
  _customAxios?: AxiosInstance
): Promise<T> {
  return bffDelete<T>(url, data, {
    pathParams,
    query: params,
  });
}

/**
 * 통합 API 요청 함수 (FETA 호환용)
 * @deprecated 새로운 코드에서는 bffRequest를 사용하세요
 */
export function apiRequest<T = unknown>(
  endpoint: {
    url: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  },
  data?: unknown,
  params?: RequestParams,
  pathParams?: Record<string, string | number>
): Promise<T> {
  switch (endpoint.method) {
    case "GET":
      return get<T>({ url: endpoint.url, params, pathParams });
    case "POST":
      return post<T>({ url: endpoint.url, data, params, pathParams });
    case "PUT":
      return put<T>({ url: endpoint.url, data, params, pathParams });
    case "PATCH":
      return patch<T>({ url: endpoint.url, data, params, pathParams });
    case "DELETE":
      return remove<T>({ url: endpoint.url, data, params, pathParams });
  }
}

// ============================================================
// File Upload Support
// ============================================================

/**
 * 파일 업로드용 Axios 인스턴스 생성
 * FormData 전송 시 브라우저가 자동으로 multipart/form-data 헤더를 설정하도록 함
 */
export function createFileUploadInstance(): AxiosInstance {
  return axios.create();
}
