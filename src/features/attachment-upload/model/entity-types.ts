// 첨부 업로드 feature 엔티티 타입

// 파일 검증 에러 엔티티
export interface FileValidationError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// 파일 검증 결과 엔티티
export interface FileValidationResult {
  isValid: boolean;
  errors?: FileValidationError[];
  warnings?: string[];
  processedFile?: ProcessedFile;
}

// 변환 가능한 파일 엔티티
export interface ConvertibleFile {
  file: File;
  needsConversion: boolean;
  targetFormat?: string;
  conversionReason?: string;
}

// 파일 검증 설정 엔티티
export interface FileValidationConfig {
  maxFileSize?: number;
  maxImageDimension?: number;
  allowedTypes?: string[];
  convertHeic?: boolean;
  compressImages?: boolean;
}

// 파일 처리 상태
export type FileProcessStatus = "PENDING" | "PROCESSING" | "SUCCESS" | "FAILED";

// 변환 타입
export type ConversionType =
  | "HEIC_TO_JPEG"
  | "IMAGE_RESIZE"
  | "IMAGE_COMPRESS"
  | "VIDEO_COMPRESS"
  | "DOCUMENT_CONVERT"
  | "NONE";

// 파일 메타데이터
interface FileMetadata {
  originalSize: number;
  processedSize?: number;
  mimeType: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

// 처리된 파일 엔티티
export interface ProcessedFile {
  id: string;
  originalFile: File;
  processedFile: File;
  status: FileProcessStatus;
  metadata: FileMetadata;
  conversionType: ConversionType;
  processingTime?: number;
  uploadUrl?: string;
  thumbnailUrl?: string;
  error?: FileValidationError;
}

// 파일 처리 결과 엔티티
export interface FileProcessResult {
  files: ProcessedFile[];
  totalSize: number;
  successCount: number;
  failureCount: number;
  errors: FileValidationError[];
  processingTime: number;
}

// 업로드 결과 엔티티
export interface UploadResult {
  id?: string;
  url?: string;
  thumbnailUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  uploadedAt?: number;
  metadata?: Record<string, unknown>;
  error?: string;
  success: boolean;
}

// 썸네일 정보 엔티티
export interface ThumbnailInfo {
  url?: string;
  width?: number;
  height?: number;
  size?: number;
  format?: string;
  aspectRatio?: number;
  dominantColor?: string;
  metadata?: Record<string, unknown>;
}

// 파일 정보 엔티티
export interface FileInfo extends ThumbnailInfo {
  fileSize?: number;
  fileName?: string;
}

// 메시지 데이터 엔티티
export interface MessageData {
  type: string;
  content: unknown;
}

// 메시지 입력 데이터 엔티티
export interface MessageInData {
  fileType: string;
  originalFileName: string;
  originalFileSize: number;
  originalUrl: string;
  thumbUrl: string;
  shared: boolean;
}

// 그룹 업로드 결과 엔티티
export interface GroupUploadResult {
  groupId: string;
  files: UploadResult[];
  totalCount: number;
  successCount: number;
}
