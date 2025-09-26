import React from "react";
import { Avatar, AvatarGroup } from "@/shared-ui/display";
import { memberProfileShortImg } from "@/domains/channel/utils/memberProfileUtils";
import styles from "./ChannelPreview.GroupAvatars.module.css";

interface ChannelPreviewGroupAvatarsProps {
  members: any[];
}

export const ChannelPreviewGroupAvatars: React.FC<
  ChannelPreviewGroupAvatarsProps
> = ({ members }) => {
  const memberCount = members.length;

  const renderMemberAvatars = () => (
    <AvatarGroup className={styles.chat_list_avatar}>
      {members.map((member, index) => {
        // 그룹에서는 본인 제외
        if (memberCount !== 1 && member.relationType === "ME") {
          return null;
        }

        return (
          <Avatar
            key={`member_${member.accountId}_${index}`}
            src={memberProfileShortImg(member, "short")}
            className={styles.chat_avatar}
          />
        );
      })}
    </AvatarGroup>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {renderMemberAvatars()}
    </div>
  );
};

ChannelPreviewGroupAvatars.displayName = "ChannelPreviewGroupAvatars";
