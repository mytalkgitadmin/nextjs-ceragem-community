"use client";

import { useState } from "react";
import { ChatListHeader } from "./ChatListHeader";
import { ChatListTabNav, type ChatListTabType } from "./ChatListTabNav";
import { ChatListTab } from "./ChatListTab";

export interface ChatListPageProps {}

export function ChatListPage({}: ChatListPageProps) {
  const [activeTab, setActiveTab] = useState<ChatListTabType>("chats");

  const renderTabContent = () => {
    switch (activeTab) {
      case "chats":
        return (
          <div className="flex-1 overflow-y-auto">
            <ChatListTab />
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
      <ChatListHeader />

      {/* Tab Navigation */}
      <ChatListTabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Chat List / Announcement List */}
      {/* {renderTabContent()} */}
    </>
  );
}
