"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, Badge } from "@/shared-ui";
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

const roleVariantMap: Record<
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
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

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

  const currentMessages = messages.length > 0 ? messages : dummyMessages;

  // 자동 스크롤 기능
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage?.(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full w-full flex flex-col min-h-0">
      {/* 메시지 영역 - 전체 너비 사용하며 flex-1로 남은 공간 모두 차지 */}
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
            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`flex w-full ${message.isMine ? "justify-end" : "justify-start"}`}
              >
                {!message.isMine && (
                  <div className="flex-shrink-0 mr-3">
                    <Avatar
                      src={chatInfo.avatar}
                      alt={message.senderName}
                      size="sm"
                    />
                  </div>
                )}

                <div className="max-w-[85%] sm:max-w-[75%] md:max-w-[70%]">
                  {!message.isMine && (
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {message.senderName}
                      </span>
                      {message.senderRole && (
                        <Badge
                          variant={roleVariantMap[message.senderRole]}
                          size="xs"
                        >
                          {message.senderRole}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.isMine
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>

                  <div
                    className={`mt-1 ${message.isMine ? "text-right" : "text-left"}`}
                  >
                    <span className="text-xs text-gray-500">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* 스크롤 하단 참조 요소 */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* 입력 영역 - 고정 높이, 하단 고정 */}
      <div className="flex-shrink-0 w-full border-t border-gray-200 bg-white sticky bottom-0">
        <div className="p-4">
          <div className="flex items-end space-x-2">
            <button className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="13"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: "40px", maxHeight: "100px" }}
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="flex-shrink-0 p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M2 21L23 12L2 3L2 10L17 12L2 14L2 21Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
