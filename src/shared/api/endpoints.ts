import { Endpoint } from "./model";

const MINUTE = 60 * 1000;
// Next.js 환경변수로 전환 (브라우저 노출용: NEXT_PUBLIC_*)
export const BASE_URL = process.env.NEXT_PUBLIC_URL || "";
export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const API_ENDPOINTS: Record<string, Record<string, Endpoint>> = {
  AUTH: {
    // Web 폰번호 로그인
    LOGIN: { url: "/account/web/login/phone-number", method: "POST" },
    // access token 재발급
    REFRESH_TOKEN: { url: "/auth/token/regenerate", method: "POST" },
    // 로그인 계정 프로필 조회
    GET_MY_PROFILE: {
      url: "/account/profile",
      method: "GET",
      queryConfig: {
        staleTime: 5 * MINUTE, // 시간마다 데이터 갱신
        gcTime: 10 * MINUTE, // 시간동안 캐시 유지
        refetchInterval: 10 * MINUTE, // 시간마다 백그라운드에서 자동 갱신
        refetchOnWindowFocus: true, // 창이 포커스될 때 데이터 갱신
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
  },
  USER: {
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
  },
  // 파일 업로드
  FILE_UPLOAD: {
    POST_FILE: {
      url: `/file/upload`,
      method: "POST",
    },
    GET_ACCEPT_LIST: {
      url: `/file/public/accept/{subCategory}`,
      method: "GET",
    },
  },

  // 참가한 전체 대화방 목록 조회
  CHANNEL: {
    GET_LIST: {
      url: `/channel/list`,
      method: "GET",
    },
    POST_FILE_INFO: {
      url: `/file/info/searchGroup`,
      method: "POST",
    },
    POST_CREATE_CHANNEL: {
      url: `/channel/`,
      method: "POST",
    },
  },

  // 친구
  FRIEND: {
    GET_FRIENDS_LIST: {
      url: `/account/friend`,
      method: "GET",
    },
    // 친구 차단
    PUT_FRIEND_BLOCK: {
      url: `/account/friend/block`,
      method: "PUT",
    },
    // 친구 차단 취소
    PUT_FRIEND_BLOCK_CANCEL: {
      url: `/account/friend/block/cancel`,
      method: "PUT",
    },
    // 새로운 친구 확인 완료 처리
    PUT_FRIEND_CHECK: {
      url: `/account/friend/check`,
      method: "PUT",
    },
    // 친구 즐겨찾기
    PUT_FRIEND_FAVORITE: {
      url: `/account/friend/favorite`,
      method: "PUT",
    },

    // 친구 연결 모드 수정

    // 친구 숨김
    PUT_FRIEND_HIDE: {
      url: `/account/friend/hide`,
      method: "PUT",
    },
    // 친구 숨김 취소
    PUT_FRIEND_HIDE_CANCEL: {
      url: `/account/friend/hide/cancel`,
      method: "PUT",
    },

    // 친구 프로필 이름 수정
    PUT_FRIEND_NAME: {
      url: `/account/friend/name`,
      method: "PUT",
    },

    // 친구 수락(추가)
    PUT_FRIEND_JOIN: {
      url: `/account/friend/join`,
      method: "PUT",
    },
    // 친구 수락 거절
    PUT_FRIEND_REJECT: {
      url: `/account/friend/reject`,
      method: "PUT",
    },

    // 친구 삭제
    DELETE_FRIEND: {
      url: `/account/friend/{friendId}`,
      method: "DELETE",
    },

    // 친구 요청
    POST_FRIEND: {
      url: `/account/friend/request`,
      method: "POST",
    },
  },
  NOTI: {
    GET_NOTI: {
      url: `/ums/notifications`,
      method: "GET",
    },
    PATCH_NOTI: {
      url: `/ums/notifications/{notification_id}`,
      method: "PATCH",
    },
    DEL_NOTI: {
      url: `/ums/notifications/{notification_id}`,
      method: "DELETE",
    },
  },
};
