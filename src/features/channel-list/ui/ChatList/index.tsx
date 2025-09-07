import { GroupChannelListProvider } from "@sendbird/uikit-react/GroupChannelList/context";
import GroupChannelListUI from "@sendbird/uikit-react/GroupChannelList/components/GroupChannelListUI";

import { useChannelStore } from "../../model/useChannelStore";
import { ChatListHeader, ChatListItem } from "./components";
// Router 제거됨

export default function ChatList() {
  const { currentChannelUrl, setCurrentChannelUrl } = useChannelStore();

  return (
    <>
      <ChatListHeader />
      <GroupChannelListProvider
        onChannelSelect={(channel) => {
          setCurrentChannelUrl(channel?.url);
        }}
        onChannelCreated={(channel) => {
          setCurrentChannelUrl(channel.url);
        }}
        selectedChannelUrl={currentChannelUrl}
        channelListQueryParams={{
          // 운영 PRIVATE 제외
          customTypesFilter: ["PRIVATE", "DIRECT", "MY", "GROUP"], // 'PRIVATE', 'DIRECT', 'MY', 'GROUP'
        }}
      >
        <GroupChannelListUI
          renderHeader={() => <></>}
          renderChannelPreview={({ channel, isSelected }) => (
            <ChatListItem channel={channel} isSelected={!!isSelected} />
          )}
        />
      </GroupChannelListProvider>
    </>
  );
}
