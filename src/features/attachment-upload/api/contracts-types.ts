// 첨부 업로드 API 계약 타입
import type { FileUploadParamsDTO } from "./dto-types";

// 파일 업로드 요청
export type FileUploadRequest = FileUploadParamsDTO;

// 파일 업로드 응답
export interface FileUploadResponse {
  success: boolean;
  fileUrl?: string;
  thumbnailUrl?: string;
  error?: string;
}
