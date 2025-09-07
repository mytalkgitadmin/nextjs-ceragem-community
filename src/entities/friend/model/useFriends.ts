import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getFriendListApi } from "../api/get-friends-list";
import type {
  FriendListParams,
  Friend,
  Group,
  InvitableUser,
} from "./entity-types";

type FriendListResult = {
  friends: Friend[];
  groups: Group[];
  invitableUsers: InvitableUser[];
};

export const useFriends = (
  params: FriendListParams
): UseQueryResult<FriendListResult, Error> => {
  return useQuery<FriendListResult, Error>({
    queryKey: ["user", "friends", params],
    queryFn: async () => getFriendListApi(params),
    enabled: (params?.friendType?.length ?? 0) > 0,
  });
};

export default useFriends;
