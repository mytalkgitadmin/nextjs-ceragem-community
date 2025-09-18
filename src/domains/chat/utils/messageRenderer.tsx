import { parseMessageData } from "./messageParser";

/**
 * 메시지가 내 화면에서 삭제처리 되었는지 확인
 * @param message - 메시지 객체
 * @returns 메시지를 숨길지 여부
 */

export const shouldHideMessageForMe = (userId: string, message: any) => {
  const data = parseMessageData(message);
  const deleteUsers = data?.deleteUsers;
  if (!deleteUsers) return false;

  return deleteUsers.map((user: any) => user.user_id).includes(userId);
};

/**
 * 파일 메시지 렌더링
 * @param message - 메시지 객체
 * @returns 파일 메시지
 */

const styles = {
  width: "16px",
  height: "16px",
  marginRight: "4px",
  marginBottom: "1px",
};

const imgSrc = {
  photo: "/assets/images/message/List_Photo_Solid.png",
  video: "/assets/images/message/List_Video_Solid.png",
  file: "/assets/images/message/List_File_Solid.png",
  emoji: "/assets/images/message/List_Emoji_Solid.png",
  phone: "/assets/images/message/List_PhoneBook_Solid.png",
};

export const renderFileMessage = (message: any) => {
  const data = parseMessageData(message);
  if (!data) return "파일 오류";

  const imagesFiles = ["gif", "image", "webp"];
  if (imagesFiles.includes(data?.resource?.[0]?.fileType)) {
    //사진 파일 메시지
    return (
      <>
        <img src={imgSrc.photo} style={styles} />
        사진 메시지
      </>
    );
  } else if (data?.resource?.[0]?.fileType === "video") {
    //비디오 파일 메시지
    return (
      <>
        <img src={imgSrc.video} style={styles} />
        비디오 메시지
      </>
    );
  } else {
    //일반 파일 메시지
    return (
      <>
        <img src={imgSrc.file} style={styles} />
        {data?.resource?.[0]?.originalFileName}] 파일 메시지
      </>
    );
  }
};

/**
 * 메시지 렌더링
 * @param message - 메시지 객체
 * @returns 메시지 렌더링
 */

export const renderMessage = (message: any) => {
  const data = parseMessageData(message);
  if (data?.type === "MESSAGE_BUBBLE") {
    return (
      <>
        <img src={imgSrc.emoji} style={styles} />
        {data?.bubbleType === "Emoji_Bubble_None"
          ? "이모티콘"
          : "버블티콘"}{" "}
        메시지
      </>
    );
  } else if (data?.type === "MESSAGE_CONTACT") {
    return (
      <>
        <img src={imgSrc.phone} style={styles} />
        {`[${data?.contact?.[0]?.name}] 연락처 메시지`}
      </>
    );
  } else {
    return message.message;
  }
};
