import { useState, useEffect, useCallback, useRef } from "react";

interface UseInfiniteScrollOptions {
  hasNext: boolean;
  loadMore: () => Promise<void> | void;
  scrollContainerId: string; // scrollRef 대신 ID로 요소 찾기
}

interface UseInfiniteScrollReturn {
  isLoadingMore: boolean;
  loadMoreTriggerRef: React.RefObject<HTMLDivElement>;
  error: string | null;
  retry: () => void;
}

export const useInfiniteScroll = ({
  hasNext,
  loadMore,
  scrollContainerId,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const isRequestingRef = useRef(false);

  // 로드 더 핸들러
  const handleLoadMore = useCallback(async () => {
    // 중복 요청 방지
    if (!hasNext || isLoadingMore || isRequestingRef.current) {
      return;
    }

    isRequestingRef.current = true;
    setIsLoadingMore(true);
    setError(null);

    try {
      await loadMore();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "데이터를 불러오는데 실패했습니다.";
      setError(errorMessage);
      console.error("무한 스크롤 로드 실패:", err);
    } finally {
      setIsLoadingMore(false);
      isRequestingRef.current = false;
    }
  }, [hasNext, isLoadingMore, loadMore]);

  // Intersection Observer를 사용한 무한 스크롤
  useEffect(() => {
    const triggerElement = loadMoreTriggerRef.current;
    if (!triggerElement) return;

    // ID로 스크롤 컨테이너 찾기
    const scrollContainer = document.getElementById(scrollContainerId);
    if (!scrollContainer) {
      console.warn(`Scroll container with id "${scrollContainerId}" not found`);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: scrollContainer, // ID로 찾은 요소를 root로 설정
        rootMargin: "0px 0px 100px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(triggerElement);

    return () => {
      observer.disconnect();
    };
  }, [handleLoadMore, scrollContainerId]);

  // 재시도 함수
  const retry = useCallback(() => {
    setError(null);
    handleLoadMore();
  }, [handleLoadMore]);

  return {
    isLoadingMore,
    loadMoreTriggerRef,
    error,
    retry,
  };
};
