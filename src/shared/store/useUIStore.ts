import { create } from 'zustand';

interface UIState {
  // 프로필 모달 상태
  profileModal: {
    isOpen: boolean;
    accountId: number | null;
  };

  // 채널 드로어 상태
  channelDrawer: {
    isOpen: boolean;
  };

  // 알럿 상태
  alertDialog: {
    isOpen: boolean;
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    confirmText: string;
    onConfirm: (() => void) | null;
  };

  // 프로필 모달 액션
  openProfileModal: (accountId: number) => void;
  closeProfileModal: () => void;

  // 채널 드로어 액션
  openChannelDrawer: () => void;
  closeChannelDrawer: () => void;

  // 알럿
  openAlertDialog: (config: {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    confirmText?: string;
    onConfirm: () => void;
  }) => void;
  closeAlertDialog: () => void;

  // 모든 모달/드로어 닫기
  closeAllModals: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  profileModal: {
    isOpen: false,
    accountId: null,
  },
  channelDrawer: {
    isOpen: false,
  },
  alertDialog: {
    isOpen: false,
    title: '',
    description: '',
    confirmText: '확인',
    onConfirm: null,
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

  // 채널 드로어 액션
  openChannelDrawer: () =>
    set((state) => ({
      channelDrawer: { ...state.channelDrawer, isOpen: true },
    })),

  closeChannelDrawer: () =>
    set((state) => ({
      channelDrawer: { ...state.channelDrawer, isOpen: false },
    })),

  openAlertDialog: (config: {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    confirmText?: string;
    onConfirm: () => void;
  }) =>
    set(() => ({
      alertDialog: {
        isOpen: true, // true로 변경!
        title: config.title || '',
        description: config.description || '',
        confirmText: config.confirmText || '확인',
        onConfirm: config.onConfirm,
      },
    })),

  closeAlertDialog: () =>
    set(() => ({
      alertDialog: {
        isOpen: false,
        title: '',
        description: '',
        confirmText: '확인',
        onConfirm: null,
      },
    })),

  // 모든 모달/드로어 닫기
  closeAllModals: () =>
    set(() => ({
      profileModal: { isOpen: false, accountId: null },
      channelDrawer: { isOpen: false },
      alertDialog: {
        isOpen: false,
        title: '',
        description: '',
        confirmText: '확인',
        onConfirm: null,
      },
    })),
}));
