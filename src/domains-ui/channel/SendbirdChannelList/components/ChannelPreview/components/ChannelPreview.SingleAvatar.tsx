import React from "react";
import { Avatar } from "@/shared-ui/display";
import { memberProfileShortImg } from "@/domains/channel/utils/memberProfileUtils";

interface ChannelPreviewSingleAvatarProps {
  members: any[];
}

export const ChannelPreviewSingleAvatar: React.FC<
  ChannelPreviewSingleAvatarProps
> = ({ members }) => {
  const memberCount = members.length;

  const renderMemberAvatar = (member: any, index: number) => {
    // 1명일 때는 기본 프로필 사용
    if (memberCount === 1) {
      return (
        <Avatar
          key={`mem_${member.accountId}_${index}`}
          src={"/assets/images/profile/bemily_default_profile.webp"}
          size={64}
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
      />
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {members?.map(renderMemberAvatar)}
    </div>
  );
};

ChannelPreviewSingleAvatar.displayName = "ChannelPreviewSingleAvatar";
