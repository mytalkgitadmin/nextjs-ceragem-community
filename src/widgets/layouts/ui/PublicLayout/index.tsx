import { HeadingLogo } from "@/shared/ui/branding";
import styles from "./index.module.scss";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.default_layout}>
      <header className={styles.header}>
        <div className="max-width">
          <HeadingLogo />
        </div>
      </header>
      <div className={styles.layout_content}>{children}</div>
    </div>
  );
}
