import type { OGMetaData } from "@sendbird/chat/message";

import styles from "./OgCard.module.scss";
export default function OgCard({ ogMetaData }: { ogMetaData: OGMetaData }) {
  if (!ogMetaData) return;
  return (
    <div className={styles.card}>
      <a href={ogMetaData.url || ""} target="_blank">
        {ogMetaData.defaultImage?.url && (
          <img src={ogMetaData.defaultImage.url} alt="" />
        )}
        <div className={styles.content}>
          {ogMetaData.title && (
            <p className={styles.title}>{ogMetaData.title}</p>
          )}
          {ogMetaData.description && (
            <p className={styles.description}> {ogMetaData.description}</p>
          )}
          {ogMetaData.description && (
            <p className={styles.url}>{ogMetaData.url}</p>
          )}
        </div>
      </a>
    </div>
  );
}
