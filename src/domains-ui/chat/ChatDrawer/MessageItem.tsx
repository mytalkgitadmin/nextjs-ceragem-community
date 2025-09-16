import { Avatar, Badge } from "@/shared-ui";
import { MessageItemProps, roleVariantMap } from "./types";

export function MessageItem({ message, chatAvatar }: MessageItemProps) {
  return (
    <div
      className={`flex w-full ${message.isMine ? "justify-end" : "justify-start"}`}
    >
      {!message.isMine && (
        <div className="flex-shrink-0 mr-3">
          <Avatar src={chatAvatar} alt={message.senderName} size="sm" />
        </div>
      )}

      <div className="max-w-[85%] sm:max-w-[75%] md:max-w-[70%]">
        {!message.isMine && (
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-gray-900">
              {message.senderName}
            </span>
            {message.senderRole && (
              <Badge variant={roleVariantMap[message.senderRole]} size="xs">
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
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>

        <div className={`mt-1 ${message.isMine ? "text-right" : "text-left"}`}>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
        </div>
      </div>
    </div>
  );
}
