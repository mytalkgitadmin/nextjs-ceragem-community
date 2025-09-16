import { useEffect, useRef } from "react";
import { MessageListProps } from "./types";
import { MessageItem } from "./MessageItem";

export function MessageList({ messages, chatInfo }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤 기능
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 w-full overflow-y-auto min-h-0 relative">
      <div className="flex flex-col h-full">
        <div className="p-4 pb-2">
          {/* 날짜 표시 */}
          <div className="flex justify-center mb-4">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              2025년 08월15일 (금)
            </span>
          </div>
        </div>

        {/* 메시지 목록 - 패딩을 분리하여 스크롤 최적화 */}
        <div
          ref={messageListRef}
          className="flex-1 px-4 pb-4 space-y-4 overflow-y-auto"
        >
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              chatAvatar={chatInfo.avatar || ""}
            />
          ))}
          {/* 스크롤 하단 참조 요소 */}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
