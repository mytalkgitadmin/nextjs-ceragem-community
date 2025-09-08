import { create } from "zustand";
import type { AccountProfileEntity } from "./entity-types";
import { profileMapper } from "../api/mapper";
import { AccountProfileDTO } from "../api/dto-types";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProfileStoreState {
  userProfile: AccountProfileEntity | null;
  setUserProfile: (profile: AccountProfileEntity) => void;
}

export const useProfileStore = create<ProfileStoreState>()(
  persist(
    (set) => ({
      userProfile: null,
      setUserProfile: (profile) => set({ userProfile: profile }),
    }),
    {
      name: "profile-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ userProfile: state.userProfile }),
    }
  )
);
