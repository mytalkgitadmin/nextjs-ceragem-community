import { apiRequest } from "@/shared/api";
import { FriendListResponse } from "@/entities/friend";

export const deleteFriend = async (friendId: number) =>
  apiRequest<FriendListResponse>(
    { url: "/account/friend/{friendId}", method: "DELETE" },
    undefined,
    undefined,
    { friendId }
  );
