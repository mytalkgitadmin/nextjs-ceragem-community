import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFriendJoin } from "../api/put-friend-join";

type JoinVariables = {
  friendId: number;
  groupId: number;
};

export function useFriendJoin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: JoinVariables) => putFriendJoin(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "friends"] });
    },
  });
}

export default useFriendJoin;
