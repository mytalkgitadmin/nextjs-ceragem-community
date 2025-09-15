"use client";

import { GroupChannelListProvider } from "@sendbird/uikit-react/GroupChannelList/context";
import GroupChannelListUI from "@sendbird/uikit-react/GroupChannelList/components/GroupChannelListUI";
import { useDrawer } from "@/drawer-system";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { SendbirdChatDrawerContent } from "@/domains-ui";

export function ChatListTab() {
  const { openDrawer } = useDrawer();

  const handleChannelSelect = (channel: GroupChannel) => {
    // Sendbird 채널을 사용하여 ChatDrawer 열기
    openDrawer(<SendbirdChatDrawerContent channel={channel} />, {
      title: channel?.name || "채팅방",
      width: "max-w-full",
      // 헤더 액션 버튼들
      headerActions: (
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <circle cx="19" cy="12" r="1" fill="currentColor" />
              <circle cx="5" cy="12" r="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      ),
      onClose: () => {
        console.log("채팅방 닫기:", channel.name);
      },
    });
  };

  return (
    <div className="h-full">
      <GroupChannelListProvider
        onChannelSelect={handleChannelSelect}
        onChannelCreated={() => {}}
      >
        <GroupChannelListUI
          renderChannelPreview={(props) => <CustomChannelPreview {...props} />}
          renderPlaceHolderError={() => (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <svg
                className="w-16 h-16 mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm">채팅방을 불러올 수 없습니다.</p>
              <p className="text-xs text-gray-400">다시 시도해 주세요.</p>
            </div>
          )}
          renderPlaceHolderLoading={() => (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-sm text-gray-500">채팅방을 불러오는 중...</p>
            </div>
          )}
          renderPlaceHolderEmptyList={() => (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <svg
                className="w-16 h-16 mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-sm">대화방이 없습니다.</p>
              <p className="text-xs text-gray-400">
                새로운 대화를 시작해보세요.
              </p>
            </div>
          )}
        />
      </GroupChannelListProvider>
    </div>
  );
}

// 커스텀 채널 미리보기 컴포넌트
function CustomChannelPreview({ channel, onClick, isSelected }: any) {
  const lastMessage = channel.lastMessage;
  const unreadCount = channel.unreadMessageCount;

  return (
    <div
      onClick={onClick}
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
              alt={channel.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-600 text-sm font-medium">
              {channel.name?.charAt(0) || "#"}
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
            {channel.name || "이름 없는 채팅방"}
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
