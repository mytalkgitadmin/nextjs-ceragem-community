import { bffRequest } from "@/shared/api";
import { FriendListParams, FriendListResponse } from "../model/entity-types";

export const getFriendListApi = async (params: FriendListParams) => {
  const endpoint = { url: "/account/friend", method: "GET" as const };
  const response = await bffRequest<FriendListResponse>(endpoint, undefined, {
    query: params,
  });

  return response.resultData;
};
