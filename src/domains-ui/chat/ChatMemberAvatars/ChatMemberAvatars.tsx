import React from "react";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { ChatMemberAvatarsSingle } from "./components/ChatMemberAvatars.Single";
import { ChatMemberAvatarsGroup } from "./components/ChatMemberAvatars.Group";
import { useChannelMembers } from "@/domains/chat";

export interface ChatMemberAvatarsProps {
  channel: GroupChannel;
}

const CHAT_TYPE_THRESHOLD = 2;

export const ChatMemberAvatars: React.FC<ChatMemberAvatarsProps> = ({
  channel,
}) => {
  const members = useChannelMembers(channel);
  const isGroup = members.length > CHAT_TYPE_THRESHOLD;

  if (!isGroup) {
    return <ChatMemberAvatarsSingle members={members} />;
  }

  return <ChatMemberAvatarsGroup members={members} />;
};

ChatMemberAvatars.displayName = "ChatMemberAvatars";
