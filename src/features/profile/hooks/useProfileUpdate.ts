import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileApi, updateGroupProfile } from '../api';
import { ProfileImg } from '@/features/chat/model';
import useProfileFileUpload from './useProfileFileUpload';
import { ProfileTextData, UpdateProfileRequest } from '../types';

export interface ExtendedUpdateProfileRequest extends UpdateProfileRequest {
  profileImage?: ProfileImg;
  selectedFile?: File | null;
}

export const useProfileUpdate = () => {
  const queryClient = useQueryClient();
  const { uploadProfileFile } = useProfileFileUpload();

  // 텍스트 프로필 업데이트
  const updateTextMutation = useMutation({
    mutationFn: (textData: ProfileTextData) => updateProfileApi(textData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });

  // 이미지 파일 업로드 + 프로필 업데이트
  const updateImageMutation = useMutation({
    mutationFn: async ({
      file,
      profileId,
    }: {
      file: File;
      profileId: number;
    }) => {
      // 1. 파일 업로드
      const uploadResult = await uploadProfileFile({
        file,
        subCategory: 'PROFILE_ORIGIN',
        autoEnable: true,
        profileId,
        openMetadata: JSON.stringify({
          type: 'profile_image',
          profileId,
          uploadedAt: new Date().toISOString(),
        }),
      });

      // 2. 그룹 프로필 업데이트
      const res = await updateGroupProfile({
        profileId,
        profileKind: 'normal',
        emoticonId: 0,
        profileOriginal: uploadResult.resultData?.info?.directUrl || '',
        profileThumbnail:
          uploadResult.resultData?.thumbnailInfo1?.directUrl || '',
        profileSmallThumbnail:
          uploadResult.resultData?.thumbnailInfo2?.directUrl || '',
      });

      console.log('uploadResult', uploadResult);
      console.log('updateGroupProfile', res);

      return uploadResult;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });

  // 이모티콘 프로필 업데이트
  const updateEmoticonMutation = useMutation({
    mutationFn: (profileImage: ProfileImg) =>
      updateGroupProfile({
        emoticonId: profileImage.emoticonId,
        profileId: profileImage.profileId,
        profileKind: 'emoticon',
        profileOriginal: null,
        profileSmallThumbnail: null,
        profileThumbnail: null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
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
