import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINTS, apiRequest } from '@/shared/api';
import {
  ResponseChannel,
  ResponseFileUploadAcceptList,
} from '@/features/chat/model';

export const getChannelListApi = (params?: { channelUrl?: string }) => {
  return apiRequest<ResponseChannel>(
    API_ENDPOINTS.CHANNEL.GET_LIST,
    undefined,
    params,
  );
};

export const useChannelList = (channelUrl?: string) => {
  return useQuery({
    queryKey: ['channelList', channelUrl],
    queryFn: () => getChannelListApi(channelUrl ? { channelUrl } : undefined),
  });
};

export const getFileUploadAcceptList = (subCategory: string) => {
  return apiRequest<ResponseFileUploadAcceptList>(
    API_ENDPOINTS.FILE_UPLOAD.GET_ACCEPT_LIST,
    undefined,
    undefined,
    { subCategory },
  );
};

export const useFileUploadAcceptList = (subCategory: string) => {
  return useQuery({
    queryKey: ['fileUploadAcceptList', subCategory],
    queryFn: () => getFileUploadAcceptList(subCategory),
    enabled: !!subCategory,
    select: (data: ResponseFileUploadAcceptList) => data.resultData.accept,
  });
};
