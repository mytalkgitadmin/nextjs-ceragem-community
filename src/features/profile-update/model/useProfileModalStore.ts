import { create } from "zustand";

interface ProfileModalState {
  profileModal: {
    isOpen: boolean;
    accountId: number | null;
  };
  openProfileModal: (accountId: number) => void;
  closeProfileModal: () => void;
}

export const useProfileModalStore = create<ProfileModalState>((set) => ({
  profileModal: {
    isOpen: false,
    accountId: null,
  },
  openProfileModal: (accountId: number) =>
    set(() => ({ profileModal: { isOpen: true, accountId } })),
  closeProfileModal: () =>
    set(() => ({ profileModal: { isOpen: false, accountId: null } })),
}));
