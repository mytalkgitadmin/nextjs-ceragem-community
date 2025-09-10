// Pure VideoThumbnail component - removed BASE_URL dependency

import Icons from "../Icons";
import styles from "./VideoThumbnail.module.scss";

export interface VideoThumbnailProps {
  url: string;
  onClick: () => void;
  type?: "talk" | "gallery";
  baseUrl?: string; // BASE_URL을 props로 받음
}

export default function VideoThumbnail({
  url,
  onClick,
  type = "talk",
  baseUrl = "", // 기본값은 빈 문자열
}: VideoThumbnailProps) {
  const ratio = parseFloat(
    parseFloat(url?.split("sizeRate=")[1] || "1").toFixed(2)
  );

  // URL이 이미 절대 경로인지 확인
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

  return (
    <div className={`${styles.video} ${styles[type]}`}>
      <div className={styles.play}>
        <button type="button" onClick={onClick}>
          <Icons name="play" />
          <span className="a11y-hidden">재생</span>
        </button>
      </div>

      {url && (
        <img
          src={fullUrl}
          alt=""
          width={type === "talk" ? 300 : "auto"}
          height={type === "talk" ? 300 * ratio : "auto"}
        />
      )}
    </div>
  );
}
