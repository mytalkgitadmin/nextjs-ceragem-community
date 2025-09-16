import { useDrawer } from "@/drawer-system";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { SendbirdChatDrawerContent } from "@/domains-ui/chat";

export const useChannelOpen = () => {
  const { openDrawer, requestCloseDrawer } = useDrawer();

  const openChannel = (channel: GroupChannel) => {
    const id = openDrawer(
      <SendbirdChatDrawerContent
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
