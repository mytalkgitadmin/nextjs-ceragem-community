import React, { useState } from "react";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  ChannelType,
  useCreateChatRoom,
  useInviteChatRoom,
} from "@/domains/channel";
import { ContactSelection } from "@/domains-ui/contact";
import { useAutoDrawer } from "@/shared-ui/hooks";

export interface ChatListPageCreateMenuProps {
  onChannelCreated?: () => void;
}

export const CHAT_TYPE_OPTIONS = [
  {
    id: ChannelType.DIRECT,
    label: "1:1 대화",
    description: "개인과 직접 대화하기",
    icon: UserIcon,
    maxParticipants: 1,
  },
  {
    id: ChannelType.GROUP,
    label: "그룹 채팅",
    description: "여러 명과 함께 대화하기",
    icon: UserGroupIcon,
  },
];

export function ChatListPageCreateMenu({
  onChannelCreated,
}: ChatListPageCreateMenuProps) {
  const { openAutoCloseDrawer } = useAutoDrawer();

  const openMemberSelection = () => {
    openAutoCloseDrawer(
      ContactSelection,
      {
        onSelectionChange: (selectedIds) => {
          console.log(selectedIds);
        },
      },
      {
        // autoCloseCallbacks: ["onSelectionChange"],
        width: "max-w-full",
        title: "대화 상태 선택",
      }
    );
  };

  return (
    <div className="grid gap-3">
      {CHAT_TYPE_OPTIONS.map((option) => {
        const IconComponent = option.icon;
        return (
          <button
            key={option.id}
            onClick={openMemberSelection}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200 text-left group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label={`${option.label} 시작하기`}
          >
            <div className="flex-shrink-0 p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
              <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            </div>

            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">{option.label}</h4>
              <p className="text-sm text-gray-600">{option.description}</p>
              {option.maxParticipants && (
                <p className="text-xs text-gray-500 mt-1">
                  최대 {option.maxParticipants}명
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
