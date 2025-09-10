// VideoThumbnail with BASE_URL injection in widgets layer

import {
  VideoThumbnail,
  VideoThumbnailProps,
} from "@/shared/ui/VideoThumbnail";
import { BASE_URL } from "@/shared/api/endpoints";

export interface VideoThumbnailProviderProps
  extends Omit<VideoThumbnailProps, "baseUrl"> {
  baseUrl?: string;
}

export default function VideoThumbnailProvider({
  baseUrl = BASE_URL,
  ...props
}: VideoThumbnailProviderProps) {
  return <VideoThumbnail baseUrl={baseUrl} {...props} />;
}
