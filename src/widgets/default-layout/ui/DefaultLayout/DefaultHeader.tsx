import { HeadingLogo } from "@/shared/ui/branding/HeadingLogo";

import styles from "./DefaultHeader.module.scss";

export default function DefaultHeader() {
  return (
    <header className={styles.header}>
      <div className="max-width">
        <HeadingLogo />
      </div>
    </header>
  );
}
