import { FileValidationResult } from "../types";
import { showError } from "@/shared/ui/overlays/toast";

/**
 * 파일 검증 결과를 처리하고 사용자 피드백 방식 결정
 * - 단일 파일 에러: Toast로 즉시 표시
 * - 다중 파일 에러: Modal로 상세 표시
 * - 부분 성공: Modal로 선택적 진행 옵션 제공
 */
export const handleValidationResult = (
  result: FileValidationResult,
  setValidationResult: (result: FileValidationResult) => void,
  setShowValidationModal: (show: boolean) => void
): boolean => {
  setValidationResult(result);

  // 유효하지 않은 파일이 없을 경우 -> 성공!
  if (result.invalidFiles.length === 0) {
    // setErrorMessage('');
    return true;
  }

  const totalFiles = result.validFiles.length + result.invalidFiles.length;

  if (totalFiles === 1 && result.invalidFiles.length === 1) {
    const errorFile = result.invalidFiles[0];

    showError(`${errorFile.message}`);

    return false;
  }

  setShowValidationModal(true);
  return false;
};

/**
 * 파일 처리 에러 시 Toast 표시
 */
// showFileUploadError는 shared/lib/notifications로 이동
