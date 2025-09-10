// Friend 도메인 API endpoints

import { Endpoint } from "@/shared/api/model";

export const FRIEND_ENDPOINTS: Record<string, Endpoint> = {
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
};
