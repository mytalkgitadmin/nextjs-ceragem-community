import { apiRequest } from "@/shared/api";
import type { UserSendbirdProfileResponse } from "../model";

export async function getSendbirdProfileApi(
  sendbirdId: string
): Promise<UserSendbirdProfileResponse["resultData"]["accountProfile"]> {
  const response = await apiRequest<UserSendbirdProfileResponse>(
    { url: "/account/profile/sendbird/{sendbirdId}", method: "GET" },
    undefined,
    undefined,
    { sendbirdId }
  );
  return response.resultData.accountProfile;
}
