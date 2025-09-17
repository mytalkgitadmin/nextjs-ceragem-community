import { useMemo } from "react";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { useChannelName } from "@/domains/chat";

interface ChannelPreviewProps {
  channel: GroupChannel;
  isSelected?: boolean;
  onClick?: (channel: GroupChannel) => void;
}

export function ChannelPreview({
  channel,
  isSelected,
  onClick,
}: ChannelPreviewProps) {
  const lastMessage = channel.lastMessage;
  const unreadCount = channel.unreadMessageCount;

  const channelName = useChannelName(channel);

  return (
    <div
      className={`
        flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200
        ${isSelected ? "bg-blue-50 border-r-2 border-blue-500" : ""}
      `}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          {channel.coverUrl ? (
            <img
              src={channel.coverUrl}
              alt={channelName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-600 text-sm font-medium">
              {channelName?.charAt(0) || "#"}
            </span>
          )}
        </div>

        {/* 그룹 채팅 표시 */}
        {channel.memberCount > 2 && (
          <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full border-2 border-white">
            {channel.memberCount}
          </div>
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 min-w-0 ml-3">
        {/* 이름과 배지들 */}
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {channelName || "이름 없는 채팅방"}
          </h3>
        </div>

        {/* 마지막 메시지 */}
        <p className="text-sm text-gray-500 truncate">
          {lastMessage
            ? lastMessage.messageType === "user"
              ? lastMessage.message
              : lastMessage.messageType === "file"
                ? "파일을 전송했습니다."
                : "메시지"
            : "메시지 없음"}
        </p>
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex-shrink-0 ml-3 flex flex-col items-end space-y-1">
        {/* 시간 */}
        <span className="text-xs text-gray-400">
          {lastMessage
            ? new Date(lastMessage.createdAt).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </span>

        {/* 읽지 않은 메시지 배지 */}
        {unreadCount > 0 && (
          <div className="flex items-center justify-center min-w-5 h-5 px-1 bg-red-500 text-white text-xs font-bold rounded-full">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </div>
    </div>
  );
}
