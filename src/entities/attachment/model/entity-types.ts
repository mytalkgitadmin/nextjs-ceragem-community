// 첨부파일 도메인 엔티티 타입
import type { ProfileEntity } from "@/entities/profile/model/entity-types";

// 프로필 이미지 엔티티
export interface ProfileImgEntity {
  profileKind: string;
  profileOriginal: string;
  profileThumbnail: string;
  profileThumbnailSmall: string;
  profileGroup: string | null;
}

// 히스토리 엔티티
export interface HistoryEntity extends ProfileImgEntity {
  historyId: null;
}

// 이미지 메시지 데이터 엔티티
export interface ImgMsgInDataEntity {
  fileType: string;
  originalFileName: string;
  originalFileSize: number;
  originalUrl: string;
  thumbUrl: string;
  shared: boolean;
}

// 미디어 아이템 타입 (유니온)
export type MediaItem = ImgMsgInDataEntity | HistoryEntity | ProfileEntity;

// 타입 가드 함수들
export const isImgMsgData = (data: MediaItem): data is ImgMsgInDataEntity => {
  return "originalUrl" in data && "originalFileName" in data;
};

export const isProfileImgData = (
  data: MediaItem
): data is HistoryEntity | ProfileEntity => {
  return "profileKind" in data && "profileOriginal" in data;
};

// 미디어 뷰어 프로퍼티
export interface MediaViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: MediaItem[];
  initialIndex?: number;
}

// 뷰어 컨텐츠 프로퍼티
export interface ViewerContentProps {
  data: MediaItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  api: any | undefined;
  setApi: (api: any | undefined) => void;
}

// 미디어 타입
export type MediaType = "image" | "video";

// 썸네일 정보
export interface ThumbnailInfo {
  width?: number;
  height?: number;
  thumbnailUrl?: string;
}

// 파일 정보
export interface FileInfo extends ThumbnailInfo {
  fileSize?: number;
  fileName?: string;
}

// 업로드 결과
export interface UploadResult {
  success: boolean;
  fileUrl?: string;
  error?: string;
}
