import { useQuery } from "@tanstack/react-query";
import { profileQueryKeys } from "./queryKeys";
import { getSendbirdProfile } from "../api/profileAPI";

export const useSendbirdProfile = (sendbirdId: string) => {
  return useQuery({
    queryKey: profileQueryKeys.sendbirdProfile,
    queryFn: () => getSendbirdProfile(sendbirdId),
    enabled: !!sendbirdId,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
