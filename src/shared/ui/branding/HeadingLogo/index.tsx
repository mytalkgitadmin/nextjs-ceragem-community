import styles from "./index.module.scss";
import Link from "next/link";

export default function HeadingLogo() {
  return (
    <h1 className={styles.logo}>
      <Link href="/features">
        <img src="/logo_feta.png" alt="FETA" />
      </Link>
    </h1>
  );
}
