import { useState } from 'react';
import {
  FileUploadParams,
  uploadFile,
} from '@/features/chat/api/fileUploadApi';
import { UploadResult } from '@/features/chat/ui/Input/types';

export interface ProfileUploadOptions {
  profileId: number;
  onSuccess?: (result: UploadResult) => void;
  onError?: (error: string) => void;
}
export interface ProfileFileUploadParams {
  file: File;
  profileId: number;
  subCategory: 'PROFILE_ORIGIN';
  autoEnable?: boolean;
  contentId?: string;
  openMetadata?: string;
  onSuccess?: (result: UploadResult) => void;
  onError?: (error: string) => void;
}
export default function useProfileFileUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadProfileFile = async (params: ProfileFileUploadParams) => {
    setIsUploading(true);

    try {
      const uploadParams: FileUploadParams = {
        file: params.file,
        contentId: String(params.profileId),
        subCategory: 'PROFILE_ORIGIN',
        autoEnable: true,
      };

      const result = (await uploadFile(uploadParams)) as UploadResult;

      params.onSuccess?.(result);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '파일 업로드 실패';
      console.error('❌ 프로필 파일 업로드 실패:', errorMessage);
      params.onError?.(errorMessage);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadProfileFile, isUploading };
}
