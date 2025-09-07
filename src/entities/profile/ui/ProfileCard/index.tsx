import type { Profile } from "../../model";
import type { RelationType } from "../../@x/channel";

import { SingleAvatar } from "../ProfileAvatar";
import styles from "./index.module.scss";
import { isUpdatedProfile } from "../../lib/is-updated-profile";
import { Icons } from "@/shared/ui/icon";

export interface ItemProps {
  profile: Profile;

  editedName?: string;
  syncName?: string;
  type?: "friend" | "talk";
  onClick?: () => void;
  profileImageUrl: string;
  horizon?: boolean;
  isMyProfile?: boolean;
  isMaster?: boolean;
  relationType?: RelationType;
}

export default function ProfileCard({
  profile,
  editedName,
  syncName,

  type = "friend",
  isMyProfile = false,
  horizon,
  onClick,
  profileImageUrl,

  isMaster,
  relationType,
}: ItemProps) {
  return (
    <>
      <button
        type="button"
        className={`${styles.profileCard} ${horizon ? styles.horizon : ""}`}
        onClick={onClick}
      >
        <SingleAvatar
          imageUrl={profileImageUrl}
          size={type === "friend" ? 60 : 40}
          isMyProfile={isMyProfile}
          isUpdatedProfile={
            profile.lastModifiedDate
              ? isUpdatedProfile(profile.lastModifiedDate)
              : false
          }
          relationType={relationType}
        />
        <div>
          <p className={`${styles.nickName} ${styles[type]}`}>
            {isMaster && (
              <span className={styles.master}>
                <Icons name="crown" />
                <span className="sr-only">방장</span>
              </span>
            )}{" "}
            {editedName || syncName || profile.profileName}
          </p>

          {!horizon && type === "friend" && (
            <p className={styles.message}>{profile.profileMessage}</p>
          )}
        </div>
      </button>
    </>
  );
}
