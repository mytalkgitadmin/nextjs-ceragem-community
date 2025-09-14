"use client";

import { TabNavigation, type TabItem } from "@/shared-ui";

export type ChatListTabType = "chats" | "announcements";

export interface ChatListTabNavProps {
  activeTab: ChatListTabType;
  onTabChange: (tab: ChatListTabType) => void;
  className?: string;
}

export function ChatListTabNav({
  activeTab,
  onTabChange,
  className = "",
}: ChatListTabNavProps) {
  const tabs: TabItem[] = [
    { key: "chats", label: "대화방" },
    { key: "announcements", label: "공지사항" },
  ];

  return (
    <div className="px-4 border-b border-gray-200">
      <TabNavigation
        tabs={tabs}
        activeKey={activeTab}
        onTabChange={(tabId) => onTabChange(tabId as ChatListTabType)}
        className={className}
      />
    </div>
  );
}
