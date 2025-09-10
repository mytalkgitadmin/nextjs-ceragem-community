import { Fragment, memo, useMemo } from 'react';
import styles from './ProfileGallery.module.scss';
import { ProfileGalleryProps } from '../../../types/viewer.types';

import { VideoThumbnail } from '@/shared/ui/VideoThumbnail';
import { getMediaType } from '@/features/viewer/utils/mediaUtils';

const ProfileGallery = memo<ProfileGalleryProps>(
  ({ histories, onImageClick }) => {
    // 갤러리에 표시할 히스토리 (최대 3개)
    const displayHistories = useMemo(() => histories.slice(0, 3), [histories]);

    // 더보기 버튼 표시 여부
    const showMoreButton = useMemo(
      () => histories.length > 3,
      [histories.length],
    );

    // 히스토리가 1개 이하면 갤러리를 표시하지 않음
    if (!histories || histories.length <= 1) return null;

    return (
      <div className={styles.gallery}>
        <h3 className={styles.title}>
          프로필 갤러리 <span>{histories.length}</span>
        </h3>

        <div className={styles.profileList}>
          {displayHistories.map((history, index) => {
            const mediaType = getMediaType(history);

            return (
              <Fragment key={`history-${history.historyId}`}>
                {mediaType === 'video' ? (
                  <VideoThumbnail
                    url={history.processedImageUrl}
                    onClick={() => onImageClick(index)}
                    type="gallery"
                  />
                ) : (
                  <img
                    src={history.processedImageUrl}
                    alt=""
                    onClick={() => onImageClick(index)}
                  />
                )}
              </Fragment>
            );
          })}

          {showMoreButton && (
            <button type="button" onClick={() => onImageClick(3)}>
              {histories.length - 3}+
            </button>
          )}
        </div>
      </div>
    );
  },
);

ProfileGallery.displayName = 'ProfileGallery';
export default ProfileGallery;
