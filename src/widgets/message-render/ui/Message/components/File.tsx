import { MessageInData } from "../../../../features/attachment-upload/ui/InputBox/types";

import styles from "./FileMessage.module.scss";
import { FileCard } from "@/entities/attachment";

export default function File({
  messageInData,
}: {
  messageInData: MessageInData;
}) {
  if (!messageInData) return;

  const { fileType, originalUrl, originalFileName, originalFileSize } =
    messageInData;

  return (
    <div className={styles.file}>
      <FileCard
        fileType={fileType}
        url={originalUrl}
        originalFileName={originalFileName}
        fileSize={originalFileSize}
      />
    </div>
  );
}
