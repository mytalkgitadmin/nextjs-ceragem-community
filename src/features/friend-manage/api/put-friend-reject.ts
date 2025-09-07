import { apiRequest } from "@/shared/api";
import { FriendListResponse } from "@/entities/friend";

export const putFriendReject = async (friendId: number) =>
  apiRequest<FriendListResponse>(
    { url: "/account/friend/reject", method: "PUT" },
    { friendId }
  );
