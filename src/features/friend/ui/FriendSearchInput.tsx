import { Input } from '@/shared/ui/input';
import Icons from '@/shared/ui/Icons';
interface FriendSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}
import styles from './FriendSearchInput.module.scss';

export default function FriendSearchInput({
  value,
  onChange,
  placeholder = '검색',
  className,
}: FriendSearchInputProps) {
  return (
    <div className={`${styles.searchWrap} ${className || ''}`}>
      <Icons name="search" className={styles.searchIcon} />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
      {value && (
        <button onClick={() => onChange('')} className={styles.clearBtn}>
          <Icons name="x" />
        </button>
      )}
    </div>
  );
}
