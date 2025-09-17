import React from "react";
import { Avatar } from "@/shared-ui/display";
import styles from "./ChatMemberAvatars.module.css";
import { memberProfileShortImg } from "@/domains/chat/utils/memberProfile";

interface SingleChatAvatarProps {
  members: any[];
}

export const SingleChatAvatar: React.FC<SingleChatAvatarProps> = ({
  members,
}) => {
  const memberCount = members.length;

  const renderMemberAvatar = (member: any, index: number) => {
    // 1명일 때는 기본 프로필 사용
    if (memberCount === 1) {
      return (
        <Avatar
          key={`mem_${member.accountId}_${index}`}
          src={"/assets/profile/bemily_profile000.png"}
          size={64}
          className={styles.single_avatar}
        />
      );
    }

    // 2명일 때는 본인 제외
    if (member.relationType === "ME") {
      return null;
    }

    return (
      <Avatar
        key={`member_${member.accountId}_${index}`}
        src={memberProfileShortImg(member, "short")}
        size={64}
        className={styles.single_avatar}
      />
    );
  };

  return (
    <div className={`${styles.single_chat_container}`}>
      {members?.map(renderMemberAvatar)}
    </div>
  );
};

SingleChatAvatar.displayName = "SingleChatAvatar";
