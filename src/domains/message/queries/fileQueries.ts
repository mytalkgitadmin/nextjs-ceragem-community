import { useQuery } from "@tanstack/react-query";
import { fileQueryKeys } from "./queryKeys";
import { getFileUploadAcceptList } from "../api";

export const useFileUploadAcceptList = (
  category: "CHAT_FILE" | "CHAT_MEDIA"
) => {
  return useQuery({
    queryKey: [fileQueryKeys.fileUploadAcceptList, category],
    queryFn: async () => {
      return await getFileUploadAcceptList(category).then(
        (res) => res.resultData.accept
      );
    },
    refetchOnWindowFocus: false,
    onError: (error) => {},
  });
};
