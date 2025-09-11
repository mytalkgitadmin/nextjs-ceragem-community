import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";
import * as Sentry from "@sentry/react";

const baseURL = "/api/familytown";

export const axiosApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Accept-Language": "ko-KR,ko;",
  },
});

axiosApi.interceptors.request.use(
  async (config: any) => {
    // BFF에서 쿠키를 통해 토큰을 처리하므로 클라이언트에서는 토큰 설정 불필요
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터를 사용하여 에러 처리를 설정
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const { method, url, params, data: requestData, headers } = error.config;
    const { status, data: responseData } = error.response || {};

    // 401 에러 시 로그인 페이지로 리다이렉트
    // 토큰 갱신 API를 통해 쿠키 기반 토큰 갱신 처리
    if (error.response && error.response.status === 401) {
      // 토큰 갱신 API 호출 실패 시 (무한 루프 방지)
      if (originalRequest.url?.includes("/api/auth/refresh")) {
        window.location.href = "/signing-in";
        return Promise.reject(error);
      }

      // 첫 번째 401 에러이고 토큰 갱신을 시도하지 않은 경우
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // 토큰 갱신 API 호출 (쿠키 기반)
          const refreshResponse = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // 쿠키 포함
          });

          if (refreshResponse.ok) {
            // 토큰 갱신 성공 시 원래 요청 재시도
            return axiosApi(originalRequest);
          } else {
            // 토큰 갱신 실패 시 로그인 페이지로 이동
            window.location.href = "/signing-in";
            return Promise.reject(error);
          }
        } catch (refreshError) {
          // 토큰 갱신 실패 시 로그인 페이지로 이동
          window.location.href = "/signing-in";
          return Promise.reject(refreshError);
        }
      }
    }

    // Sentry 로깅
    if (error.config) {
      Sentry.setContext("API Request Detail", {
        method,
        url,
        params,
        data: requestData,
        headers,
      });
    }

    if (error.response) {
      Sentry.setContext("API Response Detail", {
        status,
        data: responseData,
      });
    }

    // 다른 에러를 그대로 전파
    return Promise.reject(error);
  }
);
// api 공통 처리
const request = async (
  method: any,
  url: string,
  data: any = null,
  params: any = null,
  headers: any = null,
  axiosInstance?: AxiosInstance
) => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      paramsSerializer: (params: any) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      }, //쿼리스트링으로 동일한 파라메터로 요청 시 필요 (예. friendType=NEW&friendType=NORMAL)
    };
    if (data) {
      config.data = data;
    }
    if (params) {
      config.params = params;
    }
    if (headers) {
      config.headers = headers;
    }
    const fetch: AxiosInstance = axiosInstance ?? axiosApi;
    const response = await fetch(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// restful api 규약
export const get = ({ url, params }: any, customAaxios?: AxiosInstance) =>
  request("get", url, null, params, null, customAaxios);

export const post = (
  { url, data, params, headers }: any,
  customAaxios?: AxiosInstance
) => request("post", url, data, params, headers, customAaxios);
export const put = (
  { url, data, params, headers }: any,
  customAaxios?: AxiosInstance
) => request("put", url, data, params, headers);
export const remove = (
  { url, data, params }: any,
  customAaxios?: AxiosInstance
) => request("delete", url, data, params, null, customAaxios);
export const patch = (
  { url, data, params }: any,
  customAaxios?: AxiosInstance
) => request("patch", url, data, params);
