"use client";

import { TabNavigation, type TabItem } from "@/shared-ui";
import {
  ChatBubbleOvalLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useModal } from "@/modal-system";

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

  const renderCreateChatButton = () => {
    const { openModal } = useModal();
    return (
      <button
        onClick={() => {
          openModal(
            <div>
              <h1>Create Chat</h1>
            </div>
          );
        }}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        <ChatBubbleOvalLeftIcon className="w-6 h-6 text-gray-600" />
      </button>
    );
  };

  return (
    <div className="flex items-center space-x-2 border-b border-gray-200 justify-between">
      <TabNavigation
        tabs={tabs}
        activeKey={activeTab}
        onTabChange={(tabId) => onTabChange(tabId as ChatListTabType)}
        className={className}
        showBorder={false}
      />
      <div className="flex items-center space-x-2">
        {renderCreateChatButton()}
      </div>
    </div>
  );
}
