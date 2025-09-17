import { TextMessageData } from "../../types/messageTypes";

interface TextMessageProps {
  data: TextMessageData;
  isMine: boolean;
}

export function TextMessage({ data, isMine }: TextMessageProps) {
  const { content, isLongText } = data;

  const isEdited = content.startsWith("✍🏻 ");
  const displayContent = isEdited ? content.slice(3) : content;

  return (
    <div className={`max-w-xs md:max-w-md ${isMine ? "ml-auto" : "mr-auto"}`}>
      <div
        className={`
          px-3 py-2 rounded-lg break-words
          ${
            isMine
              ? "bg-blue-500 text-white rounded-br-sm"
              : "bg-gray-200 text-gray-800 rounded-bl-sm"
          }
        `}
      >
        {/* 메시지 내용 */}
        <div
          className={`
            text-sm leading-relaxed
            ${isLongText ? "overflow-hidden" : "whitespace-pre-wrap"}
          `}
          style={
            isLongText
              ? {
                  display: "-webkit-box",
                  WebkitLineClamp: 15,
                  WebkitBoxOrient: "vertical",
                  whiteSpace: "pre-wrap",
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
              전체보기({displayContent.length.toLocaleString()}자)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
