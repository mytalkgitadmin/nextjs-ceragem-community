// Chat DTO to Domain 매퍼들

import type {
  CreateChannelResponseDTO,
  FileSearchResponseDTO,
  FileUploadResponseDTO,
  FileDTO,
  InfoDTO,
} from "./dto-types";

import type {
  CreateChannelResponse,
  FileSearchResponse,
  FileUploadResponse,
  File,
  Info,
} from "./contracts-types";

// Info DTO를 Domain 모델로 매핑 (구조가 동일함)
export const mapInfoToInfo = (dto: InfoDTO): Info => ({
  subCategory: dto.subCategory,
  fileKind: dto.fileKind,
  contentId: dto.contentId,
  accountId: dto.accountId,
  fileId: dto.fileId,
  fileSeq: dto.fileSeq,
  fileName: dto.fileName,
  fileSize: dto.fileSize,
  contentType: dto.contentType,
  existFile: dto.existFile,
  directUrl: dto.directUrl,
  addDate: dto.addDate,
  metadata: dto.metadata,
});

// 파일 DTO를 Domain 모델로 매핑 (구조가 동일함)
export const mapFileToFile = (dto: FileDTO): File => ({
  fileId: dto.fileId,
  subCategory: dto.subCategory,
  description: dto.description,
  accountId: dto.accountId,
  info: mapInfoToInfo(dto.info),
  thumbnailSubCategory1: dto.thumbnailSubCategory1,
  thumbnailInfo1: dto.thumbnailInfo1 ? mapInfoToInfo(dto.thumbnailInfo1) : null,
  thumbnailSubCategory2: dto.thumbnailSubCategory2,
  thumbnailInfo2: dto.thumbnailInfo2,
});

// 채널 생성 응답 매핑
export const mapCreateChannelResponse = (
  dtoResponse: CreateChannelResponseDTO
): CreateChannelResponse => ({
  result: dtoResponse.result,
  data: {
    channelId: dtoResponse.resultData.channelId,
    channelUrl: dtoResponse.resultData.channelUrl,
  },
  status: 200,
  resultData: {
    channelId: dtoResponse.resultData.channelId,
    channelUrl: dtoResponse.resultData.channelUrl,
  },
});

// 파일 검색 응답 매핑 (구조가 동일함)
export const mapFileSearchResponse = (
  dtoResponse: FileSearchResponseDTO
): FileSearchResponse => ({
  resultData: {
    content: dtoResponse.resultData.content.map(mapFileToFile),
    totalElements: dtoResponse.resultData.totalElements,
    totalPages: dtoResponse.resultData.totalPages,
  },
});

// 파일 업로드 응답 매핑
export const mapFileUploadResponse = (
  dtoResponse: FileUploadResponseDTO
): FileUploadResponse => ({
  result: dtoResponse.result,
  data: {
    fileId: dtoResponse.resultData.fileId,
    fileName: dtoResponse.resultData.fileName,
    fileUrl: dtoResponse.resultData.fileUrl,
    fileThumbnail: dtoResponse.resultData.fileThumbnail,
  },
  status: 200,
  resultData: {
    fileId: dtoResponse.resultData.fileId,
    fileName: dtoResponse.resultData.fileName,
    fileUrl: dtoResponse.resultData.fileUrl,
    fileThumbnail: dtoResponse.resultData.fileThumbnail,
  },
});
