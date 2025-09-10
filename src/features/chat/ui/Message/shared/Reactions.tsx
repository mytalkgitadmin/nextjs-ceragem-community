import { getEmojiUrl } from "@/shared/assets/emojiMap";
import styles from "./Reactions.module.scss";

type Reaction = Record<string, unknown>; // 단순화된 Reaction 타입

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
            src={getEmojiUrl(reaction?.key as string)}
            alt={`${reaction?.key as string} 이모지`}
            className={styles.emoji}
            onError={(e) => {
              (e.target as HTMLImageElement).src = getEmojiUrl("default");
            }}
          />
          {(reaction?.count as number) > 0 && (
            <span className={styles.count}>{reaction?.count as number}</span>
          )}
        </button>
      ))}
    </div>
  );
}
