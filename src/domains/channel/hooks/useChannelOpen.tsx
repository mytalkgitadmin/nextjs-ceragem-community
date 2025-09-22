import { useDrawer } from "@/drawer-system";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { SendbirdChatRoom } from "@/domains-ui/channel/SendbirdChatRoom";

export const useChannelOpen = () => {
  const { openDrawer, requestCloseDrawer } = useDrawer();

  const openChannel = (channel: GroupChannel) => {
    const id = openDrawer(
      <SendbirdChatRoom
        channel={channel}
        onBackClick={() => {
          requestCloseDrawer(id);
        }}
      />,
      {
        width: "max-w-full",
        showBackButton: false,
      }
    );
  };

  return {
    openChannel,
  };
};
