import Link from "next/link";
import styles from "./HeadingLogo.module.scss";
export default function HeadingLogo() {
  return (
    <h1 className={styles.logo}>
      <Link href="/">
        <img src="/logo_feta.png" alt="FETA" />
      </Link>
    </h1>
  );
}
