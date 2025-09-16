import { get } from "@/shared/api/client";

export const getChannelList = async (channelUrl: string) => {
  const response = await get({
    url: "/channel/list",
    params: {
      channelUrl,
    },
  });
  return response;
};
