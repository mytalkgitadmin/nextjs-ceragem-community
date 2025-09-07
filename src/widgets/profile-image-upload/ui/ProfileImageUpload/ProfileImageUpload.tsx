import { useRef, useState } from "react";
import { useFileUploadAcceptList } from "@/features/attachment-upload/model/useFileUploadAcceptList";
import { IconButton } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/shared/ui/menu";
import defaultImg from "@/assets/profile/bemilyDefaultProfile.webp";
import { getEmoticonImageUrl } from "@/entities/profile";
import styles from "./ProfileImageUpload.module.scss";

import FamilyFriendsModal from "./components/FamilyFriendsModal";
import { ProfileImageUploadProps } from "./types";

export default function ProfileImageUpload({
  currentImage,
  onImageChange,
  disabled,
  profileImage,
  selectedFile,
  onEmoticonSelect,
}: ProfileImageUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: acceptFileExtensions } =
    useFileUploadAcceptList("PROFILE_ORIGIN");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getDisplayImage = () => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }
    if (
      profileImage.profileKind === "emoticon" &&
      profileImage.emoticonId > 0
    ) {
      return getEmoticonImageUrl(profileImage.emoticonId);
    }
    if (currentImage) {
      return currentImage;
    }
    return defaultImg;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
    event.target.value = "";
  };

  const handlePhotoMenuClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleFamilyFriendsMenuClick = () => {
    setIsOpen(true);
  };

  const displayImage = getDisplayImage();
  const currentEmoticonId = profileImage.emoticonId || 0;

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptFileExtensions}
        onChange={handleFileSelect}
        disabled={disabled}
        hidden
      />

      <div className={styles.wrap}>
        <img src={displayImage} alt="" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton
              className={styles.imageBtn}
              name="photo"
              text="이미지 변경"
              disabled={disabled}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={handlePhotoMenuClick}
              disabled={disabled}
            >
              사진
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleFamilyFriendsMenuClick}>
              패밀리 프렌즈
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <FamilyFriendsModal
          open={isOpen}
          onOpenChange={setIsOpen}
          id={currentEmoticonId}
          onEmoticonSelect={onEmoticonSelect}
        />
      </div>
    </div>
  );
}
