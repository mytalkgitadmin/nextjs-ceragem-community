import Icons from '@/shared/ui/Icons';
import styles from './FileCard.module.scss';
import { formatBytes } from '../../lib';
import { BASE_URL } from '@/shared/api/endpoints';

export default function FileCard({
  fileType,
  url,
  originalFileName,
  fileSize,
}: {
  fileType: string;
  url: string;
  originalFileName: string;
  fileSize: number;
}) {
  const lastIndex = originalFileName?.lastIndexOf('.');
  const extension =
    lastIndex !== -1 ? originalFileName?.slice(lastIndex + 1) : '';
  const fileName =
    lastIndex !== -1 ? originalFileName?.slice(0, lastIndex) : originalFileName;

  return (
    <a className={styles.fileCard} href={`${BASE_URL}${url}`} download>
      <span className={styles.icon}>
        {fileType && fileType === 'audio' ? (
          <Icons name="mic" />
        ) : (
          <>
            {extension === 'txt' ? (
              <Icons name="fileTxt" />
            ) : extension === 'zip' ? (
              <Icons name="fileZip" />
            ) : extension === 'docx' ? (
              <Icons name="fileDocx" />
            ) : extension === 'doc' ? (
              <Icons name="fileDoc" />
            ) : extension === 'csv' ? (
              <Icons name="fileCsv" />
            ) : extension === 'pdf' ? (
              <Icons name="filePdf" />
            ) : extension === 'xls' ? (
              <Icons name="fileXls" />
            ) : extension === 'ppt' || extension === 'pptx' ? (
              <Icons name="filePpt" />
            ) : extension === 'mp3' ? (
              <Icons name="mic" />
            ) : (
              <Icons name="file" />
            )}
          </>
        )}
      </span>
      <span className={styles.textWrap}>
        <span className={styles.text}>
          <span className={styles.fileName}>{fileName}</span>
          <span className={styles.extension}>.{extension}</span>
        </span>
        <span className={styles.size}>
          {fileSize && <p>{formatBytes(fileSize)}</p>}
        </span>
      </span>
    </a>
  );
}
