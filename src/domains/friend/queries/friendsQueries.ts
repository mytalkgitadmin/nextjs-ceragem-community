// React Query Queries API

import { useQuery } from "@tanstack/react-query";
import { getFriend } from "../api/friend";

// // Query Keys
// export const authKeys = {
//     all: ['auth'] as const,
//     user: () => [...authKeys.all, 'user'] as const,
//     check: () => [...authKeys.all, 'check'] as const,
//   };

// export const useAuthCheck = (enabled: boolean = true) => {  //TODO:  토큰 유효성 검사 훅 추가
//     return useQuery({
//       queryKey: authKeys.check(),
//       queryFn: authApi.checkAuth,
//       enabled,
//       retry: false,
//       staleTime: 5 * 60 * 1000, // 5분
//     });
//   };

// checkAuth: async () => {
//     const response = await client.get("/auth/me");
//     return response.data;
//   },

export const friendsQueryKeys = {
  all: ["friends"] as const,
  friends: () => [...friendsQueryKeys.all, "friends"] as const,
  hideFriends: () => [...friendsQueryKeys.all, "hideFriends"] as const,
  blockFriends: () => [...friendsQueryKeys.all, "blockFriends"] as const,
} as const;

export const useFriends = (
  enabled: boolean = true,
  refetchOnWindowFocus: boolean = true
) => {
  const query = useQuery({
    queryKey: friendsQueryKeys.friends(),
    queryFn: () => getFriend(["NORMAL", "FAVORITE"]),
    enabled,
    refetchOnWindowFocus,
  });

  const data = query.data;

  //   // TODO : 데이터 구조 정의 필요
  //   const friendsData = {
  //     friends: [
  //       { accountId: 4228, accountType: 'USER', syncName: '소', relationType: 'NORMAL', status: 'NORMAL' },
  //       { accountId: 7499, accountType: 'USER', syncName: null, relationType: 'NORMAL', status: 'NORMAL' },
  //       { accountId: 7469, accountType: 'USER', syncName: '강혜진', relationType: 'NORMAL', status: 'NORMAL' },
  //       { accountId: 4065, accountType: 'USER', syncName: '김석식', relationType: 'NORMAL', status: 'NORMAL' }
  //     ],
  //     groups: [
  //       { sequence: 0, name: '', type: 'DEFAULT', isImmutable: true, profile: {} },
  //       { sequence: 1, name: '그룹같은 패밀리 두번째', type: 'NORMAL', isImmutable: false, profile: {} },
  //       { sequence: 2, name: '그룹같은 패밀리', type: 'NORMAL', isImmutable: false, profile: {} }
  //     ],
  //     invitableUsers: []
  //   };

  return {
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
