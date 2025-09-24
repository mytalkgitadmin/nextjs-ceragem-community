import { BaseMessage } from "@sendbird/chat/message";
import { parseJson } from "@/shared/utils";
import styles from "./Message.ContentVideo.module.css";
import { Image } from "antd";
import { getShareFileThumbnailHeight } from "@/domains/message";
import { Video } from "@/shared-ui/media";

export interface MessageContentVideoProps {
  message: BaseMessage;
}

const DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;
const THUMBNAIL_NO_IMAGE = "/assets/images/familyalbum/thumbnail_noImage.png";
const PLAY_ICON = "/assets/images/chat/play.png";

export const MessageContentVideo = ({ message }: MessageContentVideoProps) => {
  const messageData = parseJson(message.data || "");
  const resource = messageData.resource || [];
  const file = resource[0]; // Q: 파일 한개만 처리?

  if (!file) {
    return "비디오 전송 중 오류가 발생했습니다.";
  }

  const videoUrl = DOMAIN + file.originalUrl;
  const thumbnailUrl = DOMAIN + file.thumbUrl;

  const openPreview = () => {
    console.log("openPreview");
    // TODO: 비디오 미리보기 구현
  };

  return (
    <div className={styles.videoRelative}>
      <div className={styles.videoViewWrap} onClick={() => openPreview()}>
        <Image
          src={PLAY_ICON}
          className={styles.videoViewPlayImg}
          alt="preview"
          fallback={THUMBNAIL_NO_IMAGE}
          preview={false}
        />
        <Video videoUrl={videoUrl} />
      </div>

      <Image
        src={thumbnailUrl}
        style={{
          objectFit: "cover",
          width: "auto",
          height: getShareFileThumbnailHeight(file),
          maxWidth: "min(300px, 50vw)",
          maxHeight: "min(300px, 50vw)",
          minWidth: "100px",
          minHeight: "100px",
          borderRadius: "20px",
        }}
        alt="preview"
        fallback={THUMBNAIL_NO_IMAGE}
        preview={false}
      />
    </div>
  );
};
