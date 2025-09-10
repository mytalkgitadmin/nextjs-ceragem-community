import { useCallback, useRef, useState } from 'react';
import { FileValidationError, ProfileImageFile } from '../model/fileTypes';
import { showFileUploadError } from '@/features/chat/ui/Input/utils';

export default function useProfileImageUpload({
  acceptedTypes,
  maxFileSize,
  onImageChange,
}: {
  acceptedTypes: string[];
  maxFileSize: number;
  onImageChange: (file: File | null) => void;
}) {
  const [selectedImage, setSelectedImage] = useState<ProfileImageFile | null>(
    null,
  );
  const [isUploading, setIsUploading] = useState(false);
  const [validationError, setValidationError] =
    useState<FileValidationError | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): FileValidationError | null => {
    if (file.size > maxFileSize) {
      return {
        type: 'SIZE_EXCEEDED',
        message: `파일 크기 허용량 ${Math.round(maxFileSize / 1024 / 1024)}MB 초과하였습니다`,
      };
    }

    if (acceptedTypes.length > 0) {
      const fileExtension = file.name.split('.').pop()?.toLocaleLowerCase();
      const isValidType = acceptedTypes.some((type) =>
        type.toLocaleLowerCase().includes(fileExtension || ''),
      );

      if (!isValidType) {
        return {
          type: 'INVALID_TYPE',
          message: '지원하지 않는 파일 형식입니다.',
        };
      }
    }

    return null;
  };

  // 미리보기 URL 생성
  const createPreviewUrl = (file: File): string => {
    return URL.createObjectURL(file);
  };

  // 미리보기 URL 정리
  const cleanupPreviewUrl = useCallback((url: string) => {
    URL.revokeObjectURL(url);
  }, []);

  // 파일 선택 처리
  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) return;

      setValidationError(null);

      // 파일 검증
      const error = validateFile(file);

      if (error) {
        setValidationError(error);
        showFileUploadError(error.message);
        return;
      }

      // 이전 미리보기 URL 정리
      if (selectedImage) {
        cleanupPreviewUrl(selectedImage.preview);
      }

      // 새 이미지 설정
      const newImage: ProfileImageFile = {
        file,
        preview: createPreviewUrl(file),
        id: Date.now().toString(),
      };

      setSelectedImage(newImage);
      onImageChange?.(file);

      event.target.value = '';
    },
    [
      selectedImage,
      acceptedTypes,
      maxFileSize,
      onImageChange,
      cleanupPreviewUrl,
    ],
  );

  // 이미지 제거
  const handleRemoveImage = useCallback(() => {
    if (selectedImage) {
      cleanupPreviewUrl(selectedImage.preview);
    }

    setSelectedImage(null);
    setValidationError(null);
    onImageChange?.(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [selectedImage, onImageChange, cleanupPreviewUrl]);

  // 파일 선택 트리거
  const triggerFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // 컴포넌트 언마운트 시 메모리 정리
  const cleanup = useCallback(() => {
    if (selectedImage) {
      cleanupPreviewUrl(selectedImage.preview);
    }
  }, [selectedImage, cleanupPreviewUrl]);
  return {
    selectedImage,
    isUploading,
    setIsUploading,
    validationError,
    fileInputRef,
    handleFileSelect,
    handleRemoveImage,
    triggerFileSelect,

    cleanup,
  };
}
