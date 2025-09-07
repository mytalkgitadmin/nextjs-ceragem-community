import { useQuery } from "@tanstack/react-query";
import { getFileUploadAcceptList } from "../api/get-file-upload-accept-list";
import { ResponseFileUploadAcceptList } from "@/entities/attachment";

export const useFileUploadAcceptList = (subCategory: string) => {
  return useQuery({
    queryKey: ["fileUploadAcceptList", subCategory],
    queryFn: () => getFileUploadAcceptList(subCategory),
    enabled: !!subCategory,
    select: (data: ResponseFileUploadAcceptList) => data.resultData.accept,
  });
};
