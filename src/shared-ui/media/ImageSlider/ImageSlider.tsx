import React from "react";
import { useSwipeGesture } from "@/shared-ui/hooks";

interface ImageSliderProps {
  images: string[];
  currentIndex: number;
  onSlideChange: (index: number) => void;
  showArrows?: boolean;
  className?: string;
  imageClassName?: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  currentIndex,
  onSlideChange,
  showArrows = true,
  className = "",
  imageClassName = "",
}) => {
  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onSlideChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onSlideChange(newIndex);
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      handleNext();
    } else {
      handlePrevious();
    }
  };

  const { getSwipeProps, getTransform, getTransition } = useSwipeGesture({
    onSwipe: handleSwipe,
  });

  const baseTransform = `-${currentIndex * 100}%`;
  const transformStyle = {
    transform: getTransform(`translateX(${baseTransform})`),
    transition: getTransition(),
  };

  return (
    <div
      className={`w-full h-full overflow-hidden relative bg-gray-100 cursor-grab active:cursor-grabbing ${className}`}
      {...getSwipeProps()}
    >
      <div className="flex h-full w-full" style={transformStyle}>
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 flex items-center justify-center"
          >
            {image ? (
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className={`max-w-full max-h-full object-contain ${imageClassName}`}
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <div className="text-sm">이미지 없음</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 좌우 화살표 */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors"
          >
            →
          </button>
        </>
      )}
    </div>
  );
};
