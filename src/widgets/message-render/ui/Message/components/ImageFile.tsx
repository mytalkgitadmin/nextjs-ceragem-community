import { useState } from "react";
import { getApiBaseUrl } from "@/shared/api";
import { ImgMsgInData, Viewer } from "@/entities/attachment";

import styles from "./ImageFile.module.scss";

export default function ImageFile({
  messageInData,
}: {
  messageInData: ImgMsgInData[];
}) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  if (!messageInData || messageInData.length === 0) {
    return null;
  }

  const handleImageClick = (index: number) => {
    setImgIndex(index);
    setViewerOpen(true);
  };

  const displayImages = messageInData.slice(0, 6);
  const hasMoreImages = messageInData.length > 6;

  return (
    <div
      className={`${styles.groupImg} imgs${
        hasMoreImages ? 6 : messageInData.length
      }`}
    >
      {displayImages.map((image, index) => {
        const { fileType, originalUrl, thumbUrl, originalFileName } = image;
        const ratio = parseFloat(
          parseFloat(thumbUrl?.split("sizeRate=")[1] || "1").toFixed(2)
        );

        const imageSrc =
          fileType === "gif"
            ? `${getApiBaseUrl()}${originalUrl}`
            : `${getApiBaseUrl()}${thumbUrl || originalUrl}`;

        return (
          <img
            key={`img-${index}`}
            onClick={() => handleImageClick(index)}
            src={imageSrc}
            alt={originalFileName || `이미지 ${index + 1}`}
            width={300}
            height={300 * ratio}
            style={{
              maxWidth: "min(300px, 50vw)",
            }}
            loading="lazy"
          />
        );
      })}
      {hasMoreImages && (
        <button className={styles.more} onClick={() => handleImageClick(5)}>
          +{messageInData.length - 5}
        </button>
      )}

      <Viewer
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        initialIndex={imgIndex}
        data={messageInData}
      />
    </div>
  );
}
