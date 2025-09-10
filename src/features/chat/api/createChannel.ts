import { API_ENDPOINTS, apiRequest } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

interface CreateChannelRequest {
  accountIds: number[];
  channelName?: string;
  channelType: 'GROUP' | 'MY' | 'FAMILY' | 'DIRECT' | 'ADMIN';
}

interface CreateChannelResponse {
  result: boolean;
  resultData: {
    channelId: number;
    channelUrl: string;
  };
}

export const createChannelApi = async (data: CreateChannelRequest) => {
  const response = await apiRequest<CreateChannelResponse>(
    API_ENDPOINTS.CHANNEL.POST_CREATE_CHANNEL,
    data,
  );

  return response.resultData;
};

export const useCreateChannel = () => {
  return useMutation({
    mutationFn: createChannelApi,
  });
};
