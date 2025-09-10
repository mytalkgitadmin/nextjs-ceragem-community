// 파일 검색 관련 타입들

export interface File {
  fileId: string;
  subCategory: string; // 'CHAT_FILE';
  description: null;
  accountId: number;
  info: Info;
  thumbnailSubCategory1: string; // 'CHAT_THUMBNAIL';
  thumbnailInfo1: Info | null;
  thumbnailSubCategory2: null;
  thumbnailInfo2: null;
}

export interface Info {
  subCategory: string; // 'CHAT_FILE';
  fileKind: string; // 'VIDEO' | 'DOCUMENT';
  contentId: string;
  accountId: number;
  fileId: string;
  fileSeq: number;
  fileName: string;
  fileSize: number;
  contentType: string; // "application/pdf", "video/quicktime"
  existFile: boolean;
  directUrl: string;
  addDate: number;
  metadata: null;
}

export interface FileSearchResponse {
  resultData: {
    content: File[];
    totalElements: number;
    totalPages: number;
  };
}

export interface FileSearchParams {
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
