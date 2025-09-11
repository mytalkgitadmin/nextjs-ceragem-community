"use client";

import "@/styles/sendbird.css";
import { ChatLayout } from "@/widgets/ChatLayout";

/**
 * ChatPage View
 * 채팅 화면의 뷰 레이어 - 단순한 렌더링만 담당
 * 비즈니스 로직은 ChatLayout widget에서 처리
 */
export default function ChatPage() {
  return <ChatLayout />;
}
