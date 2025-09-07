import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFriendReject } from "../api/put-friend-reject";

export function useFriendReject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: number) => putFriendReject(friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "friends"] });
    },
  });
}

export default useFriendReject;
