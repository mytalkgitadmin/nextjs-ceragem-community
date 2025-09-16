"use client";

import { useState, useEffect, useMemo } from "react";
import "./sendbird.css";
import { GroupChannelListProvider } from "@sendbird/uikit-react/GroupChannelList/context";
import GroupChannelListUI from "@sendbird/uikit-react/GroupChannelList/components/GroupChannelListUI";
import { ChannelListEmpty } from "./ChannelListEmpty";
import { ChannelListError } from "./ChannelListError";
import { ChannelListLoading } from "./ChannelListLoading";
import { ChannelPreview } from "../ChannelPreview";
import { useChannelOpen } from "@/domains/chat";

export function SendbirdChannelList() {
  const { openChannel } = useChannelOpen();

  return (
    <GroupChannelListProvider
      onChannelSelect={(channel) => channel && openChannel(channel)}
      onChannelCreated={() => {}}
      disableAutoSelect={true}
      channelListQueryParams={{
        customTypesFilter: ["DIRECT", "MY", "GROUP"], // 'PRIVATE', 'DIRECT', 'MY', 'GROUP'
      }}
    >
      <GroupChannelListUI
        renderHeader={() => <></>}
        renderPlaceHolderEmptyList={() => <ChannelListEmpty />}
        renderPlaceHolderError={() => <ChannelListError />}
        renderPlaceHolderLoading={() => <ChannelListLoading />}
        renderChannelPreview={(props) => <ChannelPreview {...props} />}
      />
    </GroupChannelListProvider>
  );
}
