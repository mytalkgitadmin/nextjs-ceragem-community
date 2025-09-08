import { apiRequest } from "@/shared/api";
import { FriendListResponse } from "@/entities/friend";

export const putFriendJoin = async (data: {
  friendId: number;
  groupId: number;
}) =>
  apiRequest<FriendListResponse>(
    { url: "/account/friend/join", method: "PUT" },
    data
  );
