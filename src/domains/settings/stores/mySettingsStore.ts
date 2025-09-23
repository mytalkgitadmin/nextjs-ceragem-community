// 순수 Zustand 상태

"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MyChatSettingsState {
  fontSize: string;
  backgroundColor: string;
}

interface MyChatSettingsStore extends MyChatSettingsState {
  setFontSize: (fontSize: string) => void;
  setBackgroundColor: (backgroundColor: string) => void;
  updateSettings: (settings: Partial<MyChatSettingsState>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: MyChatSettingsState = {
  fontSize: "14px",
  backgroundColor: "#ebebf1",
};

export const useMyChatSettingsStore = create<MyChatSettingsStore>()(
  persist(
    (set) => ({
      // 초기값
      ...DEFAULT_SETTINGS,

      // 액션들
      setFontSize: (fontSize) => set((state) => ({ ...state, fontSize })),

      setBackgroundColor: (backgroundColor) =>
        set((state) => ({ ...state, backgroundColor })),

      updateSettings: (settings) => set((state) => ({ ...state, ...settings })),

      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: "chat-settings-store",
      partialize: (state) => ({
        fontSize: state.fontSize,
        backgroundColor: state.backgroundColor,
      }),
    }
  )
);
