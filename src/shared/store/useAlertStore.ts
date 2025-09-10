// Alert state management (UI only - domain independent)

import { create } from 'zustand';

interface AlertState {
  // 알럿 상태
  alertDialog: {
    isOpen: boolean;
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    confirmText: string;
    onConfirm: (() => void) | null;
  };

  // 알럿 액션
  openAlertDialog: (config: {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    confirmText?: string;
    onConfirm: () => void;
  }) => void;
  closeAlertDialog: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alertDialog: {
    isOpen: false,
    title: '',
    description: '',
    confirmText: '확인',
    onConfirm: null,
  },

  openAlertDialog: (config: {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    confirmText?: string;
    onConfirm: () => void;
  }) =>
    set(() => ({
      alertDialog: {
        isOpen: true,
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
}));
