import Icons from "@/shared/ui/Icons";
import { MessageType } from "@/features/chat/model";
import { convertEditMessage, decryptData } from "@/features/chat/lib";
import { CoreMessageType } from "../components/FileMessage/FileMessage";

/* 
기본 - 긴/짧
파일 - 이미지(image, gif, webp) / 파일(document) / 비디오 / 오디오
버블티콘 - 이모티콘/버블티콘
콤비네이션 - 연락처/디데이/캘린더
*/

/**
 * 부모 메시지의 타입에 따라 적절한 UI를 렌더링하는 함수
 * @param parentMessage - 렌더링할 부모 메시지 객체
 * @returns JSX.Element - 메시지 타입에 맞는 렌더링 결과
 */
export const renderMessageContent = (
  messageContent: CoreMessageType,
  num?: number
) => {
  if (!messageContent) return;
  const { messageType, message } = messageContent;

  if (!message || !messageType) return null;

  // 파일 메시지 처리
  if (messageType === MessageType.FILE) {
    return renderFileMessage(message as string);
  }

  // 커스텀 메시지 타입별 처리
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
      // 일반 텍스트 메시지 처리
      if (num) {
        return (
          <>
            {convertEditMessage(decryptData(message as string)).slice(0, num)}
          </>
        );
      }
      return <>{convertEditMessage(decryptData(message as string))}</>;
  }
};

/**
 * 파일 메시지의 확장자에 따라 적절한 UI를 렌더링하는 함수
 * @param parentMessage - 파일 메시지 객체
 * @returns JSX.Element - 파일 타입에 맞는 렌더링 결과
 */
const renderFileMessage = (message: string): React.ReactNode => {
  // 이미지 파일 확장자 체크
  if (isImageFile(message)) {
    return (
      <>
        <Icons name="picture" />
        사진
      </>
    );
  }

  // 비디오 파일 확장자 체크
  if (isAudioFile(message)) {
    return (
      <>
        <Icons name="mic" />
        오디오
      </>
    );
  }

  // 비디오 파일 확장자 체크
  if (isVideoFile(message)) {
    return (
      <>
        <Icons name="video" />
        비디오
      </>
    );
  }

  // 기타 파일
  return (
    <>
      <Icons name="file" />
      파일: {message}
    </>
  );
};

/**
 * 이미지 파일 확장자 확인 함수
 * @param filename - 파일명
 * @returns boolean - 이미지 파일 여부
 */
const isImageFile = (filename: string): boolean => {
  const imageExtensions = [".jpg", ".gif", ".webp"];
  return (
    (filename.startsWith("image_") && filename.endsWith("_이미지")) ||
    imageExtensions.some((ext) => filename.endsWith(ext))
  );
};

/**
 * 비디오 파일 확장자 확인 함수
 * @param filename - 파일명
 * @returns boolean - 비디오 파일 여부
 */
const isVideoFile = (filename: string): boolean => {
  return filename.endsWith(".mp4");
};

/**
 * 오디오 파일 확장자 확인 함수
 * @param filename - 파일명
 * @returns boolean - 오디오 파일 여부
 */
const isAudioFile = (filename: string): boolean => {
  return filename.endsWith(".mp3");
};
