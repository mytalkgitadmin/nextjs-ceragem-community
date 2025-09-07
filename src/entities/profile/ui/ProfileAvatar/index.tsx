import SingleAvatar from "./components/SingleAvatar";
import GroupAvatar from "./components/GroupAvatar";

type ProfileAvatarProps =
  | ({ variant?: "single" } & {
      imageUrl: string;
      size?: number;
      isMyProfile?: boolean;
      isUpdatedProfile?: boolean;
      relationType?: import("../../@x/channel").RelationType;
    })
  | ({ variant: "group" } & {
      members: import("@/entities/channel/model/entity-types").MemberEntity[];
      customType: string | "MY";
      myProfileImageUrl?: string;
    });

export default function ProfileAvatar(props: ProfileAvatarProps) {
  if (props.variant === "group") {
    const { members, customType, myProfileImageUrl } = props;
    return (
      <GroupAvatar
        members={members}
        customType={customType}
        myProfileImageUrl={myProfileImageUrl}
      />
    );
  }

  const { imageUrl, size, isMyProfile, isUpdatedProfile, relationType } = props;
  return (
    <SingleAvatar
      imageUrl={imageUrl}
      size={size}
      isMyProfile={isMyProfile}
      isUpdatedProfile={isUpdatedProfile}
      relationType={relationType}
    />
  );
}

export { SingleAvatar, GroupAvatar };
