// Chat API DTO 타입들

// 채널 생성 DTO
export interface CreateChannelRequestDTO {
  accountIds: number[];
  channelName?: string;
  channelType: "GROUP" | "MY" | "FAMILY" | "DIRECT" | "ADMIN";
}

export interface CreateChannelResponseDTO {
  result: boolean;
  resultData: {
    channelId: number;
    channelUrl: string;
  };
}

// 파일 검색 DTO (실제 API 구조)
export interface FileSearchRequestDTO {
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

export interface InfoDTO {
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

export interface FileDTO {
  fileId: string;
  subCategory: string;
  description: null;
  accountId: number;
  info: InfoDTO;
  thumbnailSubCategory1: string;
  thumbnailInfo1: InfoDTO | null;
  thumbnailSubCategory2: null;
  thumbnailInfo2: null;
}

export interface FileSearchResponseDTO {
  resultData: {
    content: FileDTO[];
    totalElements: number;
    totalPages: number;
  };
}

// 파일 업로드 DTO
export interface FileUploadRequestDTO {
  file: File;
  contentId?: string;
  subCategory?: string;
  autoEnable?: boolean;
  openMetadata?: string;
}

export interface FileUploadResponseDTO {
  result: boolean;
  resultData: {
    fileId: number;
    fileName: string;
    fileUrl: string;
    fileThumbnail: string;
  };
}
