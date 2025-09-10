// 공통 비동기 상태 관리 Hook

import { useState, useCallback } from "react";

export interface AsyncState<T = any> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export interface UseAsyncStateOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

/**
 * 비동기 작업의 상태를 관리하는 공통 Hook
 * @param options 초기 데이터, 성공/실패 콜백 설정
 * @returns AsyncState와 상태 조작 함수들
 */
export function useAsyncState<T = any>(options: UseAsyncStateOptions<T> = {}) {
  const { initialData = null, onSuccess, onError } = options;

  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
  });

  const setLoading = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      isError: false,
      error: null,
      isSuccess: false,
    }));
  }, []);

  const setSuccess = useCallback(
    (data: T) => {
      setState({
        data,
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: true,
      });
      if (onSuccess) {
        onSuccess(data);
      }
    },
    [onSuccess]
  );

  const setError = useCallback(
    (error: Error) => {
      setState({
        data: null,
        isLoading: false,
        isError: true,
        error,
        isSuccess: false,
      });
      if (onError) {
        onError(error);
      }
    },
    [onError]
  );

  const reset = useCallback(() => {
    setState({
      data: initialData,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: false,
    });
  }, [initialData]);

  return {
    ...state,
    setLoading,
    setSuccess,
    setError,
    reset,
  };
}
