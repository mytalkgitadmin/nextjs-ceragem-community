import styles from "./Message.Profile.module.css";
import { useMessageSenderProfile } from "@/domains/profile";
import { BaseMessage } from "@sendbird/chat/message";

export interface MessageProfileProps {
  message: BaseMessage;
}

export const NICKNAME_NONE = "(알 수 없음)";

export const MessageProfile = ({ message }: MessageProfileProps) => {
  const { nickname, profileImg, isNicknameNone, isProfileImgNone } =
    useMessageSenderProfile(message);

  const handleImgClick = () => {
    console.log("handleImgClick");
  };

  return (
    <div className={`${styles.info} ${isNicknameNone ? styles.none : ""}`}>
      <div className={styles.avatar_wrap}>
        {profileImg && (
          <button onClick={handleImgClick} className={styles.avatar}>
            <img className={styles.avatar} src={profileImg} alt="" />
          </button>
        )}
      </div>

      <p className={styles.message_name}>{nickname}</p>
    </div>
  );
};
