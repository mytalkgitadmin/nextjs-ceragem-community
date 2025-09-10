import styles from "./OgCard.module.scss";

type OGMetaData = Record<string, unknown>; // 단순화된 OGMetaData 타입

export default function OgCard({ ogMetaData }: { ogMetaData: OGMetaData }) {
  if (!ogMetaData) return;
  return (
    <div className={styles.card}>
      <a href={(ogMetaData.url as string) || ""} target="_blank">
        {!!(ogMetaData.defaultImage as Record<string, unknown>)?.url && (
          <img
            src={
              (ogMetaData.defaultImage as Record<string, unknown>).url as string
            }
            alt=""
          />
        )}
        <div className={styles.content}>
          {!!ogMetaData.title && (
            <p className={styles.title}>{ogMetaData.title as string}</p>
          )}
          {!!ogMetaData.description && (
            <p className={styles.description}>
              {" "}
              {ogMetaData.description as string}
            </p>
          )}
          {!!ogMetaData.description && (
            <p className={styles.url}>{ogMetaData.url as string}</p>
          )}
        </div>
      </a>
    </div>
  );
}
