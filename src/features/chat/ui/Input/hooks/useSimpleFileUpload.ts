import { useState } from 'react';
import {
  FileUploadParams,
  uploadFile,
} from '@/features/chat/api/fileUploadApi';
import { UploadResult } from '../types';

export interface SimpleUploadOptions {
  channelUrl: string;
  onSuccess?: (result: UploadResult) => void;
  onError?: (error: string) => void;
}

export default function useSimpleFileUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadSingleFile = async (file: File, options: SimpleUploadOptions) => {
    setIsUploading(true);

    try {
      const uploadParams: FileUploadParams = {
        file,
        contentId: options.channelUrl,
        subCategory: 'CHAT_FILE',
        autoEnable: false,
      };
      console.log('단일 파일 업로드 시작:', file.name);
      const result = (await uploadFile(uploadParams)) as UploadResult;
      console.log('업로드 성공:', result);
      options.onSuccess?.(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '파일 업로드 실패';
      console.error('업로드 실패:', errorMessage);
      options.onError?.(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadSingleFile, isUploading };
}
