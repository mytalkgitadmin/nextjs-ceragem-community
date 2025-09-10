import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";
import { ApiRequestOptions, Endpoint, RequestParams } from "./model";

/**
 * URL의 경로 파라미터를 대체하는 함수
 * @param url 파라미터가 포함된 URL 문자열 (/users/{userId} 형식)
 * @param params 대체할 파라미터 객체 ({ userId: '123' } 형식)
 */
export const replaceUrlParams = (
  url: string,
  params?: Record<string, string | number>
) => {
  if (!params) return url;

  let result = url;

  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value));
  });
  return result;
};

/**
 * 기본 API 요청 함수
 */

// api 공통 처리
async function request<T = unknown>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data?: unknown,
  params?: RequestParams,
  pathParams?: Record<string, string | number>,
  customAxios?: AxiosInstance
): Promise<T> {
  try {
    // URL 경로 파라미터 대체
    const processedUrl = replaceUrlParams(url, pathParams);

    const config: AxiosRequestConfig = {
      method,
      url: processedUrl,
    };

    if (data) {
      config.data = data;
    }
    if (params) {
      config.params = params;
    }

    const instance: AxiosInstance = customAxios ?? axiosInstance;
    const response = await instance(config);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject({
        status: error.response.status,
        message:
          error.response.data?.message || "알 수 없는 오류가 발생했습니다.",
        data: error.response.data,
      });
    }

    return Promise.reject({
      status: 500,
      message: "서버와 통신 중 오류 발생",
      data: null,
    });
  }
}

// RESTful API 규약
export function get<T = unknown>(
  { url, params = {}, pathParams }: ApiRequestOptions,
  customAxios?: AxiosInstance
): Promise<T> {
  return request("get", url, undefined, params, pathParams, customAxios);
}

export function post<T = unknown>(
  { url, data, params = {}, pathParams }: ApiRequestOptions,
  customAxios?: AxiosInstance
): Promise<T> {
  return request("post", url, data, params, pathParams, customAxios);
}

export function put<T = unknown>(
  { url, data, params = {}, pathParams }: ApiRequestOptions,
  customAxios?: AxiosInstance
): Promise<T> {
  return request<T>("put", url, data, params, pathParams, customAxios);
}

export function remove<T = unknown>(
  { url, data, params = {}, pathParams }: ApiRequestOptions,
  customAxios?: AxiosInstance
): Promise<T> {
  return request<T>("delete", url, data, params, pathParams, customAxios);
}

export function patch<T = unknown>(
  { url, data, params = {}, pathParams }: ApiRequestOptions,
  customAxios?: AxiosInstance
): Promise<T> {
  return request<T>("patch", url, data, params, pathParams, customAxios);
}

/**
 * API 엔드포인트를 사용한 통합 요청 함수
 * @param endpointKey API_ENDPOINTS의 키 (형식: 'USER.GET_PROFILE')
 * @param data 요청 바디 데이터
 * @param params 쿼리 파라미터
 * @param pathParams URL 경로 파라미터
 */
export const apiRequest = <T = unknown>(
  endpoint: Endpoint,
  data?: unknown,
  params?: RequestParams,
  pathParams?: Record<string, string | number>
): Promise<T> => {
  // BFF 경유: 엔드포인트 url 앞에 BFF prefix를 붙여 호출
  const withPrefix = (url: string) => `/api/familytown${url}`;
  switch (endpoint.method) {
    case "GET":
      return get<T>({ url: withPrefix(endpoint.url), params, pathParams });
    case "POST":
      return post<T>({
        url: withPrefix(endpoint.url),
        data,
        params,
        pathParams,
      });
    case "PUT":
      return put<T>({
        url: withPrefix(endpoint.url),
        data,
        params,
        pathParams,
      });
    case "DELETE":
      return remove<T>({
        url: withPrefix(endpoint.url),
        data,
        params,
        pathParams,
      });
    case "PATCH":
      return patch<T>({
        url: withPrefix(endpoint.url),
        data,
        params,
        pathParams,
      });
    default:
      throw new Error(`지원하지 않는 HTTP 메서드: ${endpoint.method}`);
  }
};
