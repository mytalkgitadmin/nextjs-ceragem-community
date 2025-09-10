// ⚠️  DEPRECATED: 이 파일의 상태들은 도메인별로 분리되었습니다.
// 새로운 store들을 사용해주세요:
// - Profile Modal: @/features/profile/store/useProfileModalStore
// - Channel Drawer: @/features/chat/store/useChannelDrawerStore  
// - Alert Dialog: @/shared/store/useAlertStore

import { create } from 'zustand';
import { useProfileModalStore } from '@/features/profile/store/useProfileModalStore';
import { useChannelDrawerStore } from '@/features/chat/store/useChannelDrawerStore';
import { useAlertStore } from './useAlertStore';

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

// 하위 호환성을 위한 통합 훅 (단계적 마이그레이션용)
export const useUIStore = (): UIState => {
  const profileModal = useProfileModalStore((state) => state.profileModal);
  const openProfileModal = useProfileModalStore((state) => state.openProfileModal);
  const closeProfileModal = useProfileModalStore((state) => state.closeProfileModal);

  const channelDrawer = useChannelDrawerStore((state) => state.channelDrawer);
  const openChannelDrawer = useChannelDrawerStore((state) => state.openChannelDrawer);
  const closeChannelDrawer = useChannelDrawerStore((state) => state.closeChannelDrawer);

  const alertDialog = useAlertStore((state) => state.alertDialog);
  const openAlertDialog = useAlertStore((state) => state.openAlertDialog);
  const closeAlertDialog = useAlertStore((state) => state.closeAlertDialog);

  const closeAllModals = () => {
    closeProfileModal();
    closeChannelDrawer();
    closeAlertDialog();
  };

  return {
    profileModal,
    channelDrawer,
    alertDialog,
    openProfileModal,
    closeProfileModal,
    openChannelDrawer,
    closeChannelDrawer,
    openAlertDialog,
    closeAlertDialog,
    closeAllModals,
  };
};
