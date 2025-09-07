import { useMediaQuery } from "@/shared/lib/useMediaQuery";
import ProtectedHeader from "./ProtectedHeader";

import styles from "./ProtectedLayout.module.scss";
import MobileHeader from "./MobileHeader";
import { useLocation } from "@tanstack/react-router";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery(500);
  const location = useLocation();
  const renderHeader = () => {
    if (isMobile && location.pathname === "/chat") {
      return null;
    }
    if (isMobile) {
      return <MobileHeader />;
    }
    return <ProtectedHeader />;
  };
  return (
    <div className={`${styles.layoutWrap} ${isMobile ? styles.mobile : ""}`}>
      {renderHeader()}
      {children}
    </div>
  );
}
