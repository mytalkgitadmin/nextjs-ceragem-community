import { BASE_URL } from "@/shared/api/endpoints";
const defaultBubble = "/assets/bubble/Emoji_Bubble_Type01.webp";

import { decryptData } from "@/features/chat/lib";

import styles from "./BubbleMessage.module.scss";
import { CoreMessageType } from "../FileMessage/FileMessage";
import { parseData } from "@/features/chat/lib";

export default function BubbleInner({
  messageContent,
}: {
  messageContent: CoreMessageType;
}) {
  if (!messageContent) return;
  const { data } = messageContent;

  const thumbUrl = parseData(data as string)?.resource.thumbUrl;

  return (
    <>
      {messageContent.message !== "EMOTICON" && (
        <div className={styles.talkBubble}>
          <img src={defaultBubble} alt="" />
          <span className={styles.innerText}>
            {decryptData(messageContent.message as string)}
          </span>
        </div>
      )}
      <img
        className={styles.emoticon}
        src={`${BASE_URL}${thumbUrl}`}
        alt=""
        width={140}
        height={140}
      />
    </>
  );
}
