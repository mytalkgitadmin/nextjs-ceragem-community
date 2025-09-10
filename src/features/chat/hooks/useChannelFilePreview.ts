"use client";

import { useEffect, useState } from "react";
import { useChannelFileSearch } from "../api/fileSearchApi";
import type { File, FileSearchParams } from "../model/file-search-types";
import { ChatFileCategory, ChatFileSubCategory } from "@/entities/chat";
import { FileKind } from "@/shared/model";

interface UseChannelFilePreviewProps {
  channelUrl?: string;
  isOpen: boolean;
  type: "image" | "file";
}
export default function useChannelFilePreview({
  channelUrl,
  isOpen,
  type,
}: UseChannelFilePreviewProps) {
  const [list, setList] = useState<File[]>([]);

  const searchChannelMedia = () => {
    if (!channelUrl) return;

    const searchParams: FileSearchParams = {
      fileCategoryList: [ChatFileCategory.CHAT],
      fileKindList:
        type === "image"
          ? [FileKind.IMAGE, FileKind.GIF, FileKind.WEBP, FileKind.VIDEO]
          : [FileKind.DOCUMENT, FileKind.AUDIO, FileKind.ZIP, FileKind.ETC],
      isDeleted: false,
      ownerContentIdList: [channelUrl],
      fileSubCategoryList: [ChatFileSubCategory.CHAT_FILE],
      page: {
        offset: 0,
        pageNo: 0,
        pageSize: type === "image" ? 4 : 2,
        sort: [
          {
            asc: false,
            property: "addDate",
          },
        ],
      },
      searchType: [],
      searchWord: "",
    };

    fileSearchMutation.mutate(searchParams, {
      onSuccess: (data) => {
        if (data?.resultData?.content) {
          const files = data.resultData.content;
          setList(files);
        }
      },
    });
  };

  // 채널 정보가 열리고 channelUrl이 있을 때 파일 검색 실행
  useEffect(() => {
    if (isOpen && channelUrl) {
      searchChannelMedia();
    }
  }, [isOpen, channelUrl]);

  const fileSearchMutation = useChannelFileSearch();
  return {
    data: list,
    isLoading: fileSearchMutation.isPending,
    error: fileSearchMutation.error,
    refetch: searchChannelMedia,
  };
}
