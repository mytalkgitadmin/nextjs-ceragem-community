import { removeEditPrefix } from "../../utils/messageTextUtils";

interface MessageTextProps {
  content: string;
  isLongText?: boolean;
  className?: string;
}

export function MessageText({
  content,
  isLongText = false,
  className = "",
}: MessageTextProps) {
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
            onClick={() => {
              // TODO: 모달로 전체 텍스트 보기 구현 예정
              console.log("전체보기 클릭");
            }}
          >
            전체보기
          </button>
        </div>
      )}
    </>
  );
}
