import styles from './BubbleMessage.module.scss';
import BubbleInner from './BubbleInner';
import { CoreMessageType } from '../FileMessage/FileMessage';
export default function BubbleMessage({
  messageContent,
}: {
  messageContent: CoreMessageType;
}) {
  if (!messageContent) return;

  return (
    <div className={`bubble ${styles.messageWrap}`}>
      <BubbleInner messageContent={messageContent} />
    </div>
  );
}
