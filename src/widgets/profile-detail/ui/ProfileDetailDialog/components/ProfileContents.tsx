import { memo } from "react";
// import { any } from "../../types/viewer.types";

import ProfileBody from "./ProfileBody";

// import ProfileActions from "@/widgets/Profile/ui/ProfileViewer/ProfileActions/ProfileActions";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/overlays";

import styles from "../index.module.scss";
import { ProfileUserData } from "@/entities/profile";

interface ProfileComponentProps {
  userData: ProfileUserData; // 실제 타입으로 교체 필요
  isMyProfile: boolean;
  handlePhoneCall: (phoneNumber: string) => void;
  profileImageUrl: string;
  handleImageClick: (index: number) => void;
  processedHistories: any[]; // 실제 타입으로 교체 필요
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
        {/* 접근성용: 숨겨진 헤더 */}
        <DialogHeader className="sr-only">
          <DialogTitle>{profileName}의 프로필</DialogTitle>
          <DialogDescription>
            사용자 프로필 정보를 확인하고 액션을 수행할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        {/* 내용 */}
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

        {/* 버튼 */}
        {/* <DialogFooter className={styles.footer}>
          <ProfileActions
            userData={userData}
            friendId={accountId}
            isMyProfile={isMyProfile}
            phoneNumber={phoneNumber || ""}
            relationType={relationType}
            onPhoneCall={handlePhoneCall}
          />
        </DialogFooter> */}
      </>
    );
  }
);

export default ProfileContents;
