import { API_ENDPOINTS, apiRequest } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import {
  GroupProfileParams,
  UpdateGroupProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UserProfileResponse,
  UserSendbirdProfileResponse,
} from './types';
import { uploadFile } from '../chat/api/fileUploadApi';

export const getSendbirdProfileApi = async (sendbirdId: string) => {
  const response = await apiRequest<UserSendbirdProfileResponse>(
    API_ENDPOINTS.USER.GET_PROFILE_SENDBIRD,
    undefined,
    undefined,
    { sendbirdId },
  );
  return response.resultData.accountProfile;
};

export const useSendbirdProfile = (sendbirdId: string) => {
  return useQuery({
    queryKey: ['user', 'profile', sendbirdId],
    queryFn: async () => getSendbirdProfileApi(sendbirdId),
    enabled: !!sendbirdId,
  });
};

export const getProfileApi = async (accountId: number) => {
  const response = await apiRequest<UserProfileResponse>(
    API_ENDPOINTS.USER.GET_PROFILE,
    undefined,
    undefined,
    { accountId },
  );
  return response.resultData;
};

export const useProfile = (accountId: number) => {
  return useQuery({
    queryKey: ['user', 'profile', accountId],
    queryFn: async () => getProfileApi(accountId),
    enabled: !!accountId,
    ...API_ENDPOINTS.USER.GET_PROFILE.queryConfig,
  });
};

export const updateProfileApi = async (profileData: UpdateProfileRequest) => {
  const response = await apiRequest<UpdateProfileResponse>(
    API_ENDPOINTS.AUTH.PATCH_MY_PROFILE,
    profileData,
  );
  return response.resultData;
};

export const updateGroupProfile = async (data: GroupProfileParams) => {
  try {
    const response = await apiRequest<UpdateGroupProfileResponse>(
      API_ENDPOINTS.AUTH.PUT_MY_PROFILE_IMAGE,
      data,
    );
    return response.resultData;
  } catch (error) {
    console.error('❌ updateGroupProfile API 실패:', error);
    throw error;
  }
};

export interface ProfileFileUploadParams {
  file: File;
  subCategory: 'PROFILE_ORIGIN';
  autoEnable?: boolean;
  contentId?: string;
  openMetadata?: string;
}

export const uploadProfileFile = async (data: ProfileFileUploadParams) => {
  try {
    const result = await uploadFile({
      file: data.file,
      subCategory: data.subCategory,
      autoEnable: data.autoEnable ?? true,
      contentId: data.contentId,
      openMetadata: data.openMetadata,
    });

    return result;
  } catch (error) {
    console.error('❌ uploadProfileFile API 실패:', error);
    throw error;
  }
};
