"use client";

import { TabNavigation, type TabItem } from "@/shared-ui";
import {
  ChatBubbleOvalLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useAutoModal } from "@/shared-ui/hooks";
import { ChatListPageCreateMenu } from "./ChatListPage.CreateMenu";

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
  const { openAutoCloseModal } = useAutoModal();

  const tabs: TabItem[] = [
    { key: "chats", label: "대화방" },
    { key: "announcements", label: "공지사항" },
  ];

  const openChannelCreateMenu = () => {
    openAutoCloseModal(
      "대화방 만들기",
      ChatListPageCreateMenu,
      {
        onChannelCreated: () => {
          console.log("대화방 만들기 완료");
        },
      },
      {
        autoCloseCallbacks: ["onChannelCreated"],
      }
    );
  };

  const renderActions = () => {
    if (activeTab === "chats") {
      return (
        <div className="flex items-center space-x-2">
          <button
            onClick={openChannelCreateMenu}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ChatBubbleOvalLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      );
    }
    if (activeTab === "announcements") {
      return <>구현 예정</>;
    }
    return null;
  };

  return (
    <div className="flex items-center space-x-2 border-b border-gray-200 justify-between pr-4">
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
