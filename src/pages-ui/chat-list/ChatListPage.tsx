"use client";

import { useState } from "react";
import {
  ChatListPageHeader,
  ChatListPageTabNav,
  ChatListPageChatListTab,
} from "./components";

export interface ChatListPageProps {}

export function ChatListPage({}: ChatListPageProps) {
  const [activeTab, setActiveTab] = useState("chats");

  const renderTabContent = () => {
    switch (activeTab) {
      case "chats":
        return (
          <div className="flex-1 overflow-y-auto">
            <ChatListPageChatListTab />
          </div>
        );
      case "announcements":
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">공지사항 탭 (구현 예정)</p>
          </div>
        );
    }
  };

  return (
    <>
      {/* Header */}
      <ChatListPageHeader />

      {/* Tab Navigation */}
      <ChatListPageTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Chat List / Announcement List */}
      {renderTabContent()}
    </>
  );
}
