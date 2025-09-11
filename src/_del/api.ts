import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";

// baseURL은 실제로 사용하려는 API 주소
//const baseURL = "https://jsonplaceholder.typicode.com/"
//const baseURL = 'https://dev-api.bemily.net/v2' // EKS
//const baseURL = 'https://dev-mobile.befamily.co.kr' // ECS
const baseURL = ""; //import.meta.env.VITE_BASE_DOMAIN;

export const axiosApi = axios.create({
  baseURL,
  headers: {
    ["Authorization"]: "",
    //'Content-Type': 'application/json',
    "Content-Type": "application/json;charset=UTF-8",
    // 추후 Language 적용할 시
    // "Accept-Language": getLanguage(localStorage.getItem("i18nextLng")),
    "Accept-Language": "ko-KR,ko;",
  },
});

// 추후 Language 적용할 시
const getLanguage = (language: string) => {
  if (language !== null) {
    if (language === "ko") {
      return "ko-KR,ko;";
    } else if (language === "eng") {
      return "en-US,en;";
    } else if (language === "vn") {
      return "vi-VN,vi;";
    } else if (language === "cn") {
      return "zh-CN,zh;";
    } else if (language === "jp") {
      return "ja-JP,ja;";
    }
  }
  return "ko-KR,ko;";
};

// 요청 인터셉터를 사용하여 인증 토큰을 추가
// axiosApi.interceptors.request.use((config: any) => {
//   const token = localStorage.getItem('accessToken')
//   if (token) {
//     token.indexOf('Bearer') === -1
//     config.headers['Authorization'] = `${
//       token.indexOf('Bearer') === -1 ? 'Bearer' : token
//     }`
//   }
//   return config
// })

axiosApi.interceptors.request.use(
  async (config: any) => {
    const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰을 가져옵니다.

    if (token) {
      config.headers["Authorization"] = `Bearer ${token
        ?.replace("Bearer", "")
        .trim()}`; // 헤더에 토큰을 설정합니다.
    }
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

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.path === "/auth/token/regenerate"
    ) {
      window.location.href = "/login";
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 재시도를 표시

      const accessToken = localStorage.getItem("accessToken") || "";
      const refreshToken = localStorage.getItem("refreshToken") || "";

      const data = {
        expiredAccessToken: accessToken,
        refreshToken: refreshToken,
      };

      try {
        const response = await axiosApi.post("/auth/token/regenerate", data);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("sessionToken", response.data.sessionToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken?.replace("Bearer", "").trim()}`;

        // 원래 요청 재시도
        return axiosApi(originalRequest);
      } catch (err) {
        if (error.response && error.response.status === 401) {
          // 토큰 갱신 실패 시 로그인 페이지로 이동
          window.location.href = "/login";
        }
      }
    }

    const { method, url, params, errorData, headers } = error.config;
    const { data, status } = error.response;

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
