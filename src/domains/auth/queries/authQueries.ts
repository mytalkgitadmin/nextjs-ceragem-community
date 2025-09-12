// React Query Queries API

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

// TODO: Auth queries will be implemented here
export {};
