import { memo } from "react";

import useProfileViewer from "./hooks/useProfileViewer";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { Viewer } from "@/entities/attachment/ui/Viewer";

import { ProfileViewerProps } from "@/features/profile-update/model/viewer.types";

import ProfileLoading from "./ProfileLoading";
import ProfileError from "./ProfileError";
import ProfileContents from "./ProfileContents";

import styles from "./index.module.scss";

const ProfileViewer = memo<ProfileViewerProps>(
  ({ open, onOpenChange, accountId, profileImageUrl }) => {
    const {
      userData,
      isLoading,
      error,
      isMyProfile,
      processedHistories,

      viewerOpen,
      imgIndex,

      handlePhoneCall,
      handleImageClick,
      handleViewerClose,
    } = useProfileViewer({ accountId });

    if (!userData) return null;

    return (
      <>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className={styles.content}>
            {isLoading ? (
              <ProfileLoading />
            ) : error ? (
              <ProfileError />
            ) : (
              <ProfileContents
                userData={userData}
                isMyProfile={isMyProfile}
                handlePhoneCall={handlePhoneCall}
                profileImageUrl={profileImageUrl}
                handleImageClick={handleImageClick}
                processedHistories={processedHistories}
              />
            )}
          </DialogContent>
        </Dialog>

        <Viewer
          open={viewerOpen}
          onOpenChange={handleViewerClose}
          initialIndex={imgIndex}
          data={processedHistories}
        />
      </>
    );
  }
);

ProfileViewer.displayName = "ProfileViewer";

export default ProfileViewer;
