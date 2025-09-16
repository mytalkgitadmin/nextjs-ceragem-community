import { TextMessageData } from "../../types/messageTypes";

interface TextMessageProps {
  data: TextMessageData;
  isMine: boolean;
}

export function TextMessage({ data, isMine }: TextMessageProps) {
  const { content, isLongText } = data;

  // 긴 텍스트인 경우 미리보기용 텍스트 생성 (500자 제한)
  const previewContent = isLongText ? content.substring(0, 500) : content;

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
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {previewContent}
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
              전체보기({content.length.toLocaleString()}자)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
