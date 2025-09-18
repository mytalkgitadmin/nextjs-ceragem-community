"use client";

import { TabNavigation, type TabItem } from "@/shared-ui";
import {
  ChatBubbleOvalLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useModal } from "@/modal-system";
import { ChannelCreateOptions } from "@/domains-ui/chat";

export interface ChatListPageTabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function ChatListPageTabNav({
  activeTab,
  onTabChange,
  className = "",
}: ChatListPageTabNavProps) {
  const { openModal, closeModal } = useModal();

  const tabs: TabItem[] = [
    { key: "chats", label: "대화방" },
    { key: "announcements", label: "공지사항" },
  ];

  const openChannelCreateOptions = () => {
    const id = openModal(
      <ChannelCreateOptions
        onChannelCreated={() => {
          closeModal(id);
        }}
      />,
      {
        title: "대화방 만들기",
        size: "md",
      }
    );
  };

  const renderActions = () => {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={openChannelCreateOptions}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <ChatBubbleOvalLeftIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    );
  };

  return (
    <div className="flex items-center space-x-2 border-b border-gray-200 justify-between">
      <TabNavigation
        tabs={tabs}
        activeKey={activeTab}
        onTabChange={(tabId) => onTabChange(tabId)}
        className={className}
        showBorder={false}
      />
      <div className="flex items-center space-x-2">{renderActions()}</div>
    </div>
  );
}
