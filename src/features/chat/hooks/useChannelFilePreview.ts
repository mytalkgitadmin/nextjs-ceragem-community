"use client";

import { useEffect, useState } from "react";
import { FileSearchParams, useChannelFileSearch } from "../api/fileSearchApi";
import { FileCategory, FileKind, FileSubCategory } from "../model";

export interface File {
  fileId: string;
  subCategory: string; // 'CHAT_FILE';
  description: null;
  accountId: number;
  info: Info;
  thumbnailSubCategory1: string; // 'CHAT_THUMBNAIL';
  thumbnailInfo1: Info | null;
  thumbnailSubCategory2: null;
  thumbnailInfo2: null;
}

export interface Info {
  subCategory: string; // 'CHAT_FILE';
  fileKind: string; // 'VIDEO' | 'DOCUMENT';
  contentId: string;
  accountId: number;
  fileId: string;
  fileSeq: number;
  fileName: string;
  fileSize: number;
  contentType: string; // "application/pdf", "video/quicktime"
  existFile: boolean;
  directUrl: string;
  addDate: number;
  metadata: null;
}

export interface FileSearchResponse {
  resultData: {
    content: File[];
    totalElements: number;
    totalPages: number;
  };
}

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
        fileCategoryList: [FileCategory.CHAT],
      fileKindList:
        type === "image"
          ? [FileKind.IMAGE, FileKind.GIF, FileKind.WEBP, FileKind.VIDEO]
          : [FileKind.DOCUMENT, FileKind.AUDIO, FileKind.ZIP, FileKind.ETC],
      isDeleted: false,
      ownerContentIdList: [channelUrl],
      fileSubCategoryList: [FileSubCategory.CHAT_FILE],
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
