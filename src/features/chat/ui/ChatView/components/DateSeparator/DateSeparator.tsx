import { DATE_FORMATS, formatDate } from '@/shared/lib/dateFormatter';
import styles from './DateSeparator.module.scss';

export default function DateSeparator({ createdAt }: { createdAt: number }) {
  return (
    <div className={styles.separator}>
      {formatDate(createdAt, DATE_FORMATS.YEAR_MONTH_DAY_WEEKDAY)}
    </div>
  );
}
