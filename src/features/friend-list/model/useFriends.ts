import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {
  FriendListParams,
  FriendEntity,
  GroupEntity,
  InvitableUserEntity,
} from "@/entities/friend";
import { getFriendListApi } from "@/entities/friend";

type FriendListResult = {
  friends: FriendEntity[];
  groups: GroupEntity[];
  invitableUsers: InvitableUserEntity[];
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
