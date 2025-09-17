import React, { useState, SetStateAction, Dispatch } from "react";
import { GroupChannelListProvider } from "@sendbird/uikit-react/GroupChannelList/context";
import { useChannelOpen } from "@/domains/chat";
import { ChannelList } from "./ChannelList";
import "./sendbird.css";

export const SendbirdChannelList = ({}) => {
  const { openChannel } = useChannelOpen();

  return (
    <GroupChannelListProvider
      onChannelSelect={(channel) => channel && openChannel(channel)}
      onChannelCreated={() => {}}
      channelListQueryParams={{
        // 운영 PRIVATE 제외
        customTypesFilter: ["DIRECT", "MY", "GROUP"], // 'PRIVATE', 'DIRECT', 'MY', 'GROUP'
      }}
      disableAutoSelect
    >
      <ChannelList />
    </GroupChannelListProvider>
  );
};
