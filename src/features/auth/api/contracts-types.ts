// Auth API 계약 타입 (도메인 모델 기반)

import type { AccountProfile } from "@/entities/profile";
import type { ApiResponse, RequestParams } from "@/shared/api";

// 로그인 요청 계약
export interface LoginRequest extends RequestParams {
  nationalNumber: string;
  phoneNumber: string;
  password: string;
}

// 로그인 응답 계약
export type LoginResponse = ApiResponse<{
  accountProfile: AccountProfile;
  accessToken: string;
  refreshToken: string;
  sendBirdId: string;
  sessionToken: string;
}>;

// 토큰 갱신 요청 계약
export interface RefreshTokenRequest extends RequestParams {
  refreshToken: string;
}

// 토큰 갱신 응답 계약
export type RefreshTokenResponse = ApiResponse<{
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
}>;

// 프로필 조회 응답 계약
export type GetProfileResponse = ApiResponse<{
  accountProfile: AccountProfile;
}>;
