import { getApiBaseUrl } from "@/shared/api";
import { decryptData } from "@/entities/message/lib";
import styles from "./BubbleMessage.module.scss";
import { CoreMessageType } from "./FileMessage";
import { parseData } from "@/entities/message/lib";

export default function BubbleInner({
  messageContent,
}: {
  messageContent: CoreMessageType;
}) {
  if (!messageContent) return;
  const { data } = messageContent;

  const thumbUrl = parseData(data)?.resource.thumbUrl;

  return (
    <>
      {messageContent.message !== "EMOTICON" && (
        <div className={styles.talkBubble}>
          <img src="/assets/bubble/Emoji_Bubble_Type01.webp" alt="" />
          <span className={styles.innerText}>
            {decryptData(messageContent.message)}
          </span>
        </div>
      )}
      <img
        className={styles.emoticon}
        src={`${getApiBaseUrl()}${thumbUrl}`}
        alt=""
        width={140}
        height={140}
      />
    </>
  );
}
