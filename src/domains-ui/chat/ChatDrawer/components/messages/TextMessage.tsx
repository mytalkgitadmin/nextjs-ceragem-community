import { TextMessageData } from "../../types/messageTypes";
import { MessageText } from "../common/MessageText";

interface TextMessageProps {
  data: TextMessageData;
  isMine: boolean;
}

export function TextMessage({ data, isMine }: TextMessageProps) {
  const { content, isLongText } = data;

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
        <MessageText
          content={content}
          isLongText={isLongText}
          senderName={isMine ? "나" : data.senderName}
        />
      </div>
    </div>
  );
}
