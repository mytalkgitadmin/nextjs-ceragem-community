import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분 동안 동일한 데이터 요청 시 캐시에서 바로 가져옴
      gcTime: 5 * 60 * 1000, //gcTime(garbage collection): 5분동안 사용되지 않는 데이터는 메모리에서 제거
      retry: 1, // 쿼리 실패시 재 시도  횟수
    },
  },
});
