import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFriendBlock } from "../api/put-friend-block";

export function useFriendBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: number) => putFriendBlock(friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "friends"] });
    },
  });
}

export default useFriendBlock;
