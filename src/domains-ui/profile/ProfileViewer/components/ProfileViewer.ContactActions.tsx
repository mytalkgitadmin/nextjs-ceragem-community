import React from "react";

interface ProfileViewerContactActionsProps {
  onCameraClick: () => void;
  onEditClick: () => void;
}

export const ProfileViewerContactActions: React.FC<
  ProfileViewerContactActionsProps
> = ({ onCameraClick, onEditClick }) => {
  return (
    <div className="flex justify-center space-x-12 py-6 bg-gray-50">
      <button
        onClick={onCameraClick}
        className="flex flex-col items-center space-y-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
          📷
        </div>
        <span className="text-sm font-medium">사진촬가</span>
      </button>

      <button
        onClick={onEditClick}
        className="flex flex-col items-center space-y-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
          👤
        </div>
        <span className="text-sm font-medium">프로필 수정</span>
      </button>
    </div>
  );
};
