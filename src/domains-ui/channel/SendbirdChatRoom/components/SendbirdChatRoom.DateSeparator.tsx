"use client";

import { BaseMessage } from "@sendbird/chat/message";
import { formatKoreanDate } from "@/shared/utils";

interface SendbirdChatRoomDateSeparatorProps {
  message: BaseMessage;
}

export function SendbirdChatRoomDateSeparator({
  message,
}: SendbirdChatRoomDateSeparatorProps) {
  const createdAt = message.createdAt;

  return (
    <div className="flex justify-center py-4">
      <div className="bg-gray-100 rounded-full px-4 py-2">
        <span className="text-xs text-gray-600 font-medium">
          {formatKoreanDate(createdAt)}
        </span>
      </div>
    </div>
  );
}
