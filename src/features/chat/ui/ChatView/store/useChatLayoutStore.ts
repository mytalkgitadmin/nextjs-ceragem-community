import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface ChatLayoutState {
  isChatListVisible: boolean;
  toggleChatList: () => void;
  closeChatList: () => void;
  openChatList: () => void;
  initializeChatList: () => void;
}
export const useChatLayoutStore = create<ChatLayoutState>()(
  persist(
    (set) => ({
      isChatListVisible: true,
      toggleChatList: () =>
        set((state) => ({ isChatListVisible: !state.isChatListVisible })),
      closeChatList: () => set({ isChatListVisible: false }),
      openChatList: () => set({ isChatListVisible: true }),

      // 화면 크기에 따라 초기 상태 설정
      initializeChatList: () => {
        const isMobile = window.innerWidth <= 640;
        set({ isChatListVisible: !isMobile }); // 모바일이면 false, 데스크톱이면 true
      },
    }),
    {
      name: 'chat-layout-storage',
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    },
  ),
);
