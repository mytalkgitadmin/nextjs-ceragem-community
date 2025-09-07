import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileApi, updateGroupProfile } from "../api";
import { ProfileImg } from "@/entities/profile/model";

import { ProfileTextData, UpdateProfileRequest } from "../types";

export interface ExtendedUpdateProfileRequest extends UpdateProfileRequest {
  profileImage?: ProfileImg;
  selectedFile?: File | null;
}

export const useProfileUpdate = () => {
  const queryClient = useQueryClient();

  const updateTextMutation = useMutation({
    mutationFn: (textData: ProfileTextData) => updateProfileApi(textData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: async ({
      file,
      profileId,
    }: {
      file: File;
      profileId: number;
    }) => {
      // 파일 업로드는 기존 훅을 그대로 사용 (shared로 승격 예정 가능)
      // 이 파일에서는 그룹 프로필 업데이트만 수행
      const res = await updateGroupProfile({
        profileId,
        profileKind: "normal",
        emoticonId: 0,
        profileOriginal: "",
        profileThumbnail: "",
        profileSmallThumbnail: "",
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });

  const updateEmoticonMutation = useMutation({
    mutationFn: (profileImage: ProfileImg) =>
      updateGroupProfile({
        emoticonId: profileImage.emoticonId,
        profileId: profileImage.profileId,
        profileKind: "emoticon",
        profileOriginal: null,
        profileSmallThumbnail: null,
        profileThumbnail: null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });

  return {
    updateText: updateTextMutation.mutateAsync,
    updateImage: updateImageMutation.mutateAsync,
    updateEmoticon: updateEmoticonMutation.mutateAsync,
    isLoading:
      updateTextMutation.isPending ||
      updateImageMutation.isPending ||
      updateEmoticonMutation.isPending,
  };
};
