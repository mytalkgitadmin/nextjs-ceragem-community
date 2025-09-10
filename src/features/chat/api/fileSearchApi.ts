import { API_ENDPOINTS, apiRequest } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import { FileSearchResponse } from '../hooks/useChannelFilePreview';

export enum FileCategoryList {
  ALBUM = 'ALBUM',
  BACKUP = 'BACKUP',
  CALENDAR = 'CALENDAR',
  CHAT = 'CHAT',
  COMMON = 'COMMON',
  FEED = 'FEED',
  POINT = 'POINT',
  PROFILE = 'PROFILE',
  RESOURCE = 'RESOURCE',
  SMILE_ME = 'SMILE_ME',
}

export interface FileSearchParams {
  contentTypeList?: string[];
  extensionList?: string[];
  fileCategoryList?: FileCategoryList[];
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
      },
    ];
  };
  savedFilePathList?: string[];
  savedUrlList?: string[];
  searchType?: string[];
  searchWord: string;
}

export const searchChannelFiles = (
  data: FileSearchParams,
): Promise<FileSearchResponse> => {
  return apiRequest(API_ENDPOINTS.CHANNEL.POST_FILE_INFO, data);
};
export const useChannelFileSearch = () => {
  return useMutation<FileSearchResponse, Error, FileSearchParams>({
    mutationFn: (data: FileSearchParams) => {
      return searchChannelFiles(data);
    },
    onError: (error) => {
      console.error('채널 파일 검색 중 오류 발생', error);
    },
  });
};
