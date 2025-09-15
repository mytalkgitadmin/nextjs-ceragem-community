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

// Dummy data
const dummyMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "user1",
    senderName: "김세라",
    senderRole: "본사",
    content:
      "안녕하세요 고객님!\n세라젬에 궁금하신 사항은 편하게 말씀해주세요~",
    timestamp: "오전 11:24",
    isMine: false,
  },
  {
    id: "2",
    senderId: "me",
    senderName: "나",
    content:
      "안녕하세요\n이번에 세라젬 신상품은 언제쯤 출시 되나요?\n또한 렌탈 하게 되면 매월 고정적으로 지출되는 금액과\n이사 시 유의사항이 궁금합니다!",
    timestamp: "오전 11:26",
    isMine: true,
  },
];

export function ChatDrawerContent({
  chatInfo,
  messages = [],
  onSendMessage,
}: ChatDrawerContentProps) {
  const currentMessages = messages.length > 0 ? messages : dummyMessages;

  const handleSendMessage = (message: string) => {
    onSendMessage?.(message);
  };

  return (
    <div className="h-full w-full flex flex-col min-h-0">
      <MessageList messages={currentMessages} chatInfo={chatInfo} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
