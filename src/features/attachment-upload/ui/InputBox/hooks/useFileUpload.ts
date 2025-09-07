import { useCallback, useState } from 'react';
import { FileValidationResult } from '../types';

export default function useFileUpload() {
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [validationResult, setValidationResult] =
    useState<FileValidationResult | null>(null);
  const [showValidationModal, setShowValidationModal] = useState(false);
  // const [errorMessage, setErrorMessage] = useState<string>('');

  const closeValidationModal = useCallback(() => {
    setShowValidationModal(false);
    setValidationResult(null);
  }, []);

  // 파일 삭제
  const handleRemoveFile = useCallback(
    (fileIndex: number, isValid: boolean) => {
      if (!validationResult) return;

      const newValidationResult = { ...validationResult };
      if (isValid) {
        // 유효한 파일 배열에서 제거
        newValidationResult.validFiles = validationResult.validFiles.filter(
          (_, index) => index !== fileIndex,
        );
      } else {
        // 무효한 파일 배열에서 제거
        newValidationResult.invalidFiles = validationResult.invalidFiles.filter(
          (_, index) => index !== fileIndex,
        );
      }

      // 총 용량 재계산
      newValidationResult.totalSize = newValidationResult.validFiles.reduce(
        (total, file) => total + file.size,
        0,
      );
      newValidationResult.totalSize =
        newValidationResult.totalSize +
        newValidationResult.invalidFiles.reduce(
          (total, error) => total + error.file.size,
          0,
        );

      setValidationResult(newValidationResult);

      // 모든 파일이 제거 -> 모달 닫기
      if (
        newValidationResult.validFiles.length === 0 &&
        newValidationResult.invalidFiles.length === 0
      ) {
        closeValidationModal();
      }
    },
    [validationResult, closeValidationModal],
  );

  /**
   * 업로드 완료 후 모든 상태 초기화
   */
  const resetUploadState = useCallback(() => {
    setIsFileUploading(false);
    setValidationResult(null);
    setShowValidationModal(false);
  }, []);

  return {
    // 상태
    isFileUploading,
    setIsFileUploading,
    validationResult,
    setValidationResult,
    showValidationModal,
    setShowValidationModal,

    // 액션
    closeValidationModal,
    handleRemoveFile,
    resetUploadState,
  };
}
