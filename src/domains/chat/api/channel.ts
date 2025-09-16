import { get } from "@/shared/api/client";

export const getChannelList = async () => {
  const response = await get({
    url: "/channel/list",
  });
  return response;
};
