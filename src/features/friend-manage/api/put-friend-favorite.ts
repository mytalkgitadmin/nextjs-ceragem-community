import { apiRequest } from "@/shared/api";
import { FriendListResponse } from "@/entities/friend";

export const putFriendFavorite = async (data: {
  friendId: number;
  isFavorite: boolean;
}) =>
  apiRequest<FriendListResponse>(
    { url: "/account/friend/favorite", method: "PUT" },
    data
  );
