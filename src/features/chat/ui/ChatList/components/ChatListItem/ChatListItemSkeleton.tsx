import styles from './ChatListItem.module.scss';

export default function ChatListItemSkeleton() {
  return (
    <div className={`${styles.item} ${styles.skeleton}`}>
      <div className={styles.flexWrap}>
        {/* 프로필 */}
        <div className={styles.circle}></div>

        <div className={styles.texts}>
          {/* 제목 */}
          <div className={styles.title}></div>

          {/* 메시지 */}
          <div className={styles.lastMsg}></div>
        </div>

        {/* 날짜 */}
        <div className={styles.date}></div>
      </div>
    </div>
  );
}
