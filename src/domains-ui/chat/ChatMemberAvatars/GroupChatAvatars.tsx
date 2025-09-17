import React from "react";
import { Avatar, AvatarGroup } from "@/shared-ui/display";
import styles from "./ChatMemberAvatars.module.css";

interface GroupChatAvatarsProps {
  members: any[];
  channelInfo?: any;
  channel?: any;
  memberCount: number;
  profileImg: (profile: any, size: string, status?: string) => string;
  className?: string;
}

export const GroupChatAvatars: React.FC<GroupChatAvatarsProps> = ({
  members,
  channelInfo,
  channel,
  memberCount,
  profileImg,
  className,
}) => {
  const renderChannelInfoAvatars = () => (
    <AvatarGroup
      maxCount={4}
      size={44}
      prefixCls="preview_avatar"
      className={styles.group_avatar_list}
    >
      {members.map((member, index) => {
        // 그룹에서는 본인 제외
        if (memberCount !== 1 && member.relationType === "ME") {
          return null;
        }

        return (
          <Avatar
            key={`member_${member.accountId}_${index}`}
            src={profileImg(member.profile, "short", member.accountStatus)}
            className={styles.group_avatar}
          />
        );
      })}
    </AvatarGroup>
  );

  const renderChannelAvatars = () => (
    <AvatarGroup
      maxCount={4}
      size={44}
      prefixCls="preview_avatar"
      className={styles.group_avatar_list}
    >
      {channel?.members.map((member: any, index: number) => (
        <Avatar
          key={`member_${member.accountId}_${index}`}
          src={profileImg(undefined, "short", member.accountStatus)}
          className={styles.group_avatar}
        />
      ))}
    </AvatarGroup>
  );

  return (
    <div className={`${styles.group_chat_container} ${className || ""}`}>
      {channelInfo ? renderChannelInfoAvatars() : renderChannelAvatars()}
    </div>
  );
};

GroupChatAvatars.displayName = "GroupChatAvatars";
