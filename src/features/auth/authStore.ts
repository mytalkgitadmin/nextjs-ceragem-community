/**
 * auth/store.ts
 * 인증 관련 상태 관리를 위한 Zustand 스토어
 * 로그인 상태, 토큰, 사용자 정보 등을 중앙에서 관리
 */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthState } from './model';

/**
 * 인증 상태 스토어
 * - 인증 관련 상태 저장 (isAuthenticated, 토큰 등)
 * - localStorage를 통한 영구 저장으로 새로고침 후에도 로그인 상태 유지
 * - 인증 상태 변경을 위한 액션 함수 제공
 *
 * @example
 * // 스토어 상태 접근
 * const { isAuthenticated, userProfile } = useAuthStore();
 *
 * // 스토어 액션 호출 (컴포넌트 내부)
 * const { login, logout } = useAuthStore();
 *
 * // 스토어 액션 호출 (비동기 콜백 내부)
 * useAuthStore.getState().login(data);
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      returnUrl: '/',
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      sessionToken: null,
      userId: null,
      userProfile: null,
      tokenRefreshPromise: null, // 토큰 갱신 중복 방지용

      /**
       * 로그인 액션 - 인증 상태 및 사용자 정보 저장
       * @param authData 로그인 응답 데이터 (토큰, 사용자 정보 등)
       */
      login: (authData) => {
        set({
          returnUrl: '/',
          isAuthenticated: true,
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          sessionToken: authData.sessionToken,
          userId: authData.sendBirdId,
          userProfile: authData.accountProfile,
          tokenRefreshPromise: null,
        });
      },

      /**
       * 토큰만 업데이트하는 액션 (토큰 갱신 시 사용)
       * @param tokens 새로운 토큰 정보
       */
      updateTokens: (tokens) => {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          sessionToken: tokens.sessionToken,
          tokenRefreshPromise: null,
        });
      },

      /**
       * 로그아웃 액션 - 인증 상태 초기화 및 로컬스토리지 정리
       */
      logout: () => {
        set({
          returnUrl: '/',
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          sessionToken: null,
          userId: null,
          userProfile: null,
          tokenRefreshPromise: null,
        });
        sessionStorage.clear();
        localStorage.clear();
      },

      setReturnUrl: (url: string) => {
        set({ returnUrl: url });
      },

      /**
       * 사용자 프로필 정보 업데이트
       * @param profile 업데이트할 프로필 정보
       */
      updateUserProfile: (profile) => {
        set({ userProfile: profile });
      },

      /**
       * 토큰 갱신 Promise 설정 (중복 갱신 방지)
       * @param promise 토큰 갱신 Promise
       */
      setTokenRefreshPromise: (promise) => {
        set({ tokenRefreshPromise: promise });
      },

      /**
       * 저장된 토큰 정보 조회
       * @returns 토큰 및 사용자 ID 객체
       */
      getStoredTokens: () => ({
        accessToken: get().accessToken,
        refreshToken: get().refreshToken,
        sessionToken: get().sessionToken,
        userId: get().userId,
      }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
