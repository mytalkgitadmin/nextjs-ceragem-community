"use client";

import { MessageContentProps } from "@sendbird/uikit-react/ui/MessageContent";
import { useMemo, useCallback } from "react";
import { Avatar } from "@/shared-ui";
import { useAuth } from "@/domains/auth/hooks/useAuth";
import { MessageRenderer } from "./components/MessageRenderer";
import { isEditedMessage } from "./utils/messageTextUtils";
import { formatTime } from "@/shared/utils/dateUtils";

interface MessageProps {
  messageContent: MessageContentProps;
}

export function Message({ messageContent }: MessageProps) {
  const { message, chainTop, chainBottom } = messageContent;
  const { sendBirdId } = useAuth();

  const isEdited = isEditedMessage(message.message);
  const isMyMessage = sendBirdId === message.sender?.userId;
  const showProfile = !isMyMessage && !chainTop;
  const showSenderName = !isMyMessage && !chainTop;
  const showTime = !chainBottom;
  const senderName = message.sender?.nickname || "사용자";

  const formattedTime = useMemo(
    () => formatTime(message.createdAt),
    [formatTime, message.createdAt]
  );

  // Admin 메시지는 중앙 정렬로 별도 처리
  if (message?.messageType === "admin" || message?.messageType === "MESG") {
    return (
      <div className="w-full flex justify-center py-2">
        <MessageRenderer
          message={message}
          isMine={isMyMessage}
          senderName={senderName}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex w-full mb-1 ${isMyMessage ? "justify-end" : "justify-start"} ${chainBottom ? "mb-4" : ""}`}
    >
      {/* 프로필 아바타 영역 */}
      {showProfile ? (
        <div className="flex-shrink-0 mr-2">
          <Avatar
            src={message.sender?.profileUrl || ""}
            alt={senderName}
            size={48}
          />
        </div>
      ) : !isMyMessage ? (
        <div className="flex-shrink-0 mr-2 w-8" />
      ) : null}

      <div
        className={`max-w-[95%] ${isMyMessage ? "flex flex-col items-end" : ""}`}
      >
        {/* 발신자 이름 */}
        {showSenderName && (
          <div className="mb-1">
            <span className="text-sm font-medium text-gray-700">
              {senderName}
            </span>
          </div>
        )}

        {/* 메시지 내용과 시간을 같은 줄에 배치 */}
        <div
          className={`flex items-end gap-2 ${isMyMessage ? "flex-row-reverse" : "flex-row"}`}
        >
          {/* 메시지 렌더러 */}
          <div className="max-w-full">
            <MessageRenderer
              message={message}
              isMine={isMyMessage}
              senderName={senderName}
            />
          </div>

          {/* 메시지 전송 시간 */}
          {showTime && (
            <div className="flex-shrink-0">
              <span className="text-xs text-gray-500">{formattedTime}</span>
            </div>
          )}
        </div>

        {/* 편집됨 표시 - 메시지와 같은 정렬 */}
        {isEdited && (
          <div className={`mt-1 ${isMyMessage ? "text-right" : "text-left"}`}>
            <span className="text-xs text-gray-500">편집됨</span>
          </div>
        )}
      </div>
    </div>
  );
}
