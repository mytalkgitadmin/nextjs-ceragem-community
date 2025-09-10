// 파일 검증 관련 공통 타입들

export interface FileValidationError {
  type: "SIZE_EXCEEDED" | "INVALID_TYPE" | "UPLOAD_ERROR";
  message: string;
}
