import { memo } from 'react';
import Icons from '@/shared/ui/Icons';
import Loading from '@/shared/ui/Loading';
import { ViewerItemData } from '../types';
import { getOriginalUrl } from '../utils/mediaUtils';
import styles from '../Viewer.module.scss';

interface ImageItemProps {
  item: ViewerItemData;
  index: number;
  currentIndex: number;
  mediaState: { loaded: boolean; error: boolean };
  onLoad: () => void;
  onError: () => void;
}

function ImageItem({
  item,
  index,
  currentIndex,
  mediaState,
  onLoad,
  onError,
}: ImageItemProps) {
  return (
    <>
      {mediaState.error ? (
        <div className={styles.error}>
          <Icons name="alert" />
          <p>이미지를 불러올 수 없습니다</p>
        </div>
      ) : (
        <>
          <img
            src={getOriginalUrl(item)}
            alt={`이미지 ${index + 1}`}
            className={styles.image}
            loading={Math.abs(index - currentIndex) <= 1 ? 'eager' : 'lazy'}
            onLoad={onLoad}
            onError={onError}
          />

          {!mediaState.loaded && !mediaState.error && (
            <div className={styles.loading}>
              <Loading size={32} />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default memo(ImageItem);
