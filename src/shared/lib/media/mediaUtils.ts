import { BASE_URL } from "@/shared/api/endpoints";
import {
  isImgMsgData,
  isProfileImageData,
  MediaType,
  ViewerItemData,
} from "@/shared/model/media";

const defaultSmallProfile = "/assets/profile/bemilyDefaultProfile.webp";

// === 이모티콘 관련 ===
const createProfileImageMap = () => {
  const imageMap = new Map<number, string>();

  for (let i = 0; i <= 15; i++) {
    const id = i.toString().padStart(3, "0");
    imageMap.set(i, `/assets/profile/bemilyProfileSmall${id}.webp`);
  }
  return imageMap;
};

const profileImageMap = createProfileImageMap();

export const getEmoticonImageUrl = (emoticonId: number): string => {
  try {
    const imageUrl = profileImageMap.get(emoticonId);
    return imageUrl || defaultSmallProfile;
  } catch {
    return defaultSmallProfile;
  }
};

// === 미디어 타입 관련 ===
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];

export const getMediaType = (item: ViewerItemData): MediaType => {
  // 이모티콘은 항상 이미지로 처리
  if (isProfileImageData(item) && item.profileKind === "emoticon") {
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

// === URL 관련 ===
export const getOriginalUrl = (item: ViewerItemData): string => {
  // 이미지 메시지인 경우
  if (isImgMsgData(item)) {
    // BASE_URL이 비어있으면 기본 이미지 반환
    if (!BASE_URL) {
      return defaultSmallProfile;
    }
    return `${BASE_URL}${item.originalUrl}`;
  }

  if (isProfileImageData(item)) {
    if (item.profileKind === "emoticon") {
      return getEmoticonImageUrl(item.emoticonId);
    }

    // BASE_URL이 비어있으면 기본 이미지 반환
    if (!BASE_URL) {
      return defaultSmallProfile;
    }

    if (item.profileOriginal) {
      return `${BASE_URL}${item.profileOriginal}`;
    }

    if (item.profileThumbnail) {
      return `${BASE_URL}${item.profileThumbnail}`;
    }

    if (item.profileSmallThumbnail) {
      return `${BASE_URL}${item.profileSmallThumbnail}`;
    }
  }

  return defaultSmallProfile;
};

export const getThumbnailUrl = (item: ViewerItemData): string => {
  if (isImgMsgData(item) && item.thumbUrl) {
    // BASE_URL이 비어있으면 기본 이미지 반환
    if (!BASE_URL) {
      return defaultSmallProfile;
    }
    return `${BASE_URL}${item.thumbUrl}`;
  }

  // 프로필의 경우 썸네일이 있으면 사용, 없으면 원본 사용
  if (isProfileImageData(item)) {
    if (item.profileKind === "emoticon") {
      return getEmoticonImageUrl(item.emoticonId);
    }

    // BASE_URL이 비어있으면 기본 이미지 반환
    if (!BASE_URL) {
      return defaultSmallProfile;
    }

    if (item.profileThumbnail) {
      return `${BASE_URL}${item.profileThumbnail}`;
    }

    if (item.profileSmallThumbnail) {
      return `${BASE_URL}${item.profileSmallThumbnail}`;
    }
  }

  return getOriginalUrl(item);
};

// === 유틸리티 함수들 ===
export const isEmoticonProfile = (item: ViewerItemData): boolean => {
  return isProfileImageData(item) && item.profileKind === "emoticon";
};

export const isDownloadable = (item: ViewerItemData): boolean => {
  if (isImgMsgData(item)) {
    return item.shared;
  }

  if (isEmoticonProfile(item)) {
    return false;
  }

  return true; // Profile, History는 기본적으로 다운로드 가능
};

export const getFileName = (item: ViewerItemData): string => {
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
