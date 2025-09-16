import { TextMessageData } from "../../types/messageTypes";

interface TextMessageProps {
  data: TextMessageData;
  isMine: boolean;
}

export function TextMessage({ data, isMine }: TextMessageProps) {
  const { content, isLongText } = data;

  return (
    <div className={`max-w-xs md:max-w-md ${isMine ? 'ml-auto' : 'mr-auto'}`}>
      <div
        className={`
          px-3 py-2 rounded-lg break-words
          ${isMine
            ? 'bg-blue-500 text-white rounded-br-sm'
            : 'bg-gray-200 text-gray-800 rounded-bl-sm'
          }
          ${isLongText ? 'max-h-32 overflow-y-auto' : ''}
        `}
      >
        {/* 긴 텍스트 표시 */}
        {isLongText && (
          <div className="flex items-center mb-2 text-xs opacity-75">
            <span>📄 긴 메시지</span>
          </div>
        )}

        {/* 메시지 내용 */}
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {content}
        </div>

        {/* 글자 수 표시 (긴 텍스트의 경우) */}
        {isLongText && (
          <div className="mt-2 text-xs opacity-60">
            {content.length.toLocaleString()}자
          </div>
        )}
      </div>
    </div>
  );
}