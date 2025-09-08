"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TotalNotificationState {
  chatUnreadCount: number;
  friendRequestCount: number;
  // firebaseCount: number;

  setChatUnreadCount: (count: number) => void;
  setFriendRequestCount: (count: number) => void;
  increaseFriendRequestCount: () => void;
  decreaseFriendRequestCount: () => void;

  // setFirebaseCount: (count: number) => void;
  // increaseFirebaseCount: () => void;
  // decreaseFirebaseCount: () => void;
}

const useNotificationStore = create<TotalNotificationState>()(
  persist(
    (set, get) => ({
      chatUnreadCount: 0,
      setChatUnreadCount: (count) => set({ chatUnreadCount: count }),

      friendRequestCount: 0,
      setFriendRequestCount: (count) => set({ friendRequestCount: count }),
      increaseFriendRequestCount: () =>
        set((s) => ({ friendRequestCount: s.friendRequestCount + 1 })),
      decreaseFriendRequestCount: () =>
        set((s) => ({
          friendRequestCount: Math.max(0, s.friendRequestCount - 1),
        })),

      // firebaseCount: 0,
      // setFirebaseCount: (count) => set({ firebaseCount: count }),
      // increaseFirebaseCount: () =>
      //   set((s) => ({ firebaseCount: s.firebaseCount + 1 })),
      // decreaseFirebaseCount: () =>
      //   set((s) => ({ firebaseCount: Math.max(0, s.firebaseCount - 1) })),
    }),
    {
      name: "notification-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({
        chatUnreadCount: s.chatUnreadCount,
        friendRequestCount: s.friendRequestCount,
      }),
    }
  )
);

export default useNotificationStore;
