import { Fragment, memo, useMemo } from "react";
import styles from "./ProfileGallery.module.scss";
import { ProfileGalleryProps } from "../../../model/viewer.types";

import { VideoThumbnail } from "@/shared/ui/media";
import { getMediaType } from "@/entities/attachment/lib/media";

const ProfileGallery = memo<ProfileGalleryProps>(
  ({ histories, onImageClick }) => {
    const displayHistories = useMemo(() => histories.slice(0, 3), [histories]);
    const showMoreButton = useMemo(
      () => histories.length > 3,
      [histories.length]
    );

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
                {mediaType === "video" ? (
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
  }
);

ProfileGallery.displayName = "ProfileGallery";
export default ProfileGallery;
