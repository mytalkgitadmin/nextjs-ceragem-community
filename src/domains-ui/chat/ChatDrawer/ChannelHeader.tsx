"use client";

import { useGroupChannel } from "@sendbird/uikit-react/GroupChannel/context";
import { useDrawer } from "@/drawer-system";

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

  const getChannelInfo = () => {
    const memberCount = channel.memberCount || 0;

    if (memberCount <= 2) {
      // 1:1 채팅의 경우 온라인 상태 표시
      const otherMember = channel.members?.find(
        (member) => member.userId !== (channel as any).currentUser?.userId
      );
      if (otherMember) {
        return otherMember.connectionStatus === "online"
          ? "온라인"
          : "오프라인";
      }
    }

    return `참가자 ${memberCount}명`;
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
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {getChannelName()}
            </h2>
            <p className="text-sm text-gray-500 truncate">{getChannelInfo()}</p>
          </div>
        </div>
      </div>

      {/* 오른쪽 영역: 액션 버튼들 */}
      <div className="flex items-center space-x-2">
        {/* 음성 통화 버튼 */}
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="음성 통화"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.19 12.85C3.49997 10.2412 2.44825 7.27099 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.21649 3.36162C2.3051 3.09849 2.44748 2.85669 2.63473 2.65162C2.82199 2.44655 3.04974 2.28271 3.30372 2.17052C3.55771 2.05833 3.83227 2.00026 4.11 2H7.11C7.59531 1.99522 8.06711 2.16708 8.43849 2.48353C8.80988 2.79999 9.05423 3.23945 9.13 3.72C9.27147 4.68007 9.52132 5.62273 9.87 6.53C10.0334 6.88792 10.0671 7.28313 9.96735 7.65898C9.86761 8.03484 9.64435 8.36811 9.33 8.61L8.09 9.85C9.51355 12.4135 11.5865 14.4865 14.15 15.91L15.39 14.67C15.6319 14.3557 15.9652 14.1324 16.341 14.0327C16.7169 13.9329 17.1121 13.9666 17.47 14.13C18.3773 14.4787 19.3199 14.7285 20.28 14.87C20.7658 14.9458 21.2094 15.1917 21.5265 15.5673C21.8437 15.9429 22.0122 16.4207 22 16.92Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 영상 통화 버튼 */}
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="영상 통화"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <polygon
              points="23 7 16 12 23 17 23 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="1"
              y="5"
              width="15"
              height="14"
              rx="2"
              ry="2"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>

        {/* 더보기 옵션 */}
        <button
          onClick={handleMoreOptions}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="더보기"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="1"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="19"
              cy="12"
              r="1"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="5"
              cy="12"
              r="1"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
