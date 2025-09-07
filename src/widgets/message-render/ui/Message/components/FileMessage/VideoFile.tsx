import { useState } from "react";
import { ImgMsgInData, Viewer } from "@/entities/attachment";
import { VideoThumbnail } from "@/shared/ui/media";

export default function VideoFile({
  messageInData,
}: {
  messageInData: ImgMsgInData;
}) {
  const [viewerOpen, setViewerOpen] = useState(false);
  if (!messageInData) return;
  const { thumbUrl, originalUrl } = messageInData;

  if (!originalUrl) return;

  return (
    <>
      <VideoThumbnail
        url={thumbUrl}
        onClick={() => setViewerOpen(true)}
        type="talk"
      />
      <Viewer
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        data={[messageInData]}
      />
    </>
  );
}
