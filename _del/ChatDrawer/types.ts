import { ChatItemData, UserRole } from "../ChatItem";

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

export const roleVariantMap: Record<
  UserRole,
  "primary" | "secondary" | "success" | "warning" | "danger" | "info"
> = {
  직원: "info",
  본사: "danger",
  코치: "secondary",
  지점장: "primary",
};