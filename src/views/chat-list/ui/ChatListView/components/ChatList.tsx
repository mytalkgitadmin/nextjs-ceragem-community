"use client";

import { SendbirdProvider } from "@/features/channel-messaging";
import ChatListHeader from "./ChatListHeader";
import { GroupChannelListProvider } from "@sendbird/uikit-react/GroupChannelList/context";
import GroupChannelListUI from "@sendbird/uikit-react/GroupChannelList/components/GroupChannelListUI";
import { Loading } from "@/shared/ui/media";

import { useChannelStore } from "@/entities/channel";

export default function ChatList() {
  const { currentChannelUrl, setCurrentChannelUrl } = useChannelStore();

  return (
    <SendbirdProvider>
      <ChatListHeader />
      <GroupChannelListProvider
        onChannelSelect={(channel) => {
          setCurrentChannelUrl(channel?.url);
          // router.navigate({ to: "/chat" });
        }}
        onChannelCreated={(channel) => {
          setCurrentChannelUrl(channel.url);
        }}
        selectedChannelUrl={currentChannelUrl}
        channelListQueryParams={{
          // 운영 PRIVATE 제외
          customTypesFilter: ["PRIVATE", "DIRECT", "MY", "GROUP"], // 'PRIVATE', 'DIRECT', 'MY', 'GROUP'
          limit: 100,
        }}
        className="h-full"
      >
        <GroupChannelListUI
          renderHeader={() => <></>}
          renderChannelPreview={({ channel, isSelected }) => (
            <div>test</div>
            // <ChatListItem channel={channel} isSelected={!!isSelected} />
          )}
          renderPlaceHolderLoading={() => <></>}
        />
      </GroupChannelListProvider>
    </SendbirdProvider>
  );
}
