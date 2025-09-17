import React from "react";
import { SingleChatAvatar } from "./SingleChatAvatar";
import { GroupChatAvatars } from "./GroupChatAvatars";

export interface ChatMemberAvatarsProps {
  memberCount: number;
  members: any[];
  channelInfo?: any;
  channel?: any;
  profileImg: (profile: any, size: string, status?: string) => string;
  bemilyProfileList?: string[];
  className?: string;
}

const CHAT_TYPE_THRESHOLD = 2;

export const ChatMemberAvatars: React.FC<ChatMemberAvatarsProps> = ({
  memberCount,
  members,
  channelInfo,
  channel,
  profileImg,
  bemilyProfileList,
  className,
}) => {
  const isSingleOrDualChat = memberCount <= CHAT_TYPE_THRESHOLD;

  if (isSingleOrDualChat) {
    return (
      <SingleChatAvatar
        members={members}
        memberCount={memberCount}
        profileImg={profileImg}
        bemilyProfileList={bemilyProfileList}
        className={className}
      />
    );
  }

  return (
    <GroupChatAvatars
      members={members}
      channelInfo={channelInfo}
      channel={channel}
      memberCount={memberCount}
      profileImg={profileImg}
      className={className}
    />
  );
};

ChatMemberAvatars.displayName = "ChatMemberAvatars";
