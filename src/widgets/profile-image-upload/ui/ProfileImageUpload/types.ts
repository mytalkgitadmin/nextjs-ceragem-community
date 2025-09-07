import { ProfileImg } from "@/entities/profile/model";

export interface ProfileImageUploadProps {
  currentImage?: string;
  onImageChange: (file: File | null) => void;
  disabled?: boolean;
  maxFileSize?: number;
  profileImage: ProfileImg;
  onEmoticonSelect: (emoticonId: number) => void;
  selectedFile?: File | null;
}
