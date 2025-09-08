import { RequestParams } from "@/shared/api";
import type { FriendDTO, GroupDTO, InvitableUserDTO } from "../api/dto-types";

// Entity types (mapped from DTOs)
export type FriendEntity = FriendDTO;
export type GroupEntity = GroupDTO;
export type InvitableUserEntity = InvitableUserDTO;

// Re-export FriendType enum
export type { FriendType } from "../api/dto-types";

// Legacy type names for backward compatibility (deprecated)
export type FriendType_Legacy =
  | "NORMAL"
  | "FAVORITE"
  | "ME"
  | "BLOCK"
  | "DELETE"
  | "HIDE"
  | "LEAVE"
  | "NONE"
  | "REJECT"
  | "REQUEST"
  | "REQUESTED";

// Friend request data for creating/requesting friends
export interface FriendRequestData {
  friends: Array<{
    editedName: string;
    friendId: number;
    nationalNumber: string;
    phoneNumber: string;
    syncName: string;
  }>;
  groupId: number;
  isSync: boolean;
}
