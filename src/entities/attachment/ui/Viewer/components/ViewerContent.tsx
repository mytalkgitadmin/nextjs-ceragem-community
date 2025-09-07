"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { ViewerContentProps } from "../../../model";
import { getMediaType } from "../../../lib/media";

import styles from "../index.module.scss";
import VideoItem from "./VideoItem";
import ImageItem from "./ImageItem";

export default function ViewerContent({
  data,
  currentIndex,
  onIndexChange,
  api,
  setApi,
}: ViewerContentProps) {
  const [mediaStates, setMediaStates] = useState<{
    [key: number]: { loaded: boolean; error: boolean };
  }>({});

  useEffect(() => {
    if (!api) return;
    const handleSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      onIndexChange(selectedIndex);
    };
    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, onIndexChange]);

  const handleMediaLoad = useCallback((index: number) => {
    setMediaStates((prev) => {
      if (prev[index]?.loaded) return prev;
      return { ...prev, [index]: { loaded: true, error: false } };
    });
  }, []);
  const handleMediaError = useCallback((index: number) => {
    setMediaStates((prev) => {
      if (prev[index]?.error) return prev;
      return { ...prev, [index]: { loaded: false, error: true } };
    });
  }, []);

  const getMediaState = useCallback(
    (index: number) => {
      return mediaStates[index] || { loaded: false, error: false };
    },
    [mediaStates]
  );

  return (
    <div className={styles.viewerContainer}>
      <Carousel
        setApi={setApi}
        className={styles.carousel}
        opts={{ startIndex: currentIndex, loop: true }}
      >
        <CarouselContent className={styles.carouselContent}>
          {data.map((item, index) => {
            const mediaType = getMediaType(item);
            const mediaState = getMediaState(index);
            return (
              <CarouselItem key={index} className={styles.carouselItem}>
                {mediaType === "image" ? (
                  <ImageItem
                    item={item}
                    index={index}
                    currentIndex={currentIndex}
                    mediaState={mediaState}
                    onLoad={() => handleMediaLoad(index)}
                    onError={() => handleMediaError(index)}
                  />
                ) : (
                  <VideoItem
                    item={item}
                    index={index}
                    currentIndex={currentIndex}
                    mediaState={mediaState}
                    onLoad={() => handleMediaLoad(index)}
                    onError={() => handleMediaError(index)}
                  />
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {data.length > 1 && (
          <>
            <CarouselPrevious className={styles.prevBtn} />
            <CarouselNext className={styles.nextBtn} />
          </>
        )}
      </Carousel>
    </div>
  );
}
