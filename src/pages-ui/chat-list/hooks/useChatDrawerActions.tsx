import { GroupChannel } from "@sendbird/chat/groupChannel";
import { useDrawer } from "@/drawer-system";
import { SendbirdChatDrawerContent } from "@/domains-ui";

export function useChatDrawerActions() {
  const { openDrawer } = useDrawer();

  const handleChannelSelect = (channel: GroupChannel) => {
    openDrawer(<SendbirdChatDrawerContent channel={channel} />, {
      title: channel?.name || "채팅방",
      width: "max-w-full",
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
    });
  };

  return {
    handleChannelSelect,
  };
}