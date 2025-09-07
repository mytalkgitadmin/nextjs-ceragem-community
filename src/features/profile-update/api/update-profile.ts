import { apiRequest } from "@/shared/api";
import { UpdateProfileRequest, UpdateProfileResponse } from "../types";

export async function updateProfileApi(
  profileData: UpdateProfileRequest
): Promise<UpdateProfileResponse["resultData"]> {
  const endpoint = { url: "/account/profile", method: "PATCH" as const };
  const response = await apiRequest<UpdateProfileResponse>(
    endpoint,
    profileData
  );
  return response.resultData;
}
