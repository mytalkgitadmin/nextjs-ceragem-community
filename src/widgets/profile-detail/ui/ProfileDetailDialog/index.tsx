import { memo, useMemo } from "react";

// import useProfileViewer from "@/widgets/profile-detail/hooks/useProfileViewer";
import { Dialog, DialogContent } from "@/shared/ui/overlays";
import { useProfileDetail } from "@/features/profile-detail";
import { useProfileStore } from "@/entities/profile";
// import { Viewer } from "@/features/viewer";

import ProfileLoading from "./components/ProfileLoading";
import ProfileError from "./components/ProfileError";
import ProfileContents from "./components/ProfileContents";

import styles from "./index.module.scss";

export interface ProfileDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountId: number;
  profileImageUrl: string;
}

const ProfileDetailDialog = memo<ProfileDetailDialogProps>(
  ({ open, onOpenChange, accountId, profileImageUrl }) => {
    const { userProfile } = useProfileStore();
    const { data: userData, isLoading, error } = useProfileDetail(accountId);

    const isMyProfile = useMemo(
      () => userProfile?.accountId === accountId,
      [userProfile?.accountId, accountId]
    );

    // const {
    //   userData,
    //   isLoading,
    //   error,
    //   isMyProfile,
    //   processedHistories,

    //   viewerOpen,
    //   imgIndex,

    //   handlePhoneCall,
    //   handleImageClick,
    //   handleViewerClose,
    // } = useProfileViewer({
    //   accountId,
    // });

    // if (!userData) return null;

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
                // handlePhoneCall={handlePhoneCall}
                profileImageUrl={profileImageUrl}
                // handleImageClick={handleImageClick}
                // processedHistories={processedHistories}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* <Viewer
          open={viewerOpen}
          onOpenChange={handleViewerClose}
          initialIndex={imgIndex}
          data={processedHistories}
        /> */}
      </>
    );
  }
);
ProfileDetailDialog.displayName = "ProfileDetailDialog";

export default ProfileDetailDialog;
