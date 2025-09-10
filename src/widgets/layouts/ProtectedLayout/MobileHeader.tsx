import { memo } from "react";

import Link from "next/link";

import Icon from "@/shared/ui/Icons";
import { useAuth } from "@/features/auth/hooks/useAuth";
import UnreadChatBadge from "@/features/chat/ui/UnreadChatBadge/UnreadChatBadge";

import styles from "./ProtectedHeader.module.scss";
import { HeadingLogo } from "@/shared/ui/HeadingLogo";

function MobileHeader() {
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <header className={styles.mobileHeader}>
      <div className={styles.inner}>
        <div className={styles.flexWrap}>
          <HeadingLogo />

          <Link href="/friends">
            <Icon name="users" />
            <span className="a11y-hidden">친구</span>
            {isAuthenticated && (
              <UnreadChatBadge type="friend" className={styles.unreadBadge} />
            )}
          </Link>

          <Link href="/chat-list">
            <Icon name="message" />
            <span className="a11y-hidden">대화</span>
            {isAuthenticated && (
              <UnreadChatBadge type="message" className={styles.unreadBadge} />
            )}
          </Link>
        </div>

        <div className={styles.flexWrap}>
          <button type="button" onClick={handleLogout}>
            <Icon name="logout" color={"var(--text1)"} />
            <span className="a11y-hidden">로그아웃</span>
          </button>

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
