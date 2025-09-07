import type { Profile } from "../../../model";

const DEFAULT_SMALL_PROFILE = "/assets/profile/bemilyDefaultProfile.webp";
import SingleAvatar from "./SingleAvatar";
import styles from "./GroupAvatar.module.scss";
import { getThumbnailUrl } from "../../../@x/attachment";

interface GroupAvatarProps {
  members: Member[];
  customType: string | "MY";
  myProfileImageUrl?: string;
}

export default function GroupAvatar({
  members,
  customType,
  myProfileImageUrl,
}: GroupAvatarProps) {
  if (customType === "MY") {
    return (
      <>
        <SingleAvatar
          imageUrl={myProfileImageUrl || DEFAULT_SMALL_PROFILE}
          isMyProfile
        />
      </>
    );
  }

  // 알수 없는 사용자
  if (members && members.length === 0) {
    return <SingleAvatar imageUrl={DEFAULT_SMALL_PROFILE} />;
  }
  if (members && members.length > 0) {
    return (
      <div
        className={styles[`group${members.length >= 4 ? 4 : members?.length}`]}
      >
        {members?.slice(0, 4).map((member, index) => (
          <div
            className={styles.circle}
            key={`member_${index}_${member.accountId}`}
          >
            <img
              src={getThumbnailUrl(member.profile)}
              alt={`멤버 ${index + 1}`}
            />
          </div>
        ))}
      </div>
    );
  }
}
