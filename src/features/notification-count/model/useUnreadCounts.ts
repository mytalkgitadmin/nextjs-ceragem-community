"use client";

import { useMemo } from "react";
import { useNotificationStore } from "@/entities/notification";

export function useUnreadMessageCount() {
  const chatUnreadCount = useNotificationStore((s) => s.chatUnreadCount);
  return useMemo(() => chatUnreadCount, [chatUnreadCount]);
}

export function useFriendRequestCount() {
  const friendRequestCount = useNotificationStore((s) => s.friendRequestCount);
  return useMemo(() => friendRequestCount, [friendRequestCount]);
}
