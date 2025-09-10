"use client";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import ProtectedHeader from "./ProtectedHeader";

import styles from "./ProtectedLayout.module.scss";
import MobileHeader from "./MobileHeader";
import { usePathname } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery(500);
  const pathname = usePathname();
  const renderHeader = () => {
    if (isMobile && pathname === "/chat") {
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
