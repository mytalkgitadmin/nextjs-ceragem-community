import { create } from "zustand";

interface UIState {
  // 알럿 상태
  alertDialog: {
    isOpen: boolean;
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    confirmText: string;
    onConfirm: (() => void) | null;
  };

  // 알럿
  openAlertDialog: (config: {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    confirmText?: string;
    onConfirm: () => void;
  }) => void;
  closeAlertDialog: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  alertDialog: {
    isOpen: false,
    title: "",
    description: "",
    confirmText: "확인",
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
        isOpen: true, // true로 변경!
        title: config.title || "",
        description: config.description || "",
        confirmText: config.confirmText || "확인",
        onConfirm: config.onConfirm,
      },
    })),

  closeAlertDialog: () =>
    set(() => ({
      alertDialog: {
        isOpen: false,
        title: "",
        description: "",
        confirmText: "확인",
        onConfirm: null,
      },
    })),
}));
