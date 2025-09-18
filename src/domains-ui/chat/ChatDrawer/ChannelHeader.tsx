"use client";

import { useGroupChannel } from "@sendbird/uikit-react/GroupChannel/context";
import { Avatar } from "@/shared-ui";
import { useDrawer } from "@/drawer-system";
import { ClockCircleOutlined, MenuOutlined } from "@ant-design/icons";

interface ChannelHeaderProps {
  className?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function ChannelHeader({
  className = "",
  showBackButton = true,
  onBackClick,
}: ChannelHeaderProps) {
  const { state } = useGroupChannel();
  const { closeDrawer } = useDrawer();

  const channel = state.currentChannel;

  if (!channel) {
    return (
      <div
        className={`flex items-center justify-between p-4 bg-white border-b border-gray-200 ${className}`}
      >
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <button
              onClick={onBackClick || (() => closeDrawer(""))}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
          )}
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          <div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-16 mt-1" />
          </div>
        </div>
      </div>
    );
  }

  const getChannelName = () => {
    if (channel.name) {
      return channel.name;
    }

    // 그룹 채널의 경우 참가자 이름으로 채널명 생성
    const members = channel.members || [];
    const memberNames = members
      .map((member) => member.nickname || "사용자")
      .slice(0, 3)
      .join(", ");

    if (members.length > 3) {
      return `${memberNames} 외 ${members.length - 3}명`;
    }

    return memberNames || "채팅";
  };

  const getChannelAvatar = () => {
    if (channel.coverUrl) {
      return channel.coverUrl;
    }

    // 1:1 채팅의 경우 상대방 프로필 이미지 사용
    if (channel.memberCount === 2) {
      const otherMember = channel.members?.find(
        (member) => member.userId !== (channel as any).currentUser?.userId
      );
      return otherMember?.profileUrl || "";
    }

    return "";
  };

  const handleMoreOptions = () => {
    // 더보기 옵션 메뉴 표시 (팝오버 또는 모달)
    console.log("더보기 옵션");
  };

  return (
    <div
      className={`flex items-center justify-between p-4 bg-white border-b border-gray-200 ${className}`}
    >
      {/* 왼쪽 영역: 뒤로가기 + 채널 정보 */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {showBackButton && (
          <button
            onClick={onBackClick || (() => closeDrawer(""))}
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
        )}

        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <Avatar src={getChannelAvatar()} alt={getChannelName()} size="md" />

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {getChannelName()}
            </h2>
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
