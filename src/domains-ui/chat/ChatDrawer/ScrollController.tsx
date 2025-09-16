"use client";

import { useEffect, useState, useRef } from "react";
import { useGroupChannel } from "@sendbird/uikit-react/GroupChannel/context";

interface ScrollControllerProps {
  className?: string;
}

export function ScrollController({ className = "" }: ScrollControllerProps) {
  const { actions } = useGroupChannel();
  const { scrollToBottom } = actions;
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messageListRef = useRef<HTMLDivElement>(null);

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      const element = messageListRef.current;
      if (!element) return;

      const { scrollTop, scrollHeight, clientHeight } = element;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;

      setShowScrollButton(isScrolledUp);

      // 스크롤이 하단에 있으면 읽지 않은 메시지 카운트 리셋
      if (!isScrolledUp) {
        setUnreadCount(0);
      }
    };

    const element =
      document.querySelector(".sendbird-message-list") ||
      document.querySelector('[data-testid="sendbird-message-list"]') ||
      document.querySelector(".message-list");

    if (element) {
      messageListRef.current = element as HTMLDivElement;
      element.addEventListener("scroll", handleScroll);

      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // 새 메시지가 도착했을 때 스크롤 하단에 있지 않으면 카운트 증가
  const handleNewMessage = () => {
    if (showScrollButton) {
      setUnreadCount((prev) => prev + 1);
    }
  };

  const handleScrollToBottom = () => {
    scrollToBottom?.();
    setShowScrollButton(false);
    setUnreadCount(0);
  };

  if (!showScrollButton) {
    return null;
  }

  return (
    <div className={`fixed bottom-20 right-4 z-50 ${className}`}>
      <button
        onClick={handleScrollToBottom}
        className="relative bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
      >
        {/* 읽지 않은 메시지 카운트 */}
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}

        {/* 아래 화살표 아이콘 */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="text-gray-600"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
