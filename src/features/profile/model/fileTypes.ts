// src/features/profile/ui/ProfileImageUpload/types.ts

import { ProfileImg } from '@/features/chat/model';

export interface ProfileImageFile {
  file: File;
  preview: string; // 미리보기용 URL
  id: string; // 고유 식별자
}

export interface ProfileImageUploadProps {
  currentImage?: string; // 현재 프로필 이미지 URL
  onImageChange: (file: File | null) => void; // 이미지 변경 콜백
  disabled?: boolean;
  maxFileSize?: number; // 기본 10MB
  profileImage: ProfileImg;
  onEmoticonSelect: (emoticonId: number) => void;
  selectedFile?: File | null;
}

export interface FileValidationError {
  type: 'SIZE_EXCEEDED' | 'INVALID_TYPE' | 'UPLOAD_ERROR';
  message: string;
}
