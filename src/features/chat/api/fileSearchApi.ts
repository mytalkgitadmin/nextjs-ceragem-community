import { apiRequest } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";

// DTO와 계약 타입 import
import type { FileSearchRequestDTO, FileSearchResponseDTO } from "./dto-types";
import type { FileSearchRequest, FileSearchResponse } from "./contracts-types";
import { mapFileSearchResponse } from "./dto-mappers";
import { CHAT_ENDPOINTS } from "./endpoints";

// 하위 호환성을 위한 기존 타입 re-export
export type FileSearchParams = FileSearchRequest;
export type { FileSearchResponse };

export const searchChannelFiles = async (
  data: FileSearchRequest
): Promise<FileSearchResponse> => {
  // DTO로 변환 (구조가 동일하므로 그대로 사용)
  const dtoRequest: FileSearchRequestDTO = {
    contentTypeList: data.contentTypeList,
    extensionList: data.extensionList,
    fileCategoryList: data.fileCategoryList,
    fileIdList: data.fileIdList,
    fileKindList: data.fileKindList,
    fileSubCategoryList: data.fileSubCategoryList,
    idList: data.idList,
    ownerAccountIdList: data.ownerAccountIdList,
    ownerContentIdList: data.ownerContentIdList,
    isDeleted: data.isDeleted,
    isEnabledFile: data.isEnabledFile,
    page: data.page,
    savedFilePathList: data.savedFilePathList,
    savedUrlList: data.savedUrlList,
    searchType: data.searchType,
    searchWord: data.searchWord,
  };

  // DTO로 API 호출
  const dtoResponse = await apiRequest<FileSearchResponseDTO>(
    CHAT_ENDPOINTS.POST_FILE_INFO,
    dtoRequest
  );

  // DTO를 도메인 모델로 변환 (구조가 동일하므로 단순 매핑)
  return mapFileSearchResponse(dtoResponse);
};
export const useChannelFileSearch = () => {
  return useMutation<FileSearchResponse, Error, FileSearchParams>({
    mutationFn: (data: FileSearchParams) => {
      return searchChannelFiles(data);
    },
    onError: (error) => {
      console.error("채널 파일 검색 중 오류 발생", error);
    },
  });
};
