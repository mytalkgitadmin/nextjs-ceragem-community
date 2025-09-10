// 프로필 이미지 업로드 - 파일 선택 OR 이모티콘 선택
import { useRef, useState } from "react";
import { useFileUploadAcceptList } from "@/features/chat/api";
import { IconButton } from "@/shared/ui/IconButton";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/shared/ui/dropdown-menu";

const defaultImg = "/assets/profile/bemilyDefaultProfile.webp";
import FamilyFriendsModal from "../FamilyFriendsModal/FamilyFriendsModal";
import { ProfileImageUploadProps } from "../../model/fileTypes";
import styles from "./ProfileImageUpload.module.scss";
import { getEmoticonImageUrl } from "@/features/viewer/utils/mediaUtils";
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
    // 1. 새로 선택한 파일
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    // 이모티콘이 선택된 경우
    if (
      profileImage.profileKind === "emoticon" &&
      profileImage.emoticonId > 0
    ) {
      return getEmoticonImageUrl(profileImage.emoticonId);
    }

    //기존 프로필
    if (currentImage) {
      return currentImage;
    }

    //  기존 이미지 표시
    return defaultImg;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file); // 상위 컴포넌트에서 검증 및 상태 관리
    }
    event.target.value = ""; // input 초기화
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
