"use client";

import { useState } from "react";
import { ChatList, ChatItemData } from "@/domains-ui";
import { ChatListHeader } from "./ChatListHeader";
import { ChatListTabNav, type ChatListTabType } from "./ChatListTabNav";

export interface ChatListPageProps {}

// 더미 데이터
const mockChats: ChatItemData[] = [
  {
    id: "1",
    name: "본사 공지사항",
    lastMessage:
      "공지사항 채팅방이 오늘부터 영업됩니다. 채팅으로 안전한 나은 커...",
    timestamp: "오전 10:31",
    unreadCount: 0,
    isNew: true,
  },
  {
    id: "2",
    name: "고객님 홍길동",
    lastMessage:
      "가장 마지막 대화 메시지가 노출되는 영역입니다. 안전한 나은 커...",
    timestamp: "오전 10:31",
    unreadCount: 39,
  },
  {
    id: "3",
    name: "김지정장",
    lastMessage:
      "가장 마지막 대화 메시지가 노출되는 영역입니다. 안전한 나은 커...",
    timestamp: "오전 10:30",
    unreadCount: 1,
    role: "직원",
  },
  {
    id: "4",
    name: "김세라",
    lastMessage:
      "가장 마지막 대화 메시지가 노출되는 영역입니다. 안전한 나은 나은 커",
    timestamp: "8월 3일",
    unreadCount: 0,
    role: "본사",
  },
  {
    id: "5",
    name: "본사&지점장 소통방",
    lastMessage: "네, 확인됩니다 감사합니다!",
    timestamp: "8월 25일",
    unreadCount: 0,
    isGroup: true,
    groupCount: 5,
  },
  {
    id: "6",
    name: "최코치",
    lastMessage:
      "가장 마지막 대화 메시지가 노출되는 영역입니다. 안전한 나은 커...",
    timestamp: "24.12.05",
    unreadCount: 0,
    role: "코치",
  },
  {
    id: "7",
    name: "(임수원는 사용자)",
    lastMessage:
      "가장 마지막 대화 메시지가 노출되는 영역입니다. 안전한 나은 커...",
    timestamp: "23.12.05",
    unreadCount: 0,
  },
];

export function ChatListPage({}: ChatListPageProps) {
  const [activeTab, setActiveTab] = useState<ChatListTabType>("chats");

  const displayedChats = activeTab === "chats" ? mockChats : [];

  return (
    <>
      {/* Header */}
      <ChatListHeader />

      {/* Tab Navigation */}
      <ChatListTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <ChatList
          chats={displayedChats}
          emptyMessage={
            activeTab === "chats"
              ? "대화방이 없습니다."
              : "공지사항이 없습니다."
          }
        />
      </div>
    </>
  );
}
