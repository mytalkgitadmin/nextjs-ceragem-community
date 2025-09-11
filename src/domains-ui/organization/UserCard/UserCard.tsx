"use client";

import { Avatar, Badge, Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";

export interface UserCardProps {
  id: string;
  name: string;
  profileImage?: string;
  status?: "online" | "offline";
  statusText?: string;
  description?: string;
  badgeText?: string;
  badgeColor?: "default" | "processing" | "success" | "error" | "warning";
  onMessageClick?: (userId: string) => void;
  className?: string;
}

export function UserCard({
  id,
  name,
  profileImage,
  status = "offline",
  statusText,
  description,
  badgeText,
  badgeColor = "default",
  onMessageClick,
  className = "",
}: UserCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 ${className}`}
    >
      <div className="flex items-center space-x-3">
        <Avatar size={48} src={profileImage} className="bg-gray-300">
          {name.charAt(0)}
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">{name}</span>
            {badgeText && (
              <Badge status={badgeColor} text={badgeText} className="text-xs" />
            )}
          </div>
          {description && (
            <p className="text-sm text-gray-500 mt-1 truncate max-w-xs">
              {description}
            </p>
          )}
          {statusText && (
            <p className="text-xs text-gray-400 mt-1">{statusText}</p>
          )}
        </div>
      </div>

      {onMessageClick && (
        <Button
          type="text"
          shape="round"
          icon={<MessageOutlined />}
          onClick={() => onMessageClick(id)}
          className="text-gray-500 hover:text-blue-500"
        >
          메시지
        </Button>
      )}
    </div>
  );
}
