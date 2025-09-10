import { apiRequest } from "@/shared/api";
import { AUTH_ENDPOINTS } from "./api/endpoints";
import { useAuthStore } from "./authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// DTO 및 계약 타입 import
import type {
  LoginRequestDTO,
  LoginResponseDTO,
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
  GetProfileResponseDTO,
} from "./api/dto-types";
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  GetProfileResponse,
} from "./api/contracts-types";
import {
  mapLoginResponse,
  mapRefreshTokenResponse,
  mapGetProfileResponse,
} from "./api/dto-mappers";

// 하위 호환성을 위한 기존 타입 re-export
export type {
  LoginRequest as RequestLogin,
  LoginResponse as ResponseLogin,
  RefreshTokenRequest,
  RefreshTokenResponse,
  GetProfileResponse as ResponseGetProfile,
};

/**
 * 폰번호 로그인 API 요청
 * @param data 로그인 요청 데이터 (nationalNumber: 82, phoneNumber: 전화번호, password: 비밀번호)
 * @returns 로그인 응답 데이터를 포함한 Promise
 */
export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  // DTO로 API 호출
  const dtoRequest: LoginRequestDTO = {
    nationalNumber: data.nationalNumber,
    phoneNumber: data.phoneNumber,
    password: data.password,
  };

  const dtoResponse = await apiRequest<LoginResponseDTO>(
    AUTH_ENDPOINTS.LOGIN,
    dtoRequest
  );

  // DTO를 도메인 모델로 변환
  return mapLoginResponse(dtoResponse);
};

/**
 * 로그인 처리를 위한 mutation 훅
 * React Query의 useMutation을 사용하여 로그인 API 요청 및 상태 관리
 *
 * @returns 로그인 mutation 객체 (mutate, mutateAsync 등 포함)
 */
export const useLogin = () => {
  const { login, returnUrl } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data: LoginResponse) => {
      if (data.result) {
        // 로그인 상태 저장
        login({
          accessToken: data.resultData.accessToken,
          refreshToken: data.resultData.refreshToken,
          sessionToken: data.resultData.sessionToken,
          sendBirdId: data.resultData.sendBirdId,
          accountProfile: data.resultData.accountProfile,
        });

        router.push(returnUrl);

        // 사용자 프로필 쿼리를 무효화하여 최신 데이터를 다시 불러옴
        queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      }
    },
    onError: (error) => {
      // TODO: 에러 로직 처리, 에러 알림 표시
      console.log("로그인 실패: ", error);
    },
  });
};

/**
 * 사용자 프로필 조회 API 요청
 * @returns 사용자 프로필 데이터를 포함한 Promise
 */
export const getUserProfileApi = async (): Promise<GetProfileResponse> => {
  // DTO로 API 호출
  const dtoResponse = await apiRequest<GetProfileResponseDTO>(
    AUTH_ENDPOINTS.GET_MY_PROFILE
  );

  // DTO를 도메인 모델로 변환
  return mapGetProfileResponse(dtoResponse);
};

/**
 * 사용자 프로필 조회를 위한 query 훅
 *
 * @param options React Query 옵션 (선택적)
 * @returns 사용자 프로필 query 객체 (data, isLoading 등 포함)
 *
 * @example
 * const { data: profileData, isLoading } = useUserProfile();
 */
export const useUserProfile = (options = {}) => {
  // 인증된 상태일 때만 프로필 요청 활성화
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: getUserProfileApi,
    enabled: isAuthenticated,
    ...AUTH_ENDPOINTS.GET_MY_PROFILE.queryConfig,
    ...options,
  });
};

/**
 * 토큰 갱신 API 요청
 * @param data refresh token 요청 데이터
 * @returns 새로운 토큰 정보를 포함한 Promise
 */
export const refreshTokenApi = async (
  data: RefreshTokenRequest
): Promise<RefreshTokenResponse> => {
  // DTO로 API 호출
  const dtoRequest: RefreshTokenRequestDTO = {
    refreshToken: data.refreshToken,
  };

  const dtoResponse = await apiRequest<RefreshTokenResponseDTO>(
    AUTH_ENDPOINTS.REFRESH_TOKEN,
    dtoRequest
  );

  // DTO를 도메인 모델로 변환
  return mapRefreshTokenResponse(dtoResponse);
};

/**
 * 토큰 갱신을 위한 mutation 훅
 * 자동으로 토큰을 갱신하고 상태를 업데이트
 *
 * @returns 토큰 갱신 mutation 객체
 */
export const useRefreshToken = () => {
  const { updateTokens, logout } = useAuthStore();

  return useMutation({
    mutationFn: refreshTokenApi,
    onSuccess: (data: RefreshTokenResponse) => {
      if (data.result) {
        // 새로운 토큰으로 상태 업데이트
        updateTokens({
          accessToken: data.resultData.accessToken,
          refreshToken: data.resultData.refreshToken,
          sessionToken: data.resultData.sessionToken,
        });
        console.log("토큰 갱신 성공");
      } else {
        // 토큰 갱신 실패 시 로그아웃
        console.error("토큰 갱신 실패:", data);
        logout();
      }
    },
    onError: (error) => {
      console.error("토큰 갱신 API 오류:", error);
      // refresh token도 만료된 경우 로그아웃
      logout();
    },
    retry: false, // 토큰 갱신은 재시도하지 않음
  });
};

/**
 * 토큰 갱신 처리 함수 (컴포넌트 외부에서 호출 가능)
 * axios 인터셉터에서 사용하기 위한 함수
 */
export const refreshTokenSilently = async (): Promise<boolean> => {
  try {
    const { refreshToken } = useAuthStore.getState().getStoredTokens();

    if (!refreshToken) {
      throw new Error("Refresh token이 없습니다");
    }

    const response = await refreshTokenApi({ refreshToken });

    if (response.result) {
      // 상태 업데이트
      useAuthStore.getState().updateTokens({
        accessToken: response.resultData.accessToken,
        refreshToken: response.resultData.refreshToken,
        sessionToken: response.resultData.sessionToken,
      });
      return true;
    } else {
      throw new Error("토큰 갱신 응답 실패");
    }
  } catch (error) {
    console.error("자동 토큰 갱신 실패:", error);
    useAuthStore.getState().logout();
    return false;
  }
};
