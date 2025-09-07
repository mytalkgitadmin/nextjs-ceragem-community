import { apiRequest } from "@/shared/api";
import { FriendListResponse } from "@/entities/friend";

export const putFriendBlock = async (friendId: number) =>
  apiRequest<FriendListResponse>(
    { url: "/account/friend/block", method: "PUT" },
    { friendId }
  );
