import { AccountProfile } from '@/features/chat/model';
import { ApiResponse } from '@/shared/api';

// 로그인 요청
export interface RequestLogin {
  nationalNumber: string;
  phoneNumber: string;
  password: string;
}

export interface LoginResultData {
  accountProfile: AccountProfile;
  accessToken: string;
  refreshToken: string;
  sendBirdId: string;
  sessionToken: string;
}

// 로그인 응답
export type ResponseLogin = ApiResponse<LoginResultData>;

// 토큰 갱신 요청
export interface RefreshTokenRequest {
  refreshToken: string;
}

// 토큰 갱신 응답 데이터
export interface RefreshTokenResultData {
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
}

// 토큰 갱신 응답
export type RefreshTokenResponse = ApiResponse<RefreshTokenResultData>;

export interface AuthState {
  returnUrl: string;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  sessionToken: string | null;
  userId: string | null;
  userProfile: AccountProfile | null;
  tokenRefreshPromise: Promise<boolean> | null; // 토큰 갱신 중복 방지용

  login: (authData: {
    accessToken: string;
    refreshToken: string;
    sessionToken: string;
    sendBirdId: string;
    accountProfile: AccountProfile;
  }) => void;
  updateTokens: (tokens: {
    accessToken: string;
    refreshToken: string;
    sessionToken: string;
  }) => void;
  setReturnUrl: (url: string) => void;
  logout: () => void;
  updateUserProfile: (profile: AccountProfile) => void;
  setTokenRefreshPromise: (promise: Promise<boolean> | null) => void;
  getStoredTokens: () => {
    accessToken: string | null;
    refreshToken: string | null;
    sessionToken: string | null;
    userId: string | null;
  };
}
