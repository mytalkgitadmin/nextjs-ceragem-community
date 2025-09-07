import { Icons } from "@/shared/ui/icon";
import { MessageType } from "@/entities/message";
import { convertEditMessage, decryptData } from "@/entities/message/lib";
import { CoreMessageType } from "../components/FileMessage";

export const renderMessageContent = (
  messageContent: CoreMessageType,
  num?: number
) => {
  if (!messageContent) return;
  const { messageType, message } = messageContent;

  if (!message || !messageType) return null;

  if (messageType === MessageType.FILE) {
    return renderFileMessage(message);
  }

  switch (message) {
    case "CUSTOM_MESSAGE":
      return (
        <>
          <Icons name="phone" />
          연락처
        </>
      );
    case "디데이":
      return (
        <>
          <Icons name="dday" />
          디데이
        </>
      );
    case "캘린더":
      return (
        <>
          <Icons name="calendar" />
          캘린더
        </>
      );
    case "EMOTICON":
      return (
        <>
          <Icons name="emoticon" />
          이모티콘
        </>
      );
    default:
      if (num) {
        return <>{convertEditMessage(decryptData(message)).slice(0, num)}</>;
      }
      return <>{convertEditMessage(decryptData(message))}</>;
  }
};

const renderFileMessage = (message: string): React.ReactNode => {
  if (isImageFile(message)) {
    return (
      <>
        <Icons name="picture" />
        사진
      </>
    );
  }

  if (isAudioFile(message)) {
    return (
      <>
        <Icons name="mic" />
        오디오
      </>
    );
  }

  if (isVideoFile(message)) {
    return (
      <>
        <Icons name="video" />
        비디오
      </>
    );
  }

  return (
    <>
      <Icons name="file" />
      파일: {message}
    </>
  );
};

const isImageFile = (filename: string): boolean => {
  const imageExtensions = [".jpg", ".gif", ".webp"];
  return (
    (filename.startsWith("image_") && filename.endsWith("_이미지")) ||
    imageExtensions.some((ext) => filename.endsWith(ext))
  );
};

const isVideoFile = (filename: string): boolean => filename.endsWith(".mp4");
const isAudioFile = (filename: string): boolean => filename.endsWith(".mp3");
