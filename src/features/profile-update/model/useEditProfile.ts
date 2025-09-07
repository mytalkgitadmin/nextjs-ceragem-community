import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/features/auth";
import { FILE_INPUT_CONFIG } from "@/shared/config/file-upload";
import { ProfileImg } from "@/entities/profile/model";
import { ProfileTextData } from "./types";
import { useProfileUpdate } from "./useProfileUpdate";

export default function useEditProfile() {
  const { userProfile } = useAuth();
  const { updateText, updateImage, updateEmoticon, isLoading } =
    useProfileUpdate();

  const [profileImage, setProfileImage] = useState<ProfileImg>({
    emoticonId: 0,
    profileId: 0,
    profileKind: "normal",
    profileOriginal: "",
    profileSmallThumbnail: "",
    profileThumbnail: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (userProfile?.profile) {
      setProfileImage({
        emoticonId: userProfile.profile.emoticonId || 0,
        profileId: userProfile.profile.profileId || 0,
        profileKind: userProfile.profile.profileKind || "normal",
        profileOriginal: userProfile.profile.profileOriginal || "",
        profileSmallThumbnail: userProfile.profile.profileSmallThumbnail || "",
        profileThumbnail: userProfile.profile.profileThumbnail || "",
      });
    }
  }, [userProfile]);

  const checkImageChange = useCallback((): boolean => {
    if (selectedFile) return true;
    const emoticonChanged =
      profileImage.profileKind === "emoticon" &&
      profileImage.emoticonId !== userProfile?.profile?.emoticonId &&
      profileImage.emoticonId > 0;
    const fileUploaded = profileImage.profileKind === "normal" && selectedFile;
    return !!(emoticonChanged || fileUploaded);
  }, [profileImage, selectedFile, userProfile]);

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
        if (Object.keys(textData).length > 0) {
          await updateText(textData);
        }
        const hasImageChange = checkImageChange();
        if (hasImageChange) {
          if (selectedFile) {
            await updateImage({
              file: selectedFile,
              profileId: profileImage.profileId,
            });
          } else if (profileImage.profileKind === "emoticon") {
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
        profileOriginal: userProfile.profile.profileOriginal || "",
        profileSmallThumbnail: userProfile.profile.profileSmallThumbnail || "",
        profileThumbnail: userProfile.profile.profileThumbnail || "",
      });
    }
  }, [userProfile]);

  return {
    profileImage,
    selectedFile,
    userProfile,
    isLoading,
    setProfileImage,
    handleImageFileSelect,
    handleEmoticonSelect,
    updateProfile,
    resetState,
    hasChanges: checkImageChange(),
  };
}
