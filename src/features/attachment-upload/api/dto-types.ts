// 첨부 업로드 API DTO 타입

// 파일 업로드 파라미터 DTO
export interface FileUploadParamsDTO {
  file: File;
  channelUrl?: string;
  messageId?: string;
  uploadType?: string;
}
