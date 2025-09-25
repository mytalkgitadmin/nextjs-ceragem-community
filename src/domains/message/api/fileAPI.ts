import { get, post } from "@/shared/api/client";

export const getFileUploadAcceptList = async (
  category: "CHAT_FILE" | "CHAT_MEDIA"
) => {
  const response = await get({
    url: `/file/public/accept/${category}`,
  });
  return response;
};

export interface UploadFileRequestData {
  file: File;
  subCategory: "CHAT_FILE";
  autoEnable: boolean;
  contentId: string | number; //channel?.url
  openMetadata: string;
}

export interface UploadFileResponseData {
  fileId: string;
  thumbnailInfo1: any;
  info: any;
  [key: string]: any;
}

export const uploadFile = async (
  data: UploadFileRequestData
): Promise<{ result: boolean; resultData: UploadFileResponseData }> => {
  const response = await post({
    url: `/file/upload`,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
