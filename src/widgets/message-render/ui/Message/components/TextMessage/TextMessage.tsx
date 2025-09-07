import TextInner from './TextInner';
import styles from './TextMessage.module.scss';

export default function TextMessage({ message }: { message: string }) {
  if (!message) return;

  return (
    <div className={`default ${styles.messageWrap}`}>
      <TextInner message={message} />
    </div>
  );
}
