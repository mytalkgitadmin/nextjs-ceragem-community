"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/overlays";

import { Icons } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/button";
import { CarouselApi } from "@/shared/ui/carousel";

import { MediaViewerProps } from "../../model";
import { getOriginalUrl, isDownloadable, getFileName } from "../../lib/media";

import styles from "./index.module.scss";
import ViewerContent from "./components/ViewerContent";

export default function Viewer({
  open,
  onOpenChange,
  data,
  initialIndex = 0,
}: MediaViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  useEffect(() => {
    if (api && currentIndex !== undefined) {
      api.scrollTo(currentIndex);
    }
  }, [api, currentIndex]);

  const safeCurrentIndex = Math.max(0, Math.min(currentIndex, data.length - 1));
  const currentItem = data[safeCurrentIndex];

  const handleDownload = () => {
    if (!currentItem || !isDownloadable(currentItem)) return;

    const link = document.createElement("a");
    link.href = `${getOriginalUrl(currentItem)}?attachment=true`;
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
              title={isDownloadable(currentItem) ? "다운로드" : "다운로드 불가"}
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
              {data.length <= 10 && (
                <div className={styles.paging}>
                  {data.map((_, index) => (
                    <button
                      key={index}
                      className={
                        index === safeCurrentIndex ? styles.active : ""
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
