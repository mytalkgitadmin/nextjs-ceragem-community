import { ReplyMessageData } from "../../types/messageTypes";
import { getMessageTypeIcon } from "../../utils/messageTypeUtils";

interface ReplyMessageProps {
  data: ReplyMessageData;
  isMine: boolean;
}

export function ReplyMessage({ data, isMine }: ReplyMessageProps) {
  const { content, parentMessage } = data;

  return (
    <div className={`max-w-xs md:max-w-md ${isMine ? 'ml-auto' : 'mr-auto'}`}>
      <div
        className={`
          rounded-lg overflow-hidden
          ${isMine
            ? 'bg-blue-500 text-white rounded-br-sm'
            : 'bg-gray-200 text-gray-800 rounded-bl-sm'
          }
        `}
      >
        {/* 원본 메시지 인용 */}
        <div
          className={`
            p-3 border-l-4
            ${isMine
              ? 'bg-blue-400 border-blue-200'
              : 'bg-gray-100 border-gray-400'
            }
          `}
        >
          <div className="flex items-center mb-1">
            <span className="text-xs mr-1">
              {getMessageTypeIcon(parentMessage.messageType)}
            </span>
            <span className="text-xs font-medium opacity-75">
              {parentMessage.senderName}
            </span>
          </div>
          <div className="text-xs opacity-75 line-clamp-2">
            {parentMessage.content}
          </div>
        </div>

        {/* 답장 내용 */}
        <div className="p-3">
          <div className="flex items-center mb-2">
            <span className="text-sm mr-2">↩️</span>
            <span className="text-xs font-medium opacity-75">답장</span>
          </div>
          <div className="text-sm whitespace-pre-wrap">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}