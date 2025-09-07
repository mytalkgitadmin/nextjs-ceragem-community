import { apiRequest } from "@/shared/api";

export interface CreateChannelRequest {
  accountIds: number[];
  channelName?: string;
  channelType: "GROUP" | "MY" | "FAMILY" | "DIRECT" | "ADMIN";
}

interface CreateChannelResponse {
  result: boolean;
  resultData: {
    channelId: number;
    channelUrl: string;
  };
}

export const createChannelApi = async (data: CreateChannelRequest) => {
  const endpoint = { url: "/channel/", method: "POST" as const };
  const response = await apiRequest<CreateChannelResponse>(endpoint, data);

  return response.resultData;
};
