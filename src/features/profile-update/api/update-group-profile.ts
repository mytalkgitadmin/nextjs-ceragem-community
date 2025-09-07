import { apiRequest } from "@/shared/api";
import { GroupProfileParams, UpdateGroupProfileResponse } from "../types";

export async function updateGroupProfile(
  data: GroupProfileParams
): Promise<UpdateGroupProfileResponse["resultData"]> {
  const endpoint = { url: "/account/profile/image", method: "PUT" as const };
  const response = await apiRequest<UpdateGroupProfileResponse>(endpoint, data);
  return response.resultData;
}
