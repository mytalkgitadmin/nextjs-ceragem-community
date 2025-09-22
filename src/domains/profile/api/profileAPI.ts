import { get } from "@/shared/api/client";

export const getSendbirdProfile = async (sendbirdId: string) => {
  const response = await get({
    url: `/account/profile/sendbirdId/${sendbirdId}`,
  });
  return response;
};
