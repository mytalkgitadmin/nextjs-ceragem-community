// 순수 Zustand 상태

"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

interface ProfileState {
  email?: string;
  editedName: string;
  nationalNumber?: string | null;
  phoneNumber?: string | null;
  agreement?: boolean | null;
  coachConnected?: boolean | null;
}

interface ProfileStore extends ProfileState {
  setProfile: (state: Partial<ProfileState>) => void; // 액션 제외한 데이터만
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      email: "",
      editedName: "",
      nationalNumber: null,
      phoneNumber: null,
      agreement: null,
      coachConnected: null,
      setProfile: (state) => set(state),
    }),
    {
      name: "profile-store",
      partialize: (state) => ({
        email: state.email,
        editedName: state.editedName,
        nationalNumber: state.nationalNumber,
        phoneNumber: state.phoneNumber,
        agreement: state.agreement,
        coachConnected: state.coachConnected,
      }),
    }
  )
);
