import { get } from "@/shared/api/client";

export const getFriend = async (friendType: string[]) => {
  const response = await get({
    url: "/account/friend",
    params: {
      friendType,
    },
  });
  return response;
};
