import { ProcessedFile } from '../types';

/**
 * 파일 분류
 * 이미지 파일(그룹핑 처리) / 이미지 파일 외 개별 업로드
 */
export const categorizeFiles = (processedFiles: ProcessedFile[]) => {
  const successFiles = processedFiles.filter((f) => f.status === 'SUCCESS');

  const imageFiles = successFiles.filter((f) =>
    f.processedFile.type.startsWith('image/'),
  );

  const nonImageFiles = successFiles.filter(
    (f) => !f.processedFile.type.startsWith('image/'),
  );

  return { successFiles, imageFiles, nonImageFiles };
};

/**
 * 업로드 전략 결정
 */
export const getUploadStrategy = (
  successFiles: ProcessedFile[],
  imageFiles: ProcessedFile[],
) => {
  if (successFiles.length === 1) {
    return 'SINGLE';
  }

  if (imageFiles.length > 1) {
    return 'IMAGE_GROUP_AND_INDIVIDUAL';
  }

  return 'INDIVIDUAL_ONLY';
};

export const createFileRatioMap = (
  files: ProcessedFile[],
): { [fileName: string]: number } => {
  const fileRatios: { [fileName: string]: number } = {};

  files.forEach((processedFile) => {
    if (processedFile.metadata?.ratio) {
      fileRatios[processedFile.processedFile.name] =
        processedFile.metadata.ratio;
    }
  });
  return fileRatios;
};

/**
 * 파일 타입별 ratio 필요 여부 확인
 */
export const needsRatio = (fileType: string): boolean => {
  return fileType.startsWith('image/') || fileType.startsWith('video/');
};
