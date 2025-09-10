import { CarouselApi } from '@/shared/ui/carousel';
import { Profile, ProfileImage } from '../chat/model';

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
  return 'originalUrl' in data && 'originalFileName' in data;
};

export const isVideoData = (data: ViewerItemData): data is ImgMsgInData => {
  return 'originalUrl' in data && 'originalFileName' in data;
};
export const isProfileImageData = (
  data: ViewerItemData,
): data is History | Profile => {
  return 'profileKind' in data && 'profileOriginal' in data;
};

export interface MediaViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ViewerItemData[];
  initialIndex?: number;
}
export interface ViewerContentProps {
  data: ViewerItemData[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  api: CarouselApi | undefined;
  setApi: (api: CarouselApi | undefined) => void;
}

export type MediaType = 'image' | 'video';
