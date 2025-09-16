"use client";

import { useState, useEffect } from "react";
import "./sendbird.css";
import { GroupChannelListProvider } from "@sendbird/uikit-react/GroupChannelList/context";
import GroupChannelListUI from "@sendbird/uikit-react/GroupChannelList/components/GroupChannelListUI";
import { CustomChannelPreview } from "./components";
import { useChatDrawerActions } from "./hooks";

export function ChatListTab() {
  const [mounted, setMounted] = useState(false);
  const { handleChannelSelect } = useChatDrawerActions();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-full">
      <GroupChannelListProvider
        onChannelSelect={handleChannelSelect}
        onChannelCreated={() => {}}
        disableAutoSelect={true}
        channelListQueryParams={{
          // 운영 PRIVATE 제외
          customTypesFilter: ["DIRECT", "MY", "GROUP"], // 'PRIVATE', 'DIRECT', 'MY', 'GROUP'
        }}
      >
        <GroupChannelListUI
          renderHeader={() => <></>}
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
