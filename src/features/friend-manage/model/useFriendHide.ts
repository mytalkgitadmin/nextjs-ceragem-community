import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFriendHide } from "../api/put-friend-hide";

export function useFriendHide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: number) => putFriendHide(friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "friends"] });
    },
  });
}

export default useFriendHide;
