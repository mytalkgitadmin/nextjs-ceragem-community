// 첨부파일 API DTO 타입

// 파일 업로드 허용 목록 DTO
export interface FileUploadAcceptListDTO {
  accept: string;
  enabledImage: string[];
  enabledVideo: string[];
}
