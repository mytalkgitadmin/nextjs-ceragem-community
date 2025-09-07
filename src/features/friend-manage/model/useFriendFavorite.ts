import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFriendFavorite } from "../api/put-friend-favorite";

type FavoriteVariables = {
  friendId: number;
  isFavorite: boolean;
};

export function useFriendFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: FavoriteVariables) => putFriendFavorite(variables),
    onSuccess: () => {
      // 친구 목록 관련 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["user", "friends"] });
    },
  });
}

export default useFriendFavorite;
