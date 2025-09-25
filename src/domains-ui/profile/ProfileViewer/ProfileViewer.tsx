"use client";

import React, { useState } from "react";
import { ImageSlider, SliderIndicator } from "@/shared-ui";
import {
  ProfileViewerContactActions,
  ProfileViewerCoachActions,
} from "./components";

interface ProfileViewerProps {
  type: "contact" | "coach-connect";
  onCoachConnect?: () => void;
}

export const ProfileViewer: React.FC<ProfileViewerProps> = ({
  type,
  onCoachConnect,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/assets/images/profile/bemily_profile001.png",
    "/assets/images/profile/bemily_profile002.png",
    "/assets/images/profile/bemily_profile003.png",
    "/assets/images/profile/bemily_profile004.png",
    "/assets/images/profile/bemily_profile005.png",
    "/assets/images/profile/bemily_profile006.png",
  ];

  const handleImageChange = (index: number) => {
    setCurrentIndex(index);
  };
  const user = {
    name: "John Doe",
    description: "This is a description",
  };

  return (
    <div className="flex flex-col h-full  bg-white">
      {/* 이미지 슬라이더 영역 */}
      <div className="flex-1 relative">
        <ImageSlider
          images={images}
          currentIndex={currentIndex}
          onSlideChange={handleImageChange}
        />

        {/* 슬라이더 인디케이터 */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <SliderIndicator
              total={images.length}
              current={currentIndex}
              onIndicatorClick={handleImageChange}
            />
          </div>
        )}
      </div>

      {/* 사용자 정보 영역 */}
      <div className="px-6 py-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {user.name}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {user.description}
        </p>
      </div>

      {/* 액션 버튼 영역 */}
      {type === "contact" && (
        <ProfileViewerContactActions
          onCameraClick={() => {}}
          onEditClick={() => {}}
        />
      )}
      {type === "coach-connect" && (
        <ProfileViewerCoachActions onConnect={onCoachConnect} />
      )}
    </div>
  );
};
