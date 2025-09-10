import { API_ENDPOINTS, createFileUploadInstance, post } from '@/shared/api';

export interface FileUploadParams {
  file: File;
  contentId?: string; // 채널 URL
  subCategory?: string;
  autoEnable?: boolean;
  openMetadata?: string; // JSON 문자열
}
export const uploadFile = async (params: FileUploadParams) => {
  const formData = new FormData();

  formData.append('file', params.file);

  if (params.contentId) {
    formData.append('contentId', params.contentId);
  }
  if (params.subCategory) {
    formData.append('subCategory', params.subCategory);
  }

  if (params.autoEnable !== undefined) {
    formData.append('autoEnable', String(params.autoEnable));
  }

  if (params.openMetadata) {
    formData.append('openMetadata', params.openMetadata);
  }

  const fileUploadInstance = createFileUploadInstance();

  return post(
    {
      url: API_ENDPOINTS.FILE_UPLOAD.POST_FILE.url,
      data: formData,
    },
    fileUploadInstance,
  );
};
