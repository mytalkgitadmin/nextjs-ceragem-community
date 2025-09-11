// Profile UI 관련 타입들

export interface ProfileImageFile {
  file: File;
  preview: string; // 미리보기용 URL
  id: string; // 고유 식별자
}

export interface ProfileImageUploadProps {
  currentImage: ProfileImageFile | string | null;
  onImageChange: (file: File | null) => void;
  onEmoticonSelect?: (emoticonId: number) => void;
  profileImage?: {
    emoticonId: number;
    profileId: number;
    profileKind: string;
    profileOrigin: string;
    profileOriginal: string;
    profileSmallThumbnail: string;
    profileThumbnail: string;
  }; // ProfileImage 타입
  selectedFile?: File | null;
  disabled?: boolean;
  isMyProfile?: boolean;
}
