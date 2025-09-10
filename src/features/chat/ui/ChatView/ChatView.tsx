"use client";

import { GroupChannelProvider } from "@sendbird/uikit-react/GroupChannel/context";
import { useChannelStore } from "@/features/chat/store";

import Channel from "./components/Channel/Channel";

export default function ChatView() {
  const { currentChannelUrl } = useChannelStore();

  return (
    <GroupChannelProvider channelUrl={currentChannelUrl || ""}>
      <Channel />
    </GroupChannelProvider>
  );
}
