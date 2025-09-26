import { useAutoDrawer } from "@/shared-ui/hooks";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { SendbirdChatRoom } from "@/domains-ui/channel";

export const useChatRoomOpen = () => {
  const { openAutoCloseDrawer } = useAutoDrawer();

  const openChannel = (channel: GroupChannel) => {
    openAutoCloseDrawer(
      SendbirdChatRoom,
      {
        channel,
        onBackClick: () => {
          console.log("back");
        },
      },
      {
        autoCloseCallbacks: ["onBackClick"],
        showBackButton: false,
        width: "max-w-full",
      }
    );
  };

  return {
    openChannel,
  };
};
