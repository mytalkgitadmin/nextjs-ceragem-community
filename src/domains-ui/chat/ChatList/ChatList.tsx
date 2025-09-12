"use client";

import { ChatItem, ChatItemData } from "../ChatItem";

export interface ChatListProps {
  chats: ChatItemData[];
  onChatClick?: (chat: ChatItemData) => void;
  emptyMessage?: string;
  className?: string;
}

export function ChatList({
  chats,
  onChatClick,
  emptyMessage = "채팅방이 없습니다.",
  className = "",
}: ChatListProps) {
  if (chats.length === 0) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <p className="text-gray-500 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`divide-y divide-gray-100 ${className}`}>
      {chats.map((chat) => (
        <ChatItem key={chat.id} data={chat} onClick={onChatClick} />
      ))}
    </div>
  );
}
