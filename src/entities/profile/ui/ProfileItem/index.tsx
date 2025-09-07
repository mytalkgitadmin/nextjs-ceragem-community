import { getThumbnailUrl } from "../../@x/attachment";
import ProfileCard from "../ProfileCard";
import type { Profile } from "../../model";
import type { RelationType } from "../../@x/channel";

export default function ProfileItem({
  profile,
  accountId,
  editedName,
  syncName,
  isMyProfile,
  type,
  isMaster,
  relationType,
  onClick,
}: {
  profile: Profile;
  accountId: number;
  editedName: string;
  syncName: string;
  isMyProfile?: boolean;
  type?: "friend" | "talk";
  isMaster?: boolean;
  relationType?: RelationType;
  onClick?: () => void;
}) {
  const profileImageUrl = getThumbnailUrl(profile);
  return (
    <>
      <ProfileCard
        profile={profile}
        profileImageUrl={profileImageUrl}
        editedName={editedName}
        syncName={syncName}
        onClick={onClick}
        isMyProfile={isMyProfile}
        type={type}
        isMaster={isMaster}
        relationType={relationType}
      />
    </>
  );
}
