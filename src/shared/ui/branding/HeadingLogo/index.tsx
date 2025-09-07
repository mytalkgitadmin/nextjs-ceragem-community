import styles from "./index.module.scss";

export default function HeadingLogo() {
  return (
    <h1 className={styles.logo}>
      <img src="/logo_feta.png" alt="FETA" />
    </h1>
  );
}
