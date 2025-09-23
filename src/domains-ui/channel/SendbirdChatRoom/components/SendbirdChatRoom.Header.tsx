"use client";

import { useGroupChannel } from "@sendbird/uikit-react/GroupChannel/context";
import { useDrawer } from "@/drawer-system";
import { useChannelName } from "@/domains/channel";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { ClockCircleOutlined, MenuOutlined } from "@ant-design/icons";

interface SendbirdChatRoomHeaderProps {
  className?: string;
  onBackClick?: () => void;
}

export function SendbirdChatRoomHeader({
  className = "",
  onBackClick,
}: SendbirdChatRoomHeaderProps) {
  const { state } = useGroupChannel();

  const { currentChannel: channel, loading } = state;

  const handleMoreOptions = () => {
    console.log("더보기 옵션"); //TODO
  };

  return (
    <div
      className={`flex items-center justify-between p-4 bg-white border-b border-gray-200 ${className}`}
    >
      {/* 왼쪽 영역: 뒤로가기 + 채널 정보 */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <button
          onClick={onBackClick}
          className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M12 19L5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex-1 min-w-0">
            {channel && <ChannelName channel={channel} />}
          </div>
        </div>
      </div>

      {/* 오른쪽 영역: 액션 버튼들 */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleMoreOptions}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="더보기"
        >
          <ClockCircleOutlined />
        </button>
        {/* 메뉴 옵션 */}
        <button
          onClick={handleMoreOptions}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="더보기"
        >
          <MenuOutlined />
        </button>
      </div>
    </div>
  );
}

const ChannelName = ({ channel }: { channel: GroupChannel }) => {
  const channelName = useChannelName(channel);

  return (
    <h2 className="text-lg font-semibold text-gray-900 truncate">
      {channelName}
    </h2>
  );
};
