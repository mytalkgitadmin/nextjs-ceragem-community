import React from "react";
import { Avatar } from "@/shared-ui/display";
import styles from "./ChatMemberAvatars.module.css";

interface SingleChatAvatarProps {
  members: any[];
  memberCount: number;
  profileImg: (profile: any, size: string, status?: string) => string;
  bemilyProfileList?: string[];
  className?: string;
}

export const SingleChatAvatar: React.FC<SingleChatAvatarProps> = ({
  members,
  memberCount,
  profileImg,
  bemilyProfileList = [],
  className,
}) => {
  const renderMemberAvatar = (member: any, index: number) => {
    // 1명일 때는 기본 프로필 사용
    if (memberCount === 1) {
      return (
        <Avatar
          key={`mem_${member.accountId}_${index}`}
          src={bemilyProfileList[0]}
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
        src={profileImg(member.profile, "short", member.accountStatus)}
        size={64}
        className={styles.single_avatar}
      />
    );
  };

  return (
    <div className={`${styles.single_chat_container} ${className || ""}`}>
      {members?.map(renderMemberAvatar)}
    </div>
  );
};

SingleChatAvatar.displayName = "SingleChatAvatar";
