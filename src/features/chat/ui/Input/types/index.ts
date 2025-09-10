export interface FileValidationError {
  file: File;
  errorType: 'SIZE' | 'TYPE' | 'COUNT';
  message: string;
}

export interface FileValidationResult {
  validFiles: File[];
  invalidFiles: FileValidationError[];
  totalSize: number;

  convertibleFiles: ConvertibleFile[];
}

export interface ConvertibleFile {
  file: File;
  originalType: string;
  convertToType: string;
  reason: string;
}

export interface FileValidationConfig {
  maxFileSize: number; // bytes
  maxFileCount: number;
  acceptedExtensions: string[];
}

/**
 * 파일 처리 상태
 */
type FileProcessStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';

/**
 * 파일 변환 타입
 */
export type ConversionType =
  | 'NONE'
  | 'IMAGE_RESIZE'
  | 'VIDEO_COMPRESS'
  | 'IMAGE_CONVERT'
  | 'DOCUMENT_CONVERT';

/**
 * 파일 메타데이터 인터페이스
 */
interface FileMetadata {
  width?: number;
  height?: number;
  duration?: number;
  ratio?: number;
  fileSize?: number;
  mimeType?: string;
}

/**
 * 처리된 파일 정보
 */
export interface ProcessedFile {
  /** 원본 파일 */
  originalFile: File;
  /** 처리된 파일 (변환되었거나 원본 그대로) */
  processedFile: File;
  /** 처리 상태 */
  status: FileProcessStatus;
  /** 변환 타입 */
  conversionType: ConversionType;
  /** 파일 메타데이터 */
  metadata?: FileMetadata;
  /** 에러 메시지 (실패 시) */
  error?: string;
}

/**
 * 파일 처리 결과
 */
export interface FileProcessResult {
  /** 처리된 파일 목록 */
  processedFiles: ProcessedFile[];
  /** 성공한 파일 수 */
  successCount: number;
  /** 실패한 파일 수 */
  failureCount: number;
  /** 처리된 파일들의 총 크기 */
  totalSize: number;
}

export interface UploadResult {
  result: boolean;
  resultData: {
    fileId: string;
    subCategory: string | 'PROFILE_ORIGIN';
    description: string | null;
    info: FileInfo;
    thumbnailSubCategory1: string | 'PROFILE_THUMBNAIL';
    thumbnailSubCategory2: 'PROFILE_SMALL_THUMBNAIL';
    thumbnailInfo1?: ThumbnailInfo;
    thumbnailInfo2: ThumbnailInfo;
  };
}
export interface ThumbnailInfo {
  subCategory: 'PROFILE_THUMBNAIL' | 'PROFILE_SMALL_THUMBNAIL';
  fileKind: string | 'IMAGE';
  contentId: string;
  accountId: number;
  fileId: string;
  fileSeq: number;
  fileName: string;
  fileSize: number;
  contentType: string;
  existFile: true;
  directUrl: string;
  addDate: number;
  metadata: string | null;
}
export interface FileInfo extends ThumbnailInfo {
  mimeType: string;
  addDate: number;
}

export interface MessageData {
  resource: MessageInData[];
  type: string;
}

export interface MessageInData {
  fileType: string;
  thumbUrl: string;
  originalUrl: string;
  originalFileName: string;
  originalFileSize: number;
  shared: boolean;
}

export interface GroupUploadResult {
  groupId: string;
  uploadResults: UploadResult[];
}
