// Profile 도메인 API endpoints

import { Endpoint } from "@/shared/api/model";

const MINUTE = 60 * 1000;

export const PROFILE_ENDPOINTS: Record<string, Endpoint> = {
  // 샌드버드 아이디 프로필 조회
  GET_PROFILE_SENDBIRD: {
    url: `/account/profile/sendbirdId/{sendbirdId}`,
    method: "GET",
  },
  // 요청한 accountId의 프로필과 프로필 히스토리 조회
  GET_PROFILE: {
    url: `/account/profile/{accountId}`,
    method: "GET",
    queryConfig: {
      staleTime: 2 * MINUTE,
      gcTime: 5 * MINUTE,
    },
  },
  // 유저 프로필 조회
  GET_GROUP_PROFILE: {
    url: `/account/group/users/{userId}/profile`,
    method: "GET",
    queryConfig: {
      staleTime: 2 * MINUTE,
      gcTime: 5 * MINUTE,
    },
  },
};
