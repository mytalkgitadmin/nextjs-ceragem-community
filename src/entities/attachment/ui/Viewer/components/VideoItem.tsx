"use client";

import { memo, useCallback, useRef, useEffect, useState } from "react";
import { Icons } from "@/shared/ui/icon";
import { Loading } from "@/shared/ui/media";
import { MediaItem } from "../../../model";
import { getOriginalUrl, getThumbnailUrl } from "../../../lib/media";
import styles from "../index.module.scss";

interface VideoItemProps {
  item: MediaItem;
  index: number;
  currentIndex: number;
  mediaState: { loaded: boolean; error: boolean };
  onLoad: () => void;
  onError: () => void;
}

function VideoItem({
  item,
  index,
  currentIndex,
  mediaState,
  onLoad,
  onError,
}: VideoItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPoster, setShowPoster] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    if (index !== currentIndex) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setShowPoster(true);
      setVideoStarted(false);
    }
  }, [index, currentIndex]);

  const handleLoadedData = useCallback(() => {
    onLoad();
  }, [onLoad]);
  const handleError = useCallback(() => {
    onError();
  }, [onError]);
  const handlePlay = useCallback(() => {
    setShowPoster(false);
    setVideoStarted(true);
  }, []);
  const handleThumbnailLoad = useCallback(() => {
    setThumbnailLoaded(true);
  }, []);
  const handleThumbnailError = useCallback(() => {
    setThumbnailError(true);
  }, []);
  const handlePosterClick = useCallback(() => {
    if (videoRef.current) {
      setShowPoster(false);
      setVideoStarted(true);
      videoRef.current.play().catch((error) => {
        console.error("비디오 재생 실패:", error);
        setShowPoster(true);
        setVideoStarted(false);
      });
    }
  }, []);

  const shouldShowPoster = showPoster && !videoStarted;
  const shouldShowLoading =
    shouldShowPoster && !thumbnailLoaded && !thumbnailError;

  return (
    <>
      {mediaState.error ? (
        <div className={styles.error}>
          <Icons name="alert" />
          <p>비디오를 불러올 수 없습니다</p>
        </div>
      ) : (
        <div className={styles.videoContainer}>
          {shouldShowPoster && (
            <div
              className={styles.videoPoster}
              onClick={handlePosterClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handlePosterClick();
                }
              }}
            >
              {thumbnailError ? (
                <div className={styles.thumbnailError}>
                  <Icons name="alert" />
                  <p>썸네일을 불러올 수 없습니다</p>
                </div>
              ) : (
                <>
                  <img
                    src={getThumbnailUrl(item)}
                    alt={`비디오 ${index + 1} 썸네일`}
                    className={styles.posterImage}
                    onLoad={handleThumbnailLoad}
                    onError={handleThumbnailError}
                    style={{
                      opacity: thumbnailLoaded ? 1 : 0,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                  {thumbnailLoaded && (
                    <div className={styles.playButton}>
                      <Icons name="play" />
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <video
            ref={videoRef}
            src={getOriginalUrl(item)}
            className={styles.video}
            controls={!shouldShowPoster}
            preload={Math.abs(index - currentIndex) <= 1 ? "metadata" : "none"}
            onLoadedData={handleLoadedData}
            onError={handleError}
            onPlay={handlePlay}
            playsInline
            style={{ display: shouldShowPoster ? "none" : "block" }}
          />

          {shouldShowLoading && (
            <div className={styles.loading}>
              <Loading size={32} />
            </div>
          )}

          {!shouldShowPoster && !mediaState.loaded && !mediaState.error && (
            <div className={styles.videoLoading}>
              <Loading size={24} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default memo(VideoItem);
