// Channel drawer state management

import { create } from 'zustand';

interface ChannelDrawerState {
  // 채널 드로어 상태
  channelDrawer: {
    isOpen: boolean;
  };

  // 채널 드로어 액션
  openChannelDrawer: () => void;
  closeChannelDrawer: () => void;
}

export const useChannelDrawerStore = create<ChannelDrawerState>((set) => ({
  channelDrawer: {
    isOpen: false,
  },

  // 채널 드로어 액션
  openChannelDrawer: () =>
    set((state) => ({
      channelDrawer: { ...state.channelDrawer, isOpen: true },
    })),

  closeChannelDrawer: () =>
    set((state) => ({
      channelDrawer: { ...state.channelDrawer, isOpen: false },
    })),
}));
