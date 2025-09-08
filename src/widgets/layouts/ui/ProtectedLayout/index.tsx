// import { useMediaQuery } from "@/shared/ui/hooks/useMediaQuery";
// import WebHeader from "./components/WebHeader";

import styles from "./index.module.scss";
import MobileHeader from "./components/MobileHeader";
// import { usePathname } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.layoutWrap} ${styles.mobile}`}>
      <MobileHeader />
      {children}
    </div>
  );
}
