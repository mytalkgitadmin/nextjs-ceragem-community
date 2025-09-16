"use client";

import { ChatItemData, UserRole } from "../ChatItem";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

// Types
export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole?: UserRole;
  content: string;
  timestamp: string;
  isMine: boolean;
}

export interface ChatDrawerContentProps {
  chatInfo: ChatItemData;
  messages?: ChatMessage[];
  onSendMessage?: (message: string) => void;
}

export interface MessageItemProps {
  message: ChatMessage;
  chatAvatar: string;
}

export interface MessageListProps {
  messages: ChatMessage[];
  chatInfo: ChatItemData;
}

export interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

// Constants
export const roleVariantMap: Record<
  UserRole,
  "primary" | "secondary" | "success" | "warning" | "danger" | "info"
> = {
  직원: "info",
  본사: "danger",
  코치: "secondary",
  지점장: "primary",
};


export function ChatDrawerContent({
  chatInfo,
  messages = [],
  onSendMessage,
}: ChatDrawerContentProps) {
  const handleSendMessage = (message: string) => {
    onSendMessage?.(message);
  };

  return (
    <div className="h-full w-full flex flex-col min-h-0">
      <MessageList messages={messages} chatInfo={chatInfo} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
