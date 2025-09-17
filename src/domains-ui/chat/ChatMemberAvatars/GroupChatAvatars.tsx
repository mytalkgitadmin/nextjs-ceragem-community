import React from "react";
import { Avatar, AvatarGroup } from "@/shared-ui/display";
import styles from "./ChatMemberAvatars.module.css";
import { memberProfileShortImg } from "@/domains/chat/utils/memberProfile";

interface GroupChatAvatarsProps {
  members: any[];
}

export const GroupChatAvatars: React.FC<GroupChatAvatarsProps> = ({
  members,
}) => {
  const memberCount = members.length;
  const renderMemberAvatars = () => (
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
            src={memberProfileShortImg(member, "short")}
            className={styles.group_avatar}
          />
        );
      })}
    </AvatarGroup>
  );

  return (
    <div className={`${styles.group_chat_container}`}>
      {renderMemberAvatars()}
    </div>
  );
};

GroupChatAvatars.displayName = "GroupChatAvatars";
