import { useState } from "react";
import { removeEditPrefix } from "../../utils/messageTextUtils";
import { MessageViewModal } from "./MessageViewModal";

interface MessageTextProps {
  content: string;
  isLongText?: boolean;
  className?: string;
  senderName?: string;
}

export function MessageText({
  content,
  isLongText = false,
  className = "",
  senderName,
}: MessageTextProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const displayContent = removeEditPrefix(content);

  return (
    <>
      <div
        className={`
          text-sm leading-relaxed
          ${isLongText ? "overflow-hidden" : "whitespace-pre-wrap"}
          ${className}
        `}
        style={
          isLongText
            ? {
                display: "-webkit-box",
                WebkitLineClamp: 10,
                WebkitBoxOrient: "vertical" as any,
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }
            : {}
        }
      >
        {displayContent}
      </div>

      {/* 긴 텍스트 전체보기 버튼 */}
      {isLongText && (
        <div className="mt-2">
          <button
            className="text-xs opacity-60 hover:opacity-80 underline"
            onClick={() => setModalOpen(true)}
          >
            전체보기
          </button>
        </div>
      )}

      <MessageViewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        content={content}
        senderName={senderName}
      />
    </>
  );
}
