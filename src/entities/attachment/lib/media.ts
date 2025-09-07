import { getApiBaseUrl } from "@/shared/api";
import { getEmoticonImageUrl } from "../@x/profile";
import {
  isImgMsgData,
  isProfileImgData,
  type MediaItem,
  type MediaType,
} from "../model/entity-types";
import type { UploadResult } from "@/entities/attachment/model/file-upload";

const DEFAULT_SMALL_PROFILE = "/assets/profile/bemilyDefaultProfile.webp";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];

export const getMediaType = (item: MediaItem): MediaType => {
  if (isProfileImgData(item) && item.profileKind === "emoticon") {
    return "image";
  }

  let fileName = "";

  if ("originalFileName" in item) {
    fileName = item.originalFileName;
  } else if ("profileOriginal" in item && item.profileOriginal) {
    fileName = item.profileOriginal;
  }

  if (!fileName) return "image";

  const extension = fileName.toLowerCase().split(".").pop();
  return extension && VIDEO_EXTENSIONS.some((ext) => ext.includes(extension))
    ? "video"
    : "image";
};

export const getOriginalUrl = (item: MediaItem): string => {
  if (isImgMsgData(item)) {
    return `${getApiBaseUrl()}${item.originalUrl}`;
  }

  if (isProfileImgData(item)) {
    if (item.profileKind === "emoticon") {
      return getEmoticonImageUrl(item.emoticonId);
    }

    if (item.profileOriginal) {
      return `${getApiBaseUrl()}${item.profileOriginal}`;
    }

    if (item.profileThumbnail) {
      return `${getApiBaseUrl()}${item.profileThumbnail}`;
    }

    if (item.profileSmallThumbnail) {
      return `${getApiBaseUrl()}${item.profileSmallThumbnail}`;
    }
  }

  return DEFAULT_SMALL_PROFILE;
};

export const getThumbnailUrl = (item: MediaItem): string => {
  if (isImgMsgData(item) && item.thumbUrl) {
    return `${getApiBaseUrl()}${item.thumbUrl}`;
  }

  if (isProfileImgData(item)) {
    if (item.profileKind === "emoticon") {
      return getEmoticonImageUrl(item.emoticonId);
    }

    if (item.profileThumbnail) {
      return `${getApiBaseUrl()}${item.profileThumbnail}`;
    }

    if (item.profileSmallThumbnail) {
      return `${getApiBaseUrl()}${item.profileSmallThumbnail}`;
    }
  }

  return getOriginalUrl(item);
};

export const isEmoticonProfile = (item: MediaItem): boolean => {
  return isProfileImgData(item) && item.profileKind === "emoticon";
};

export const isDownloadable = (item: MediaItem): boolean => {
  if (isImgMsgData(item)) {
    return item.shared;
  }

  if (isEmoticonProfile(item)) {
    return false;
  }

  return true;
};

export const getFileName = (item: MediaItem): string => {
  if ("originalFileName" in item) {
    return item.originalFileName;
  }

  if (isEmoticonProfile(item)) {
    return `이모티콘_${item.emoticonId}`;
  }

  if ("profileOriginal" in item && item.profileOriginal) {
    const fileName = item.profileOriginal.split("/").pop() || "미디어파일";
    return fileName;
  }

  return "미디어파일";
};

export function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

// Mapper: UploadResult(attachment) → MediaItem
export const mapUploadResultToMediaItem = (result: UploadResult): MediaItem => {
  const info = result.resultData.info;
  return {
    fileType: (info.fileKind as string).toLowerCase(),
    originalFileName: info.fileName,
    originalFileSize: info.fileSize,
    originalUrl: info.directUrl,
    thumbUrl: (result.resultData as any).thumbnailInfo1?.directUrl || "",
    shared: true,
  } as any;
};
