// API 계약과 요청/응답 인터페이스

import type { RequestParams } from "@/shared/api";
import type { Friend, Group, InvitableUser } from "@/entities/friend";

// Friend List API 계약
export interface FriendListRequest {
  friendType?: string[];
  groupId?: number;
}

export interface FriendListResponse {
  result: boolean;
  resultData: {
    friends: Friend[];
    groups: Group[];
    invitableUsers: InvitableUser[];
  };
}

// 기타 Friend API 계약들
export interface FriendUpdateRequest {
  accountId: number;
  editedName?: string;
  relationType?: string;
}

export interface FriendUpdateResponse {
  result: boolean;
  message: string;
}
