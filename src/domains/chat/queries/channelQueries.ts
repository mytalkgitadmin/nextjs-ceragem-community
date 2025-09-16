import { useQuery } from "@tanstack/react-query";
import { getChannelList } from "../api/channel";

export const channelQueryKeys = {
  all: ["channel"] as const,
  channelList: (channelUrl?: string) => [
    ...channelQueryKeys.all,
    "channelList",
    channelUrl,
  ],
} as const;

export const useChannelList = (channelUrl: string) => {
  return useQuery({
    queryKey: channelQueryKeys.channelList(channelUrl),
    queryFn: () => getChannelList(channelUrl),
    enabled: !!channelUrl,
  });
};
