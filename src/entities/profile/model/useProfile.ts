import { useQuery } from "@tanstack/react-query";
import { getSendbirdProfileApi } from "../api/get-sendbird-profile";
import { getProfileApi } from "../api/get-profile";

export function useSendbirdProfile(sendbirdId: string) {
  return useQuery({
    queryKey: ["user", "profile", sendbirdId],
    queryFn: async () => getSendbirdProfileApi(sendbirdId),
    enabled: !!sendbirdId,
  });
}

export function useProfile(accountId: number) {
  return useQuery({
    queryKey: ["user", "profile", accountId],
    queryFn: async () => getProfileApi(accountId),
    enabled: !!accountId,
  });
}
