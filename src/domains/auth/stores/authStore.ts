// 순수 Zustand 상태

"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

interface AuthStore {
  // 상태
  //   accessToken: string; // 서버 쿠키에 저장으로 인해 필요 없음
  //   refreshToken: string;
  sessionToken: string; // SendBird용
  sendBirdId: string; // SendBird ID

  // // 액션들 - 순수 상태 변경만
  login: (state: { sessionToken: string; sendBirdId: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // 초기 상태
      sessionToken: "",
      sendBirdId: "",

      // 액션들
      login: (state) => {
        set({
          sessionToken: state.sessionToken,
          sendBirdId: state.sendBirdId,
        });
      },

      logout: () => {
        set({
          sessionToken: "",
          sendBirdId: "",
        });
      },
    }),
    {
      name: "auth-store",
      /**
       * partialize 옵션은 전체 상태 중에서 어떤 값만 localStorage에 영속적으로 저장할지 선택적으로 지정하는 역할을 합니다.
       * 여기서는 sendBirdId와 sessionToken만을 저장하도록 하여,
       * 불필요한 상태(예: 일회성 UI 상태 등)가 스토리지에 저장되는 것을 방지합니다.
       *
       * - sendBirdId: SendBird 채팅 서비스에서 사용되는 유저 식별자
       * - sessionToken: SendBird 인증에 사용되는 토큰
       *
       * 이 두 값만 저장함으로써, 인증 관련 핵심 정보만 안전하게 유지할 수 있습니다.
       * persist 플러그인은 기본적으로 createJSONStorage(() => localStorage)를 기본값으로 사용합니다. 그러므로 별도로 지정하지 않아도 됩니다.
       */
      partialize: (state) => ({
        sendBirdId: state.sendBirdId,
        sessionToken: state.sessionToken,
      }),
    }
  )
);
