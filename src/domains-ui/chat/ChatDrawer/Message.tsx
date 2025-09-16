"use client";

import { Avatar } from "@/shared-ui";
import { useGroupChannel } from "@sendbird/uikit-react/GroupChannel/context";
import { useAuth } from "@/domains/auth/hooks/useAuth";

interface MessageProps {
  messageContent: any; // Sendbird의 MessageContentProps 타입을 any로 처리
}

export function Message({ messageContent }: MessageProps) {
  const { message, chainTop, chainBottom } = messageContent;
  const { sendBirdId } = useAuth();

  // 메시지가 없으면 early return
  if (!message) {
    console.warn("Message is null or undefined");
    return null;
  }

  // 디버깅: 메시지 객체 구조 확인
  console.log("Message object:", message);
  console.log("Message type:", message.messageType);
  console.log("Message content:", message.message);

  const isMyMessage = sendBirdId === message.sender?.userId;
  const showProfile = !isMyMessage && chainTop;
  const showSenderName = !isMyMessage && chainTop;

  const formatTime = (createdAt: number) => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const displayHours = hours % 12 || 12;
    return `${ampm} ${displayHours}:${minutes.toString().padStart(2, "0")}`;
  };

  const renderMessageContent = () => {
    if (!message) return null;

    // User message 처리 (텍스트 메시지)
    if (
      message.messageType === "user" ||
      (!message.messageType && message.message)
    ) {
      return (
        <div className="break-words whitespace-pre-wrap text-sm">
          {message.message || "메시지 없음"}
        </div>
      );
    }

    // File message 처리
    if (message.messageType === "file" || message.url) {
      const isImage = message.type?.startsWith("image/");

      if (isImage) {
        return (
          <div className="max-w-sm">
            <img
              src={message.url}
              alt={message.name}
              className="rounded-lg max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => messageContent.showFileViewer?.(true)}
            />
            {message.name && (
              <p className="text-xs text-gray-500 mt-1 truncate">
                {message.name}
              </p>
            )}
          </div>
        );
      } else {
        return (
          <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {message.name}
              </p>
              <p className="text-xs text-gray-500">
                {message.size
                  ? `${(message.size / 1024).toFixed(1)} KB`
                  : "파일"}
              </p>
            </div>
          </div>
        );
      }
    }

    // Admin message 처리
    if (message.messageType === "admin" || message.messageType === "MESG") {
      return (
        <div className="text-center py-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {message.message || "시스템 메시지"}
          </span>
        </div>
      );
    }

    // 기본 메시지 (알 수 없는 타입)
    return (
      <div className="break-words whitespace-pre-wrap text-sm text-gray-500">
        {message.message || "알 수 없는 메시지 타입"}
      </div>
    );
  };

  // Admin 메시지는 중앙 정렬로 별도 처리
  if (message?.messageType === "admin" || message?.messageType === "MESG") {
    return (
      <div className="w-full flex justify-center py-2">
        {renderMessageContent()}
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
            alt={message.sender?.nickname || "사용자"}
            size="sm"
          />
        </div>
      ) : !isMyMessage ? (
        <div className="flex-shrink-0 mr-2 w-8" />
      ) : null}

      <div
        className={`max-w-[70%] ${isMyMessage ? "flex flex-col items-end" : ""}`}
      >
        {/* 발신자 이름 */}
        {showSenderName && (
          <div className="mb-1">
            <span className="text-sm font-medium text-gray-700">
              {message.sender?.nickname || "사용자"}
            </span>
          </div>
        )}

        {/* 메시지 내용과 시간을 같은 줄에 배치 */}
        <div
          className={`flex items-end gap-2 ${isMyMessage ? "flex-row-reverse" : "flex-row"}`}
        >
          {/* 메시지 버블 */}
          <div
            className={`px-3 py-2 rounded-2xl max-w-full ${
              isMyMessage
                ? "bg-blue-500 text-white rounded-br-md"
                : "bg-gray-100 text-gray-900 rounded-bl-md"
            }`}
          >
            {renderMessageContent()}
          </div>

          {/* 메시지 전송 시간 */}
          <div className="flex-shrink-0">
            <span className="text-xs text-gray-500">
              {formatTime(message.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
