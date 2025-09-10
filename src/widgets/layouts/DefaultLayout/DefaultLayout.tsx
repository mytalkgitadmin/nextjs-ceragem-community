import DefaultHeader from './DefaultHeader';
import styles from './DefaultLayout.module.scss';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.default_layout}>
      <DefaultHeader />
      <div className={styles.layout_content}>{children}</div>
    </div>
  );
}
