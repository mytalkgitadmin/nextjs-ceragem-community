import Icons from '@/shared/ui/Icons';

import styles from './FilePreview.module.scss';
import { useFilePreview } from '../hooks';

interface FilePreviewProps {
  file: File;
  size?: number;
  className?: string;
}

export default function FilePreview({
  file,
  size = 48,
  className = '',
}: FilePreviewProps) {
  const preview = useFilePreview(file);

  if (!preview) {
    return (
      <div className={`${styles.preview} ${styles.nodata} ${className}`}>
        <Icons name="file" />
      </div>
    );
  }

  const { url, type } = preview;

  switch (type) {
    case 'image':
      return (
        <div className={`${styles.preview} ${styles.image} ${className}`}>
          <img
            src={url}
            alt=""
            onError={(e) => {
              // 이미지 로드 실패 시 기본 아이콘 표시
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement?.appendChild(document.createElement('div'));
            }}
          />
        </div>
      );
    case 'video':
      return (
        <div className={`${styles.preview} ${styles.video} ${className}`}>
          <video src={url} width={size} height={size} />
        </div>
      );
    case 'document':
      return (
        <div className={`${styles.preview} ${styles.document} ${className}`}>
          <Icons name="fileText" />
        </div>
      );
    default:
      return (
        <div className={`${styles.preview} ${className}`}>
          <Icons name="file" />
        </div>
      );
  }
}
