"use client";

import { GroupChannel } from "@sendbird/chat/groupChannel";
import { ChannelProvider } from "@sendbird/uikit-react/Channel/context";
import ChannelUI from "@sendbird/uikit-react/Channel/components/ChannelUI";

export interface SendbirdChatDrawerContentProps {
  channel: GroupChannel;
}

export function SendbirdChatDrawerContent({
  channel,
}: SendbirdChatDrawerContentProps) {
  return (
    <div className="h-full w-full flex flex-col min-h-0">
      <ChannelProvider channelUrl={channel?.url}>
        <ChannelUI />
      </ChannelProvider>
    </div>
  );
}
