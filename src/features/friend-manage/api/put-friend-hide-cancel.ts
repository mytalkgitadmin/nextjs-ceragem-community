import { apiRequest } from "@/shared/api";
import { FriendListResponse } from "@/entities/friend";

export const putFriendHideCancel = async (friendId: number) =>
  apiRequest<FriendListResponse>(
    { url: "/account/friend/hide/cancel", method: "PUT" },
    { friendId }
  );
