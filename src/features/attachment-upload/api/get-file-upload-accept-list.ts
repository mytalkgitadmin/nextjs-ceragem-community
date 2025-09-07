import { apiRequest } from "@/shared/api";
import { ResponseFileUploadAcceptList } from "@/entities/attachment";

export const getFileUploadAcceptList = (subCategory: string) => {
  const endpoint = { url: "/file/accept-list", method: "GET" as const };
  return apiRequest<ResponseFileUploadAcceptList>(
    endpoint,
    undefined,
    undefined,
    { subCategory }
  );
};
