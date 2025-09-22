import { useQuery } from "@tanstack/react-query";
import { chatQueryKeys } from "./queryKeys";
import { getChannelList } from "../api/channelAPI";

export const useChannelList = () => {
  return useQuery({
    queryKey: chatQueryKeys.channelList,
    queryFn: () => getChannelList(),
    enabled: true,
  });
};
