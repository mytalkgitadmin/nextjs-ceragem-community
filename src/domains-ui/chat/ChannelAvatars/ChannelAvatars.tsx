import React from "react";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { ChannelAvatarsGroup, ChannelAvatarsSingle } from "./components";

import { useChannelMembers } from "@/domains/chat";

export interface ChannelAvatarsProps {
  channel: GroupChannel;
}

const CHAT_TYPE_THRESHOLD = 2;

export const ChannelAvatars: React.FC<ChannelAvatarsProps> = ({ channel }) => {
  const members = useChannelMembers(channel);
  const isGroup = members.length > CHAT_TYPE_THRESHOLD;

  if (!isGroup) {
    return <ChannelAvatarsSingle members={members} />;
  }

  return <ChannelAvatarsGroup members={members} />;
};

ChannelAvatars.displayName = "ChannelAvatars";
