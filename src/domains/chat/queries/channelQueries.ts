import { useQuery } from "@tanstack/react-query";
import { getChannelList } from "../api/channelAPI";

export const channelQueryKeys = {
  all: ["channel"] as const,
  channelList: () => [...channelQueryKeys.all, "channelList"],
} as const;

export const useChannelList = () => {
  return useQuery({
    queryKey: channelQueryKeys.channelList(),
    queryFn: () => getChannelList(),
    enabled: true,
  });
};
