// Media-related shared types
import { Profile, ProfileImage } from "@/entities/profile";

export interface ImgMsgInData {
  fileType: string;
  originalFileName: string;
  originalFileSize: number;
  originalUrl: string;
  thumbUrl: string;
  shared: boolean;
}

export interface History extends ProfileImage {
  historyId: null;
}

export type ViewerItemData = ImgMsgInData | History | Profile;

// 타입 가드 함수들
export const isImgMsgData = (data: ViewerItemData): data is ImgMsgInData => {
  return "originalUrl" in data && "originalFileName" in data;
};

export const isVideoData = (data: ViewerItemData): data is ImgMsgInData => {
  return "originalUrl" in data && "originalFileName" in data;
};

export const isProfileImageData = (
  data: ViewerItemData
): data is History | Profile => {
  return "profileKind" in data && "profileOriginal" in data;
};

export type MediaType = "image" | "video";
