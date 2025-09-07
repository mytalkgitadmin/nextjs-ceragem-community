import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFriendBlockCancel } from "../api/put-friend-block-cancel";

export function useFriendBlockCancel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: number) => putFriendBlockCancel(friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "friends"] });
    },
  });
}

export default useFriendBlockCancel;
