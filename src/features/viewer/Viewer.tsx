import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

import Icons from '@/shared/ui/Icons';
import { Button } from '@/shared/ui/button';
import { CarouselApi } from '@/shared/ui/carousel';

import { MediaViewerProps } from './types';

import {
  getOriginalUrl,
  isDownloadable,
  getFileName,
} from './utils/mediaUtils';

import styles from './Viewer.module.scss';
import ViewerContent from './components/ViewerContent';

export default function Viewer({
  open,
  onOpenChange,
  data,
  initialIndex = 0,
}: MediaViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [api, setApi] = useState<CarouselApi>();

  // 뷰어 열릴 때 초기 인덱스 설정
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  // 현재 인덱스가 변경될 때 API로 이동
  useEffect(() => {
    if (api && currentIndex !== undefined) {
      api.scrollTo(currentIndex);
    }
  }, [api, currentIndex]);

  const safeCurrentIndex = Math.max(0, Math.min(currentIndex, data.length - 1));
  const currentItem = data[safeCurrentIndex];

  // 다운로드 핸들러
  const handleDownload = () => {
    if (!currentItem || !isDownloadable(currentItem)) return;

    const link = document.createElement('a');
    link.href = `${getOriginalUrl(currentItem)}?attachment=true`;
    // attachment=true: 다운로드 false: 브라우저에서 직접 열림
    link.download = getFileName(currentItem);
    link.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.dialog}>
        <DialogHeader className={styles.header}>
          <DialogTitle className="sr-only">
            {getFileName(currentItem)}
          </DialogTitle>

          <DialogDescription>
            <Button
              className={styles.download}
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              disabled={!isDownloadable(currentItem)}
              title={isDownloadable(currentItem) ? '다운로드' : '다운로드 불가'}
            >
              <Icons name="download" />
              <span className="sr-only">다운로드</span>
            </Button>
          </DialogDescription>
        </DialogHeader>

        <ViewerContent
          data={data}
          currentIndex={safeCurrentIndex}
          onIndexChange={setCurrentIndex}
          api={api}
          setApi={setApi}
        />

        <DialogFooter className={styles.footer}>
          {data.length > 1 && (
            <>
              {/* 인디케이터 점들 (10개 이하일 때만 표시) */}
              {data.length <= 10 && (
                <div className={styles.paging}>
                  {data.map((_, index) => (
                    <button
                      key={index}
                      className={
                        index === safeCurrentIndex ? styles.active : ''
                      }
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`미디어 ${index + 1}로 이동`}
                    />
                  ))}
                </div>
              )}

              <p>
                <strong>{safeCurrentIndex + 1}</strong>/{data.length}
              </p>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
