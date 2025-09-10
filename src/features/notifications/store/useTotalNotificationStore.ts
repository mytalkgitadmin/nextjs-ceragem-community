import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TotalNotificationState } from '../model';

export const useTotalNotificationStore = create<TotalNotificationState>()(
  persist(
    (set, get) => ({
      // 읽지 않은 채팅 메시지
      chatUnreadCount: 0,
      setChatUnreadCount: (count: number) => {
        set({ chatUnreadCount: count });
        get().calculateTotalCount();
      },

      // 친구 요청 메시지
      friendRequestCount: 0,
      setFriendRequestCount: (count: number) => {
        set({ friendRequestCount: count });
        get().calculateTotalCount();
      },
      increaseFriendRequestCount: () => {
        set((state) => ({
          friendRequestCount: state.friendRequestCount + 1,
        }));
        get().calculateTotalCount();
      },
      decreaseFriendRequestCount: () => {
        set((state) => ({
          friendRequestCount: Math.max(0, state.friendRequestCount - 1),
        }));
        get().calculateTotalCount();
      },

      // Firebase 알림
      firebaseCount: 0,
      setFirebaseCount: (count: number) => {
        set({ firebaseCount: count });
        get().calculateTotalCount();
      },
      increaseFirebaseCount: () => {
        set((state) => ({
          firebaseCount: state.firebaseCount + 1,
        }));
        get().calculateTotalCount();
      },
      decreaseFirebaseCount: () => {
        set((state) => ({
          firebaseCount: Math.max(0, state.firebaseCount - 1),
        }));
        get().calculateTotalCount();
      },

      // 전체 카운트
      totalUnreadCount: 0,
      calculateTotalCount: () => {
        const state = get();
        const total =
          state.chatUnreadCount +
          state.friendRequestCount +
          state.firebaseCount;

        set({ totalUnreadCount: total });
      },

      // 모든 카운트 초기화
      resetAllCounts: () => {
        set({
          chatUnreadCount: 0,
          friendRequestCount: 0,
          firebaseCount: 0,
          totalUnreadCount: 0,
        });
      },
    }),
    {
      name: 'total-notification-count',
      storage: createJSONStorage(() => sessionStorage),
      // 상태 복원 시 자동으로 총 카운트 재계산
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.calculateTotalCount();
        }
      },
    },
  ),
);
