import { memo } from "react";

import { getThumbnailUrl } from "@/entities/attachment/lib/media";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/shared/ui/overlays";

import useProfileForm from "@/features/profile-update/model/useProfileForm";
import { ProfileImageUpload } from "@/widgets/profile-image-upload";
import FormFields from "./components/FormFields";
import { Button } from "@/shared/ui/button";
import styles from "./EditProfileModal.module.scss";
import useEditProfile from "@/features/profile-update/model/useEditProfile";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const EditProfileModal = memo<EditProfileModalProps>(
  ({ open, onOpenChange }) => {
    const {
      profileImage,
      selectedFile,
      userProfile,
      isLoading,
      handleImageFileSelect,
      handleEmoticonSelect,
      updateProfile,
      resetState,
    } = useEditProfile();

    const {
      formData,
      calendarOpen,
      setCalendarOpen,
      handleInputChange,
      handleDateSelect,
    } = useProfileForm({
      initialData: userProfile,
    });

    const handleSubmit = async () => {
      try {
        const textData = {
          profileName: formData.profileName.trim(),
          profileMessage: formData.profileMessage.trim(),
          interests: formData.interests.trim(),
          birthday: formData.birthday
            ? formData.birthday.getTime().toString()
            : undefined,
          introduction: formData.introduction.trim(),
          solar: formData.solar,
        };
        await updateProfile(textData);
        onOpenChange(false);
      } catch (error) {
        console.error("프로필 업데이트 실패:", error);
        alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
      }
    };

    const handleModalOpenChange = (isOpen: boolean) => {
      if (!isOpen) {
        resetState();
      }
      onOpenChange(isOpen);
    };

    return (
      <Dialog open={open} onOpenChange={handleModalOpenChange}>
        <DialogContent className={styles.content}>
          <DialogHeader>
            <DialogTitle>프로필 편집</DialogTitle>
            <DialogDescription>내용을 작성해 주세요</DialogDescription>
          </DialogHeader>

          {userProfile && (
            <>
              <ProfileImageUpload
                currentImage={getThumbnailUrl(userProfile.profile)}
                onImageChange={handleImageFileSelect}
                onEmoticonSelect={handleEmoticonSelect}
                profileImage={profileImage}
                selectedFile={selectedFile}
                disabled={isLoading}
              />

              <FormFields
                formData={formData}
                handleInputChange={handleInputChange}
                calendarOpen={calendarOpen}
                setCalendarOpen={setCalendarOpen}
                handleDateSelect={handleDateSelect}
              />
            </>
          )}

          <DialogFooter className={styles.dialogFooter}>
            <DialogClose asChild>
              <Button variant="outline" size="lg" disabled={isLoading}>
                닫기
              </Button>
            </DialogClose>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "저장 중..." : "저장"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

EditProfileModal.displayName = "EditProfileModal";
export default EditProfileModal;
