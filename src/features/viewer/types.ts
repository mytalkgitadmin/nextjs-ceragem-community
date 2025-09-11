import { CarouselApi } from "@/shared/ui/carousel";
import type { ViewerItemData } from "@/shared/model/media";

// Re-export media types for backward compatibility
export type {
  ImgMsgInData,
  History,
  ViewerItemData,
  MediaType,
} from "@/shared/model/media";

export {
  isImgMsgData,
  isVideoData,
  isProfileImageData,
} from "@/shared/model/media";

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

// ViewerItemData type is now re-exported from shared/model/media
