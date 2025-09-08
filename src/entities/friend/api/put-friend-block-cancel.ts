import { apiRequest } from "@/shared/api";
import { FriendListResponse } from "@/entities/friend";

export const putFriendBlockCancel = async (friendId: number) =>
  apiRequest<FriendListResponse>(
    { url: "/account/friend/block/cancel", method: "PUT" },
    { friendId }
  );
