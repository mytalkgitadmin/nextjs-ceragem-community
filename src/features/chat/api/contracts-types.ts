// Chat API 계약 타입들 (도메인 모델)

import type { ApiResponse } from "@/shared/api";

// 채널 생성 계약
export interface CreateChannelRequest {
  accountIds: number[];
  channelName?: string;
  channelType: "GROUP" | "MY" | "FAMILY" | "DIRECT" | "ADMIN";
}

export interface CreateChannelData {
  channelId: number;
  channelUrl: string;
}

export type CreateChannelResponse = ApiResponse<CreateChannelData>;

// 파일 검색 계약 (실제 API 구조와 동일하게 유지)
export interface FileSearchRequest {
  contentTypeList?: string[];
  extensionList?: string[];
  fileCategoryList?: string[];
  fileIdList?: string[];
  fileKindList?: string[];
  fileSubCategoryList?: string[];
  idList?: string[];
  ownerAccountIdList?: number[];
  ownerContentIdList?: string[];
  isDeleted?: boolean;
  isEnabledFile?: boolean;
  page: {
    offset: number;
    pageNo: number;
    pageSize: number;
    sort: [
      {
        asc: boolean;
        property: string;
      }
    ];
  };
  savedFilePathList?: string[];
  savedUrlList?: string[];
  searchType?: string[];
  searchWord: string;
}

export interface Info {
  subCategory: string;
  fileKind: string;
  contentId: string;
  accountId: number;
  fileId: string;
  fileSeq: number;
  fileName: string;
  fileSize: number;
  contentType: string;
  existFile: boolean;
  directUrl: string;
  addDate: number;
  metadata: null;
}

export interface File {
  fileId: string;
  subCategory: string;
  description: null;
  accountId: number;
  info: Info;
  thumbnailSubCategory1: string;
  thumbnailInfo1: Info | null;
  thumbnailSubCategory2: null;
  thumbnailInfo2: null;
}

export interface FileSearchData {
  content: File[];
  totalElements: number;
  totalPages: number;
}

export interface FileSearchResponse {
  resultData: FileSearchData;
}

// 파일 업로드 계약
export interface FileUploadRequest {
  file: File;
  contentId?: string;
  subCategory?: string;
  autoEnable?: boolean;
  openMetadata?: string;
}

export interface FileUploadData {
  fileId: number;
  fileName: string;
  fileUrl: string;
  fileThumbnail: string;
}

export type FileUploadResponse = ApiResponse<FileUploadData>;
