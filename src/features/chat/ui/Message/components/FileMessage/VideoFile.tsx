import { useState } from 'react';
import { ImgMsgInData } from '@/features/viewer/types';

import { Viewer } from '@/features/viewer';
import { VideoThumbnail } from '@/shared/ui/VideoThumbnail';

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
