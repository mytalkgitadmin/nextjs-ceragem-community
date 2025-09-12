"use client";

import { Avatar, Badge, UnreadBadge } from "@/shared-ui";

export type UserRole = "직원" | "본사" | "코치" | "지점장";

export interface ChatItemData {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  role?: UserRole;
  isNew?: boolean;
  isGroup?: boolean;
  groupCount?: number;
}

export interface ChatItemProps {
  data: ChatItemData;
  onClick?: (data: ChatItemData) => void;
  className?: string;
}

const roleVariantMap: Record<
  UserRole,
  "primary" | "secondary" | "success" | "warning" | "danger" | "info"
> = {
  직원: "info",
  본사: "danger",
  코치: "secondary",
  지점장: "primary",
};

export function ChatItem({ data, onClick, className = "" }: ChatItemProps) {
  const {
    name,
    avatar,
    lastMessage,
    timestamp,
    unreadCount,
    role,
    isNew,
    isGroup,
    groupCount,
  } = data;

  return (
    <div
      onClick={() => onClick?.(data)}
      className={`
        flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200
        ${className}
      `}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <Avatar src={avatar} alt={name} size="md" />

        {/* 그룹 채팅 표시 */}
        {isGroup && groupCount && (
          <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full border-2 border-white">
            {groupCount}
          </div>
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 min-w-0 ml-3">
        {/* 이름과 배지들 */}
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>

          {/* NEW 배지 */}
          {isNew && (
            <Badge variant="danger" size="xs">
              NEW
            </Badge>
          )}

          {/* 역할 배지 */}
          {role && (
            <Badge variant={roleVariantMap[role]} size="xs">
              {role}
            </Badge>
          )}
        </div>

        {/* 마지막 메시지 */}
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex-shrink-0 ml-3 flex flex-col items-end space-y-1">
        {/* 시간 */}
        <span className="text-xs text-gray-400">{timestamp}</span>

        {/* 읽지 않은 메시지 배지 */}
        {unreadCount > 0 && <UnreadBadge count={unreadCount} />}
      </div>
    </div>
  );
}
