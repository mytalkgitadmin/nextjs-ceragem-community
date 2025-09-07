import type { Reaction } from "@sendbird/chat/message";
import { getEmojiUrl } from "@/shared/lib/emoji-map";
import styles from "./Reactions.module.scss";

export default function Reactions({
  reactions,
  className,
}: {
  reactions: Reaction[];
  className?: string;
}) {
  return (
    <div className={`${styles.reactions} ${className}`}>
      {reactions.map((reaction, index) => (
        <button key={`reaction-${index}`} className={styles.reaction}>
          <img
            src={getEmojiUrl(reaction?.key)}
            alt={`${reaction?.key} 이모지`}
            className={styles.emoji}
            onError={(e) => {
              (e.target as HTMLImageElement).src = getEmojiUrl("default");
            }}
          />
          {reaction?.count > 0 && (
            <span className={styles.count}>{reaction?.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
