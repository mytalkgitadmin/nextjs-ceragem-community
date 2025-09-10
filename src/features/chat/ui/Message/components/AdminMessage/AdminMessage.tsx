import styles from './AdminMessage.module.scss';

export default function AdminMessage({ message }: { message: string }) {
  return <div className={styles.admin_message}>{message}</div>;
}
