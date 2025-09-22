"use client";

import { useState, useRef, useCallback, KeyboardEvent } from "react";
import { useGroupChannel } from "@sendbird/uikit-react/GroupChannel/context";

interface SendbirdMessageInputProps {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  onSendMessage?: (message: string) => void;
}

export function SendbirdMessageInput({
  className = "",
  disabled = false,
  placeholder = "메시지를 입력하세요...",
  onSendMessage,
}: SendbirdMessageInputProps) {
  const { actions } = useGroupChannel();
  const { sendUserMessage } = actions;
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 텍스트 영역 높이 자동 조절
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);

  // 메시지 전송 핸들러
  const handleSendMessage = useCallback(async () => {
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage || disabled) return;

    try {
      // Sendbird를 통한 메시지 전송
      if (sendUserMessage) {
        await sendUserMessage({ message: trimmedMessage });
      }

      // 커스텀 콜백 호출
      onSendMessage?.(trimmedMessage);

      // 입력 필드 초기화
      setInputValue("");

      // 텍스트 영역 높이 리셋
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  }, [inputValue, disabled, sendUserMessage, onSendMessage]);

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  // 파일 첨부 핸들러 (추후 확장 가능)
  const handleFileAttachment = () => {
    // 파일 선택 로직 구현
    console.log("파일 첨부 기능");
  };

  const canSendMessage = inputValue.trim().length > 0 && !disabled;

  return (
    <div
      className={`flex-shrink-0 bg-white border-t border-gray-200 ${className}`}
    >
      <div className="p-4">
        <div className="flex items-end gap-3">
          {/* 파일 첨부 버튼 */}
          <button
            onClick={handleFileAttachment}
            disabled={disabled}
            className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="파일 첨부"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59722 21.9983 8.005 21.9983C6.41278 21.9983 4.88583 21.3658 3.76 20.24C2.63417 19.1142 2.00166 17.5872 2.00166 15.995C2.00166 14.4028 2.63417 12.8758 3.76 11.75L12.33 3.18C13.0806 2.42944 14.0956 2.00834 15.155 2.00834C16.2144 2.00834 17.2294 2.42944 17.98 3.18C18.7306 3.93056 19.1517 4.94556 19.1517 6.005C19.1517 7.06444 18.7306 8.07944 17.98 8.83L10.54 16.27C10.1648 16.6452 9.65082 16.8573 9.115 16.8573C8.57918 16.8573 8.06518 16.6452 7.69 16.27C7.31482 15.8948 7.10272 15.3808 7.10272 14.845C7.10272 14.3092 7.31482 13.7952 7.69 13.42L15.07 6.05"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* 메시지 입력 영역 */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              style={{
                minHeight: "48px",
                maxHeight: "120px",
                lineHeight: "1.5",
              }}
            />
          </div>

          {/* 전송 버튼 */}
          <button
            onClick={handleSendMessage}
            disabled={!canSendMessage}
            className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
            title="메시지 전송"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
