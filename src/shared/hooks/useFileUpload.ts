// 공통 파일 업로드 Hook

import { useState, useCallback } from "react";

export interface FileValidationOptions {
  maxFileSize?: number; // bytes
  acceptedTypes?: string[];
  maxFileCount?: number;
}

export interface FileUploadError {
  type: "SIZE_EXCEEDED" | "INVALID_TYPE" | "COUNT_EXCEEDED" | "UPLOAD_ERROR";
  message: string;
  file?: File;
}

export interface UseFileUploadOptions extends FileValidationOptions {
  onUpload?: (files: File[]) => Promise<void>;
  onError?: (error: FileUploadError) => void;
}

/**
 * 파일 업로드 상태와 검증을 관리하는 공통 Hook
 * @param options 검증 옵션, 업로드 콜백 설정
 * @returns 파일 상태와 업로드 핸들러 함수들
 */
export function useFileUpload(options: UseFileUploadOptions = {}) {
  const {
    maxFileSize = 10 * 1024 * 1024, // 10MB 기본값
    acceptedTypes = [],
    maxFileCount = 1,
    onUpload,
    onError,
  } = options;

  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<FileUploadError[]>([]);

  // 파일 검증
  const validateFile = useCallback(
    (file: File): FileUploadError | null => {
      // 파일 크기 검증
      if (file.size > maxFileSize) {
        return {
          type: "SIZE_EXCEEDED",
          message: `파일 크기가 ${Math.round(
            maxFileSize / 1024 / 1024
          )}MB를 초과합니다.`,
          file,
        };
      }

      // 파일 타입 검증
      if (acceptedTypes.length > 0 && !acceptedTypes.includes(file.type)) {
        return {
          type: "INVALID_TYPE",
          message: `지원하지 않는 파일 형식입니다. (${acceptedTypes.join(
            ", "
          )})`,
          file,
        };
      }

      return null;
    },
    [maxFileSize, acceptedTypes]
  );

  // 파일 추가
  const addFiles = useCallback(
    (newFiles: File[] | FileList) => {
      const fileArray = Array.from(newFiles);
      const validFiles: File[] = [];
      const validationErrors: FileUploadError[] = [];

      // 파일 개수 검증
      if (files.length + fileArray.length > maxFileCount) {
        const error: FileUploadError = {
          type: "COUNT_EXCEEDED",
          message: `최대 ${maxFileCount}개까지 업로드 가능합니다.`,
        };
        validationErrors.push(error);
        if (onError) onError(error);
        return;
      }

      // 각 파일 검증
      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          validationErrors.push(error);
          if (onError) onError(error);
        } else {
          validFiles.push(file);
        }
      });

      if (validFiles.length > 0) {
        setFiles((prev) => [...prev, ...validFiles]);
      }

      if (validationErrors.length > 0) {
        setErrors((prev) => [...prev, ...validationErrors]);
      }
    },
    [files.length, maxFileCount, validateFile, onError]
  );

  // 파일 제거
  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // 업로드 실행
  const upload = useCallback(async () => {
    if (files.length === 0 || !onUpload) return;

    setIsUploading(true);
    try {
      await onUpload(files);
      setFiles([]);
      setErrors([]);
    } catch (error) {
      const uploadError: FileUploadError = {
        type: "UPLOAD_ERROR",
        message:
          error instanceof Error ? error.message : "업로드에 실패했습니다.",
      };
      setErrors((prev) => [...prev, uploadError]);
      if (onError) onError(uploadError);
    } finally {
      setIsUploading(false);
    }
  }, [files, onUpload, onError]);

  // 초기화
  const reset = useCallback(() => {
    setFiles([]);
    setErrors([]);
    setIsUploading(false);
  }, []);

  return {
    files,
    isUploading,
    errors,
    hasFiles: files.length > 0,
    addFiles,
    removeFile,
    upload,
    reset,
  };
}
