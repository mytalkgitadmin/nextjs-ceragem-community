import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFriend } from "../api/delete-friend";

export function useFriendDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: number) => deleteFriend(friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "friends"] });
    },
  });
}

export default useFriendDelete;
