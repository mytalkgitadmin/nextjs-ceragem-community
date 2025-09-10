// Auth 도메인 API endpoints

import { Endpoint } from "@/shared/api/model";

const MINUTE = 60 * 1000;

export const AUTH_ENDPOINTS: Record<string, Endpoint> = {
  // Web 폰번호 로그인
  LOGIN: { url: "/account/web/login/phone-number", method: "POST" },
  // access token 재발급
  REFRESH_TOKEN: { url: "/auth/token/regenerate", method: "POST" },
  // 로그인 계정 프로필 조회
  GET_MY_PROFILE: {
    url: "/account/profile",
    method: "GET",
    queryConfig: {
      staleTime: 5 * MINUTE,
      gcTime: 10 * MINUTE,
      refetchInterval: 10 * MINUTE,
      refetchOnWindowFocus: true,
    },
  },
  PATCH_MY_PROFILE: {
    url: "/account/profile",
    method: "PATCH",
  },
  PUT_MY_PROFILE_IMAGE: {
    url: "/account/group/profile",
    method: "PUT",
  },
};
