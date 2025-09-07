export interface ThumbnailInfo {
  subCategory: "PROFILE_THUMBNAIL" | "PROFILE_SMALL_THUMBNAIL";
  fileKind: string | "IMAGE";
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

export interface UploadResult {
  result: boolean;
  resultData: {
    fileId: string;
    subCategory: string | "PROFILE_ORIGIN";
    description: string | null;
    info: FileInfo;
    thumbnailSubCategory1: string | "PROFILE_THUMBNAIL";
    thumbnailSubCategory2: "PROFILE_SMALL_THUMBNAIL";
    thumbnailInfo1?: ThumbnailInfo;
    thumbnailInfo2: ThumbnailInfo;
  };
}
