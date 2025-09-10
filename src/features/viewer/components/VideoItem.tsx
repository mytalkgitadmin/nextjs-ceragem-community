import { memo, useCallback, useRef, useEffect, useState } from 'react';
import Icons from '@/shared/ui/Icons';
import Loading from '@/shared/ui/Loading';
import { ViewerItemData } from '../types';
import { getOriginalUrl, getThumbnailUrl } from '../utils/mediaUtils';
import styles from '../Viewer.module.scss';

interface VideoItemProps {
  item: ViewerItemData;
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

  // 현재 활성 비디오가 아닐 때 일시정지
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

  // 썸네일 이미지 로드 완료
  const handleThumbnailLoad = useCallback(() => {
    setThumbnailLoaded(true);
  }, []);

  // 썸네일 이미지 로드 에러
  const handleThumbnailError = useCallback(() => {
    setThumbnailError(true);
  }, []);

  // 포스터 클릭 시 비디오 재생
  const handlePosterClick = useCallback(() => {
    if (videoRef.current) {
      setShowPoster(false);
      setVideoStarted(true);
      videoRef.current.play().catch((error) => {
        console.error('비디오 재생 실패:', error);
        // 재생 실패 시 포스터 다시 보이기
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
          {/* 클릭 가능한 비디오 썸네일/포스터 */}
          {shouldShowPoster && (
            <div
              className={styles.videoPoster}
              onClick={handlePosterClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
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
                      transition: 'opacity 0.2s ease',
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
            preload={Math.abs(index - currentIndex) <= 1 ? 'metadata' : 'none'}
            onLoadedData={handleLoadedData}
            onError={handleError}
            onPlay={handlePlay}
            playsInline
            style={{
              display: shouldShowPoster ? 'none' : 'block',
            }}
          />

          {/* 로딩 인디케이터 - 썸네일이 로드되지 않았을 때만 표시 */}
          {shouldShowLoading && (
            <div className={styles.loading}>
              <Loading size={32} />
            </div>
          )}

          {/* 비디오 로딩 중 (재생 시작 후) */}
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
