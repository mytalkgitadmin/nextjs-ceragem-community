// 첨부파일 API 계약 타입
import type { FileUploadAcceptListDTO } from "./dto-types";

// 파일 업로드 허용 목록 응답
export interface FileUploadAcceptListResponse {
  result: boolean;
  resultData: FileUploadAcceptListDTO;
}
