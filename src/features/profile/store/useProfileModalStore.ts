// Profile modal state management

import { create } from 'zustand';

interface ProfileModalState {
  // 프로필 모달 상태
  profileModal: {
    isOpen: boolean;
    accountId: number | null;
  };

  // 프로필 모달 액션
  openProfileModal: (accountId: number) => void;
  closeProfileModal: () => void;
}

export const useProfileModalStore = create<ProfileModalState>((set) => ({
  profileModal: {
    isOpen: false,
    accountId: null,
  },

  // 프로필 모달 액션
  openProfileModal: (accountId: number) =>
    set(() => ({
      profileModal: { isOpen: true, accountId },
    })),

  closeProfileModal: () =>
    set(() => ({
      profileModal: { isOpen: false, accountId: null },
    })),
}));
