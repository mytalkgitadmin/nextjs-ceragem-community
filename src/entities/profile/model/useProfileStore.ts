import { create } from "zustand";
import type { AccountProfileEntity } from "./entity-types";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProfileStoreState {
  userProfile: AccountProfileEntity | null;
  sendbirdId: string | null;
  sessionToken: string | null;
  setUserProfile: (profile: AccountProfileEntity) => void;
  setSendbirdId: (sendbirdId: string) => void;
  setSessionToken: (sessionToken: string) => void;
  updateUserProfile: (patch: Partial<AccountProfileEntity>) => void;
  updateState: (
    patch: Partial<
      Pick<ProfileStoreState, "userProfile" | "sendbirdId" | "sessionToken">
    >
  ) => void;
}

export const useProfileStore = create<ProfileStoreState>()(
  persist(
    (set) => ({
      userProfile: null,
      sendbirdId: null,
      sessionToken: null,

      setUserProfile: (profile) => set({ userProfile: profile }),
      setSendbirdId: (sendbirdId) => set({ sendbirdId }),
      setSessionToken: (sessionToken) => set({ sessionToken }),
      updateUserProfile: (patch) =>
        set((state) =>
          state.userProfile
            ? { userProfile: { ...state.userProfile, ...patch } }
            : {}
        ),
      updateState: (patch) => set(patch),
    }),
    {
      name: "profile-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userProfile: state.userProfile,
        sendbirdId: state.sendbirdId,
        sessionToken: state.sessionToken,
      }),
    }
  )
);
