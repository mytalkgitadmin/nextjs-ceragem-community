import { memo } from "react";
import { ProcessedHistory } from "@/features/profile-update/model/viewer.types";

import ProfileBody from "./components/ProfileBody";
import ProfileActions from "./components/ProfileActions";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import styles from "./index.module.scss";
import { ProfileUserData } from "@/entities/profile/model";

interface ProfileComponentProps {
  userData: ProfileUserData;
  isMyProfile: boolean;
  handlePhoneCall: (phoneNumber: string) => void;
  profileImageUrl: string;
  handleImageClick: (index: number) => void;
  processedHistories: ProcessedHistory[];
}

const ProfileContents = memo(
  ({
    userData,
    isMyProfile,
    handlePhoneCall,
    profileImageUrl,
    handleImageClick,
    processedHistories,
  }: ProfileComponentProps) => {
    const {
      accountProfile: {
        profile: { profileName, profileMessage },
        accountId,
        introduction,
        interests,
        birthday,
        phoneNumber,
        relationType,
      },
    } = userData;

    return (
      <>
        <DialogHeader className="sr-only">
          <DialogTitle>{profileName}의 프로필</DialogTitle>
          <DialogDescription>
            사용자 프로필 정보를 확인하고 액션을 수행할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <ProfileBody
          profileImageUrl={profileImageUrl}
          profileMessage={profileMessage || ""}
          profileName={profileName}
          introduction={introduction || ""}
          interests={interests || ""}
          birthday={birthday}
          isMyProfile={isMyProfile}
          onImageClick={handleImageClick}
          histories={processedHistories}
        />

        <DialogFooter className={styles.footer}>
          <ProfileActions
            userData={userData}
            friendId={accountId}
            isMyProfile={isMyProfile}
            phoneNumber={phoneNumber || ""}
            relationType={relationType}
            onPhoneCall={handlePhoneCall}
          />
        </DialogFooter>
      </>
    );
  }
);

export default ProfileContents;
