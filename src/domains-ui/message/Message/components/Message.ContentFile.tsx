import { BaseMessage } from "@sendbird/chat/message";
import styles from "./Message.ContentFile.module.css";
import { parseJson, formatFileName, formatBytes } from "@/shared/utils";

export interface MessageContentFileProps {
  message: BaseMessage;
}

const DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;
const ICON_IMAGE_SRCS: Record<string, string> = {
  file: "/assets/images/chat/file.png",
  pptx: "/assets/images/chat/file.png",
  etc: "/assets/images/chat/file.png",
  document: "/assets/images/chat/file.png",
  audio: "/assets/images/chat/audio.png",
  video: "/assets/images/chat/video.png",
  zip: "/assets/images/chat/zip.png",
};

export const MessageContentFile = ({ message }: MessageContentFileProps) => {
  const messageData = parseJson(message.data || "");
  const resource = messageData.resource || [];
  const file = resource[0]; // Q: 파일 한개만 처리?

  if (!file) {
    return <span>파일 전송 중 오류가 발생했습니다.</span>;
  }

  const {
    name,
    extension,
    displayName: fileName,
  } = formatFileName(file.originalFileName);

  return (
    <div className={styles.fileWrap}>
      <div>
        <a href={DOMAIN + file.originalUrl} download>
          <img
            src={ICON_IMAGE_SRCS[file.fileType] || ICON_IMAGE_SRCS.file}
            alt={file.fileType || "file"}
          />
        </a>
      </div>
      <div>
        <div className={styles.fileName}>
          <span>{fileName}</span>
          <span>.{extension}</span>
        </div>
        {resource.originalFileSize && (
          <div className={styles.fileInfo}>
            <div className={styles.fileSize}>
              {formatBytes(resource.originalFileSize)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
