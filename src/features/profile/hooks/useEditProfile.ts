import { useAuth } from "../../auth";

import { useCallback, useEffect, useState } from "react";
import { FILE_INPUT_CONFIG } from "../../chat/ui/Input/constants";
import { ProfileImage } from "../../chat/model";
import { ProfileTextData } from "../types";
import { useProfileUpdate } from "./useProfileUpdate";

export default function useEditProfile() {
  const { userProfile } = useAuth();
  const { updateText, updateImage, updateEmoticon, isLoading } =
    useProfileUpdate();

  // 프로필 이미지 상태(이모티콘/업로드 파일)
  const [profileImage, setProfileImage] = useState<ProfileImage>({
    emoticonId: 0,
    profileId: 0,
    profileKind: "normal",
    profileOrigin: "",
    profileOriginal: "",
    profileSmallThumbnail: "",
    profileThumbnail: "",
  });

  // 사용자가 직접 업로드한 이미지 파일
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 초기화: 기존 프로필 정보 로드
  useEffect(() => {
    if (userProfile?.profile) {
      setProfileImage({
        emoticonId: userProfile.profile.emoticonId || 0,
        profileId: userProfile.profile.profileId || 0,
        profileKind: userProfile.profile.profileKind || "normal",
        profileOrigin: userProfile.profile.profileOrigin || "",
        profileOriginal: userProfile.profile.profileOriginal || "",
        profileSmallThumbnail: userProfile.profile.profileSmallThumbnail || "",
        profileThumbnail: userProfile.profile.profileThumbnail || "",
      });
    }
  }, [userProfile]);

  const checkImageChange = useCallback((): boolean => {
    if (selectedFile) {
      return true;
    }

    const emoticonChanged =
      profileImage.profileKind === "emoticon" &&
      profileImage.emoticonId !== userProfile?.profile?.emoticonId &&
      profileImage.emoticonId > 0;

    const fileUploaded = profileImage.profileKind === "normal" && selectedFile;

    return !!(emoticonChanged || fileUploaded);
  }, [profileImage, selectedFile, userProfile]);

  // 🎯 파일 유효성 검사
  const validateFile = useCallback((file: File): string | null => {
    if (file.size > FILE_INPUT_CONFIG.LIMIT.MAX_FILE_SIZE) {
      return "파일 크기가 너무 큽니다. 10MB 이하의 파일을 선택해주세요.";
    }

    if (!file.type.startsWith("image/")) {
      return "이미지 파일만 업로드 가능합니다.";
    }

    return null;
  }, []);

  const handleImageFileSelect = useCallback(
    (file: File | null) => {
      if (!file) return;

      const error = validateFile(file);

      if (error) {
        alert(error);
        return;
      }

      setSelectedFile(file);
      setProfileImage((prev) => ({
        ...prev,
        profileKind: "normal",
        emoticonId: 0,
        profileOriginal: "",
        profileSmallThumbnail: "",
        profileThumbnail: "",
      }));
    },
    [validateFile]
  );

  const handleEmoticonSelect = useCallback((emoticonId: number) => {
    setSelectedFile(null);
    setProfileImage((prev) => ({
      ...prev,
      profileKind: "emoticon",
      emoticonId,
      profileOriginal: "",
      profileSmallThumbnail: "",
      profileThumbnail: "",
    }));
  }, []);

  const updateProfile = useCallback(
    async (textData: ProfileTextData) => {
      try {
        // 1. 텍스트 업데이트
        if (Object.keys(textData).length > 0) {
          await updateText(textData);
        }

        // 2. 이미지 업데이트
        const hasImageChange = checkImageChange();

        if (hasImageChange) {
          if (selectedFile) {
            console.log("🏞️ 이미지!!");
            await updateImage({
              file: selectedFile,
              profileId: profileImage.profileId,
            });
          } else if (profileImage.profileKind === "emoticon") {
            console.log("😀 이모티콘!!");
            await updateEmoticon(profileImage);
          }
        }

        setSelectedFile(null);
      } catch (error) {
        console.error("프로필 업데이트 실패:", error);
        throw error;
      }
    },
    [
      profileImage,
      selectedFile,
      checkImageChange,
      updateText,
      updateImage,
      updateEmoticon,
    ]
  );

  const resetState = useCallback(() => {
    setSelectedFile(null);
    if (userProfile?.profile) {
      setProfileImage({
        emoticonId: userProfile.profile.emoticonId || 0,
        profileId: userProfile.profile.profileId || 0,
        profileKind: userProfile.profile.profileKind || "normal",
        profileOrigin: userProfile.profile.profileOrigin || "",
        profileOriginal: userProfile.profile.profileOriginal || "",
        profileSmallThumbnail: userProfile.profile.profileSmallThumbnail || "",
        profileThumbnail: userProfile.profile.profileThumbnail || "",
      });
    }
  }, [userProfile]);

  return {
    // 상태
    profileImage,
    selectedFile,
    userProfile,
    isLoading,

    // 액션
    setProfileImage,
    handleImageFileSelect,
    handleEmoticonSelect,
    updateProfile,
    resetState,

    // 유틸
    hasChanges: checkImageChange(),
  };
}
