import { DATE_FORMATS, formatDate } from '@/shared/lib/dateFormatter';
import styles from './NotificationCard.module.scss';
import { Notification } from '@/features/notifications/model';
import Icons from '@/shared/ui/Icons';
import { useDeleteNoti, useMarkNotiAsRead } from '@/features/notifications/api';
import { useUIStore } from '@/shared/store/useUIStore';

export default function NotificationCard({ noti }: { noti: Notification }) {
  const { openAlertDialog } = useUIStore();
  const markAsReadMutation = useMarkNotiAsRead();
  const deleteNotiMutation = useDeleteNoti();

  const handleMarkAsRead = () => {
    markAsReadMutation.mutate({
      notificationId: noti.id,
      category: 'FRIEND_REQUEST',
    });
  };

  const handleDeleteClick = () => {
    openAlertDialog({
      title: '삭제',
      description: '알림을 삭제하시겠습니까?',
      confirmText: '삭제',
      onConfirm: () => {
        deleteNotiMutation.mutate({
          notificationId: noti.id,
          category: 'FRIEND_REQUEST',
        });
      },
    });
  };

  return (
    <li
      key={noti.id}
      className={`${styles.notiCard} ${noti.isRead ? styles.read : styles.unread}`}
    >
      <div className={styles.contents}>
        <p className={styles.notiTitle}>{noti.title}</p>
        <p className={styles.notiMessage}>{noti.message}</p>
        <p className={styles.notiDate}>
          {formatDate(noti.createdDate, DATE_FORMATS.DOT)}
        </p>
      </div>

      <div className={styles.buttons}>
        {!noti.isRead && (
          <button
            type="button"
            onClick={handleMarkAsRead}
            disabled={markAsReadMutation.isPending}
          >
            <Icons name="check" />
          </button>
        )}
        <button
          type="button"
          onClick={handleDeleteClick}
          disabled={deleteNotiMutation.isPending}
        >
          <Icons name="x" />
        </button>
      </div>
    </li>
  );
}
