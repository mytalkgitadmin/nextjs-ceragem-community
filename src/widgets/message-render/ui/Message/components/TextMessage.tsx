import styles from "./TextMessage.module.scss";
import LongMessage from "./LongMessage";
import { checkEditMessage, decryptData } from "@/shared/lib/chat";

export default function TextMessage({ message }: { message: string }) {
  if (!message) return;
  const { convertMessage } = checkEditMessage(decryptData(message));
  return (
    <div className={`default ${styles.messageWrap}`}>
      {convertMessage.length > 200 ? (
        <LongMessage message={convertMessage} />
      ) : (
        <p>{convertMessage}</p>
      )}
    </div>
  );
}
