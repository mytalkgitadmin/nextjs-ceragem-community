import { memo } from "react";
import { Icons as Icon } from "@/shared/ui/icon";
import styles from "./MobileHeader.module.scss";
import {
  UnreadMessageBadge,
  FriendRequestBadge,
} from "@/features/notification-count";

import Link from "next/link";

function MobileHeader() {
  return (
    <header className={styles.mobileHeader}>
      <div className={styles.inner}>
        <div className={styles.flexWrap}>
          {/* <HeadingLogo /> */}

          <Link href="/friends">
            <Icon name="users" />
            <span className="a11y-hidden">친구</span>
            <FriendRequestBadge />
          </Link>

          <Link href="/chat-list">
            <Icon name="message" />
            <span className="a11y-hidden">대화</span>
            <UnreadMessageBadge />
          </Link>
        </div>

        <div className={styles.flexWrap}>
          <Link href="/setting">
            <Icon name="settings" color={"var(--text1)"} />
            <span className="a11y-hidden">설정</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default memo(MobileHeader);
