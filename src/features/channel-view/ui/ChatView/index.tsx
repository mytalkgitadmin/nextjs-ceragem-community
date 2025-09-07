import { GroupChannelProvider } from "@sendbird/uikit-react/GroupChannel/context";
import { useChannelStore } from "../model/useChannelStore";

import { Channel } from "./components";

export default function ChatView() {
  const { currentChannelUrl } = useChannelStore();

  return (
    <GroupChannelProvider channelUrl={currentChannelUrl || ""}>
      <Channel />
    </GroupChannelProvider>
  );
}
