import qs from "qs";
import axios, { AxiosInstance } from "axios";
import { API_ENDPOINTS } from "./endpoints";
import { useAuthStore } from "@/features/auth/authStore";

/**
 * 기본 axios 인스턴스 생성
 * @description API 요청에 사용되는 기본 설정 적용
 */
export const axiosInstance = axios.create({
  // baseURL은 비움: 요청 유틸에서 "/api/familytown" 접두어를 붙입니다
  baseURL: "",
  headers: {
    Authorization: "",
    "Content-Type": "application/json;charset=UTF-8",
    "Accept-Language": "ko-KR,ko;",
    "X-DOMAIN-SERVICE": "FETA",
  },
  timeout: 10000, // 10초 타임아웃

  /**
   * 쿼리 스트링 직렬화 설정
   * @description 배열 파라미터를 repeat 형식으로 직렬화 (예. friendType=NEW&friendType=NORMAL)
   */
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

/**
 * 인증 토큰 획득 함수
 * @returns {string | null} 저장된 액세스 토큰 또는 null
 */
const getAuthToken = (): string | null => {
  try {
    const authStore = useAuthStore.getState();
    return authStore.accessToken;
  } catch (error) {
    console.error("토큰 접근 오류:", error);
    return null;
  }
};

/**
 * 토큰 갱신 함수 (인터셉터에서 사용)
 * @returns {Promise<boolean>} 갱신 성공 여부
 */
const refreshToken = async (): Promise<boolean> => {
  try {
    const authStore = useAuthStore.getState();
    const { refreshToken, accessToken } = authStore.getStoredTokens();

    if (!refreshToken) {
      console.error("Refresh token이 없습니다");
      authStore.logout();
      return false;
    }

    // 이미 토큰 갱신 중인 경우 해당 Promise를 반환
    if (authStore.tokenRefreshPromise) {
      return await authStore.tokenRefreshPromise;
    }

    // 새로운 토큰 갱신 Promise 생성
    const refreshPromise = (async () => {
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.AUTH.REFRESH_TOKEN.url,
          {
            expiredAccessToken: accessToken || "",
            refreshToken,
          }
        );

        if (response.data) {
          // 새로운 토큰으로 상태 업데이트
          authStore.updateTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            sessionToken: response.data.sessionToken,
          });
          console.log("토큰 갱신 성공");
          return true;
        } else {
          throw new Error("토큰 갱신 응답 실패");
        }
      } catch (error) {
        console.error("토큰 갱신 실패: ", error);
        authStore.logout();
        return false;
      } finally {
        // Promise 완료 후 정리
        authStore.setTokenRefreshPromise(null);
      }
    })();

    // Promise를 store에 저장하여 중복 갱신 방지
    authStore.setTokenRefreshPromise(refreshPromise);

    return await refreshPromise;
  } catch (error) {
    console.error("토큰 갱신 프로세스 오류:", error);
    useAuthStore.getState().logout();
    return false;
  }
};

/**
 * Bearer 토큰 안전 처리 함수
 */
const formatAuthToken = (token: string): string => {
  if (token.startsWith("Bearer ")) {
    return token;
  }
  return `Bearer ${token}`;
};

/**
 * 요청 인터셉터 설정
 * @description 모든 요청에 인증 토큰을 자동으로 추가
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = formatAuthToken(token);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 응답 인터셉터 설정
 * @description 401 오류 시 토큰 갱신 시도 후 원래 요청 재시도
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error("네트워크 오류:", error.message);
      return Promise.reject(error);
    }

    const { status } = error.response;

    // 401 인증 오류 처리
    if (
      status === 401 &&
      error.response.data?.path === API_ENDPOINTS.AUTH.REFRESH_TOKEN.url
    ) {
      console.error("🔴 토큰 갱신 API 실패");
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    if (status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    // 재시도 횟수 체크
    originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

    // 2번까지만 재시도
    if (originalRequest._retryCount > 2) {
      console.error("🔴 특정 요청 재시도 한도 초과:", originalRequest.url);
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // 토큰 갱신 엔드포인트인 경우 갱신 시도하지 않음
    if (originalRequest.url?.includes(API_ENDPOINTS.AUTH.REFRESH_TOKEN.url)) {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }
    // 토큰 갱신 시도

    try {
      const refreshSuccess = await refreshToken();

      if (refreshSuccess) {
        // 토큰 갱신 성공 시 재시도 카운터 리셋
        originalRequest._retryCount = 0;
        const newToken = getAuthToken();
        if (newToken) {
          originalRequest.headers.Authorization = formatAuthToken(newToken);
          return axiosInstance(originalRequest);
        }
      }

      // 토큰 갱신 실패 시 로그아웃'
      console.error("🔴 토큰 갱신 실패");
      useAuthStore.getState().logout();
      return Promise.reject(error);
    } catch (refreshError) {
      console.error("토큰 갱신 중 오류:", refreshError);
      useAuthStore.getState().logout();
      return Promise.reject(refreshError);
    }
  }
);

/**
 * 파일 업로드용 axios 인스턴스 생성 함수
 * @description 파일 업로드에 적합한 설정이 적용된 axios 인스턴스 생성
 * @returns {AxiosInstance} 파일 업로드용 axios 인스턴스
 */
export function createFileUploadInstance(): AxiosInstance {
  const instance = axios.create({
    // 요청 유틸에서 전체 URL을 넘기므로 baseURL 비움
    baseURL: "",
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept-Language": "ko-KR,ko;",
      "X-DOMAIN-SERVICE": "FETA",
    },
    timeout: 60000, // 파일 업로드는 더 긴 타임아웃(60초) 설정
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = formatAuthToken(token);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
}
