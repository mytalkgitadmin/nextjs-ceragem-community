import { apiRequest } from "@/shared/api";
import { ResponseChannel } from "../model";

export const getChannelListApi = (params?: { channelUrl?: string }) => {
  const endpoint = { url: "/channel/list", method: "GET" as const };
  return apiRequest<ResponseChannel>(endpoint, undefined, params);
};
