import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "@/entities/profile";

const MINUTE = 60 * 1000;

export const useProfileDetail = (accountId: number) => {
  return useQuery({
    queryKey: ["user", "profile", accountId],
    queryFn: async () => getProfileApi(accountId),
    enabled: !!accountId,
    staleTime: 5 * MINUTE, // 시간마다 데이터 갱신
    gcTime: 10 * MINUTE, // 시간동안 캐시 유지
    refetchInterval: 10 * MINUTE, // 시간마다 백그라운드에서 자동 갱신
    refetchOnWindowFocus: true, // 창이 포커스될 때 데이터 갱신
  });
};

export default useProfileDetail;
