import { bffRequest } from "@/shared/api";
import type { UserProfileResponse } from "../api/contracts-types";

export async function getProfileApi(accountId: number) {
  const response = await bffRequest<UserProfileResponse>(
    { url: "/account/profile/{accountId}", method: "GET" },
    undefined,
    {
      pathParams: { accountId },
    }
  );
  return response.resultData;
}
