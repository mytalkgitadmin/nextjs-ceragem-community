import { apiRequest } from "@/shared/api";
import type { ProfileUserData } from "../model";

export async function getProfileApi(
  accountId: number
): Promise<ProfileUserData> {
  const response = await apiRequest<{
    result: boolean;
    resultData: ProfileUserData;
  }>(
    { url: "/account/profile/{accountId}", method: "GET" },
    undefined,
    undefined,
    { accountId }
  );
  return response.resultData;
}
