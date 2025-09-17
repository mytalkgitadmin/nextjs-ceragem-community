import React from "react";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { SingleChatAvatar } from "./SingleChatAvatar";
import { GroupChatAvatars } from "./GroupChatAvatars";

export interface ChatMemberAvatarsProps {
  isGroup: boolean;
  members: any[];
}

export const ChatMemberAvatars: React.FC<ChatMemberAvatarsProps> = ({
  members,
  isGroup,
}) => {
  if (!isGroup) {
    return <SingleChatAvatar members={members} />;
  }

  return <GroupChatAvatars members={members} />;
};

ChatMemberAvatars.displayName = "ChatMemberAvatars";
