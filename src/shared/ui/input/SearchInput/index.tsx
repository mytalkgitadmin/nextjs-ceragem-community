import { Input } from "@/shared/ui/input";
import { Icons } from "@/shared/ui/icon";
import styles from "./index.module.scss";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "검색",
  className,
}: SearchInputProps) {
  return (
    <div className={`${styles.searchWrap} ${className || ""}`}>
      <Icons name="search" className={styles.searchIcon} />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
      {value && (
        <button onClick={() => onChange("")} className={styles.clearBtn}>
          <Icons name="x" />
        </button>
      )}
    </div>
  );
}
