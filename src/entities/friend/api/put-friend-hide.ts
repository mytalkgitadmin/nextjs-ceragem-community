import { apiRequest } from "@/shared/api";
import { FriendListResponse } from "@/entities/friend";

export const putFriendHide = async (friendId: number) =>
  apiRequest<FriendListResponse>(
    { url: "/account/friend/hide", method: "PUT" },
    { friendId }
  );
