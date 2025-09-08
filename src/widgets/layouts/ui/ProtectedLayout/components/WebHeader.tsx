import { memo, useMemo } from "react";

// import { Link } from "@tanstack/react-router";

// import { Icons as Icon } from "@/shared/ui/icon";
// import { HeadingLogo } from "@/shared/ui/branding";
// import { useAuth } from "@/features/auth/hooks/useAuth";
// import UnreadChatBadge from "@/features/chat/ui/UnreadChatBadge/UnreadChatBadge";

import styles from "./WebHeader.module.scss";

function WebHeader() {
  // const { isAuthenticated, handleLogout } = useAuth();

  // const authButton = useMemo(() => {
  //   if (isAuthenticated) {
  //     return (
  //       <button type="button" onClick={handleLogout}>
  //         <Icon name="logout" color={"var(--text1)"} />
  //         <span className="a11y-hidden">로그아웃</span>
  //       </button>
  //     );
  //   } else {
  //     return (
  //       <Link to="/login">
  //         <Icon name="user" color={"var(--text1)"} />
  //         <span className="a11y-hidden">로그인</span>
  //       </Link>
  //     );
  //   }
  // }, [isAuthenticated, handleLogout]);

  return (
    <></>
    // <header className={styles.header}>
    //   <div className={styles.inner}>
    //     <div className={styles.flexWrap}>
    //       <HeadingLogo />

    //       <Link to="/friends">
    //         <Icon name="users" />
    //         <span className="a11y-hidden">친구</span>
    //         {isAuthenticated && (
    //           <UnreadChatBadge type="friend" className={styles.unreadBadge} />
    //         )}
    //       </Link>

    //       <Link to="/chat">
    //         <Icon name="message" />
    //         <span className="a11y-hidden">대화</span>
    //         {isAuthenticated && (
    //           <UnreadChatBadge type="message" className={styles.unreadBadge} />
    //         )}
    //       </Link>
    //     </div>

    //     <div className={styles.flexWrap}>
    //       {authButton}

    //       <Link to="/setting">
    //         <Icon name="settings" color={"var(--text1)"} />
    //         <span className="a11y-hidden">설정</span>
    //       </Link>
    //     </div>
    //   </div>
    // </header>
  );
}

export default memo(WebHeader);
