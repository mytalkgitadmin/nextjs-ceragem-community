import { RequestParams } from "@/shared/api";
import type {
  FriendDTO,
  FriendType,
  GroupDTO,
  InvitableUserDTO,
} from "./dto-types";

export interface FriendListParams extends RequestParams {
  friendType: FriendType[];
  count?: number;
  groupId?: number;
  isNew?: boolean;
  offset?: number;
}

export interface FriendListResponse {
  result: boolean;
  resultData: {
    friends: FriendDTO[];
    groups: GroupDTO[];
    invitableUsers: InvitableUserDTO[];
  };
}
