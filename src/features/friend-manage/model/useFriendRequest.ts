import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFriend } from "../../../entities/friend/api/post-friend";
import type { FriendRequestData } from "@/entities/friend";

export function useFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FriendRequestData) => postFriend(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "friends"] });
    },
  });
}

export default useFriendRequest;
