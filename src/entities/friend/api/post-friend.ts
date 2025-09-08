import { apiRequest } from "@/shared/api";
import { FriendListResponse, FriendRequestData } from "@/entities/friend";

export const postFriend = async (data: FriendRequestData) =>
  apiRequest<FriendListResponse>(
    { url: "/account/friend/request", method: "POST" },
    data
  );
