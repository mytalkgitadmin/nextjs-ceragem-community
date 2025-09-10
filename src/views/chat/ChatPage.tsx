"use client";

import "@/styles/sendbird.css";
import styles from "./ChatPage.module.scss";

import { ChatList } from "@/features/chat/ui/ChatList";
import { ChatView } from "@/features/chat/ui/ChatView";
import { useChatLayoutStore } from "@/features/chat/ui/ChatView/store/useChatLayoutStore";
import { useCallback, useEffect, useRef } from "react";
import { IconButton } from "@/shared/ui/IconButton";

export default function ChatPage() {
  const { isChatListVisible, closeChatList, initializeChatList } =
    useChatLayoutStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = () => {
    closeChatList();
  };

  // 화면 크기 변경 감지 및 처리
  const handleResize = useCallback(() => {
    const isMobile = window.innerWidth <= 640;

    // 모바일로 전환될 때 ChatList 닫기
    if (isMobile && isChatListVisible) {
      closeChatList();
    }
    // 데스크톱으로 전환될 때는 사용자의 마지막 설정 유지
  }, [isChatListVisible, closeChatList]);

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    initializeChatList();
  }, [initializeChatList]);

  // 리사이즈 이벤트 리스너
  useEffect(() => {
    // 디바운스된 리사이즈 핸들러
    let timeoutId: NodeJS.Timeout;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  // ESC 키로 ChatList 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMobile = window.innerWidth <= 640;
      if (event.key === "Escape" && isChatListVisible && isMobile) {
        closeChatList();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isChatListVisible, closeChatList]);

  return (
    <div className={styles.chat}>
      <div
        className={`${styles.chatListContainer} ${
          isChatListVisible ? styles.visible : styles.hidden
        }`}
      >
        <ChatList />

        <IconButton
          name="x"
          className={styles.close}
          text="닫기"
          onClick={closeChatList}
        />
      </div>

      {/* Mobile Overlay - 640px 이하에서만 표시 */}
      {isChatListVisible && (
        <div
          ref={overlayRef}
          className={styles.overlay}
          onClick={handleOverlayClick}
        />
      )}
      <ChatView />
    </div>
  );
}
