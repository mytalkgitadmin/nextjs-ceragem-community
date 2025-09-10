import Link from "next/link";
import styles from "./FeaturesPage.module.scss";
import { useMobileDevice } from "@/shared/hooks/useMobileDevice";
import { DefaultLayout } from "@/widgets/layouts/DefaultLayout";
export default function Features() {
  const { isMobile, isIOS, isAndroid, appStoreUrl } = useMobileDevice();

  return (
    <DefaultLayout>
      <main className={`max-width ${styles.features}`}>
        <div className={styles.mainText}>
          <p className={styles.title}>
            <img src="/logo_feta.png" alt="" />
            FETA
          </p>
          <p className={styles.contents}>
            더 가까이, 더 깊이, 우리들의 연결고리<span></span>소중한 사람들과
            더욱 특별하게 연결되는
            <strong>프라이빗 메신저</strong>
          </p>
        </div>

        <div className={styles.btn_group}>
          {isMobile && (
            <a href={appStoreUrl} target="_blank">
              {isIOS ? "Apple App Store" : isAndroid ? "Google Play" : null}
            </a>
          )}

          <Link href="/friends" className={styles.btn_web}>
            웹 브라우저에서 FETA 열기
          </Link>
        </div>
      </main>
    </DefaultLayout>
  );
}
