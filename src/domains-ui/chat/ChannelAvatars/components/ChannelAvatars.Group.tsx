import React from "react";
import { Avatar, AvatarGroup } from "@/shared-ui/display";
import { memberProfileShortImg } from "@/domains/chat/utils/memberProfileUtils";

interface ChannelAvatarsGroupProps {
  members: any[];
}

export const ChannelAvatarsGroup: React.FC<ChannelAvatarsGroupProps> = ({
  members,
}) => {
  const memberCount = members.length;

  const renderMemberAvatars = () => (
    <AvatarGroup>
      {members.map((member, index) => {
        // 그룹에서는 본인 제외
        if (memberCount !== 1 && member.relationType === "ME") {
          return null;
        }

        return (
          <Avatar
            key={`member_${member.accountId}_${index}`}
            src={memberProfileShortImg(member, "short")}
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

ChannelAvatarsGroup.displayName = "ChannelAvatarsGroup";
