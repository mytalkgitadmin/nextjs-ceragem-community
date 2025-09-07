import { memo } from "react";

import { Icons as Icon } from "@/shared/ui/icon";
import { HeadingLogo } from "@/shared/ui/branding/HeadingLogo";

import styles from "./ProtectedHeader.module.scss";

function ProtectedHeader() {
  const authButton = null;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.flexWrap}>
          <HeadingLogo />

          <Icon name="users" />
          <span className="a11y-hidden">친구</span>

          <Icon name="message" />
          <span className="a11y-hidden">대화</span>
        </div>

        <div className={styles.flexWrap}>
          {authButton}
          <Icon name="settings" color={"var(--text1)"} />
          <span className="a11y-hidden">설정</span>
        </div>
      </div>
    </header>
  );
}

export default memo(ProtectedHeader);
