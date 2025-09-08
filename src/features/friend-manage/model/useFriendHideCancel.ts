import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFriendHideCancel } from "../../../entities/friend/api/put-friend-hide-cancel";

export function useFriendHideCancel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: number) => putFriendHideCancel(friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "friends"] });
    },
  });
}

export default useFriendHideCancel;
