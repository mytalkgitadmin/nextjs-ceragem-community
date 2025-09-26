import { Fragment } from "react";
import { BaseMessage } from "@sendbird/chat/message";
import { parseJson, formatFileName } from "@/shared/utils";
import { getShareFileThumbnailHeight } from "@/domains/message";
import { Image } from "antd";
import styles from "./Message.ContentImage.module.css";

export interface MessageContentImageProps {
  message: BaseMessage;
}

const DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;
const THUMBNAIL_NO_IMAGE = "/assets/images/familyalbum/thumbnail_noImage.png";

export const MessageContentImage = ({ message }: MessageContentImageProps) => {
  const messageData = parseJson(message.data || "");
  const resource = messageData.resource || [];
  const imageCount = resource.length;

  if (imageCount === 0) {
    return <span>이미지 전송 중 오류가 발생했습니다.</span>;
  }

  const openPreview = () => {
    console.log("openPreview");
    // TODO: 이미지 미리보기 구현
  };

  const renderImage = (file: any, style: React.CSSProperties) => {
    return (
      <Image
        onClick={() => openPreview()}
        src={
          file?.fileType?.includes("gif")
            ? DOMAIN + file.originalUrl
            : DOMAIN + (file.thumbUrl || file.originalUrl)
        }
        style={{
          objectFit: "cover",
          ...style,
        }}
        alt="preview"
        fallback={THUMBNAIL_NO_IMAGE}
        preview={false}
      />
    );
  };

  if (imageCount === 1) {
    const file = resource[0];
    return (
      <div className={styles.img1}>
        {renderImage(file, {
          height: getShareFileThumbnailHeight(file),
        })}
      </div>
    );
  } else if (imageCount <= 6) {
    return (
      <div className={`${styles.imgsGroup} ${styles[`imgs${imageCount}`]}`}>
        {resource.map((item: any, index: number) => (
          <Fragment key={message.id + item.originalUrl}>
            {renderImage(item, {})}
          </Fragment>
        ))}
      </div>
    );
  } else {
    return (
      <div className={`${styles.imgsGroup} ${styles.imgs6}`}>
        {resource.slice(0, 6).map((item: any, index: number) => (
          <Fragment key={message.id + item.originalUrl}>
            {renderImage(item, {
              opacity: index === 5 ? "0.4" : "none", // Add this line
            })}
          </Fragment>
        ))}

        <div className={styles.dimmed} onClick={() => openPreview()}>
          +{resource.length - 6}
        </div>
      </div>
    );
  }
};
