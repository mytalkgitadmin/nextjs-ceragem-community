import { FILE_INPUT_CONFIG } from '../constants';
import {
  ConvertibleFile,
  FileValidationConfig,
  FileValidationError,
  FileValidationResult,
} from '../types';
import { getConvertibleFileInfo } from './convertToJpeg';

// 파일 크기 검증
export const validateFileSize = (file: File): string => {
  const maxFileSize = FILE_INPUT_CONFIG.LIMIT.MAX_FILE_SIZE;
  if (file.size === 0) {
    return `비어있는 파일입니다`;
  } else if (file.size >= maxFileSize) {
    return `파일 크기 허용량 ${Math.round(maxFileSize / 1024 / 1024)}MB 초과하였습니다`;
  }
  return '';
};

// 파일 타입 검증
export const validateFileType = (
  file: File,
  acceptedExtensions: string[],
): boolean => {
  // 비어 있는 경우 모든 타입 허용
  if (acceptedExtensions.length === 0) return true;

  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.substring(fileName.lastIndexOf('.'));

  // 확장자 매칭(. 포함)
  return acceptedExtensions.some((ext) => ext.toLowerCase() === fileExtension);
};

export const validateFileList = (
  files: FileList | File[],
  config: FileValidationConfig,
): FileValidationResult => {
  const fileArray = Array.from(files);
  const validFiles: File[] = [];
  const invalidFiles: FileValidationError[] = [];
  const convertibleFiles: ConvertibleFile[] = [];
  let totalSize = 0;

  // 파일 개수 검증
  if (fileArray.length > config.maxFileCount) {
    // 초과된 파일들을 invalid로 처리
    fileArray.slice(config.maxFileCount).forEach((file) => {
      invalidFiles.push({
        file,
        errorType: 'COUNT',
        message: `최대 ${config.maxFileCount}개의 파일만 업로드할 수 있습니다`,
      });
    });
  }
  // 각 파일별 개별 검증
  fileArray.slice(0, config.maxFileCount).forEach((file) => {
    // 변환 가능한 파일 체크
    const convertibleInfo = getConvertibleFileInfo(file);
    if (convertibleInfo) {
      convertibleFiles.push(convertibleInfo);
    }

    // 파일 크기 검증
    const message = validateFileSize(file);
    if (message !== '') {
      invalidFiles.push({
        file,
        errorType: 'SIZE',
        message,
      });
      return;
    }

    // 파일 타입 검증
    const isConvertible = convertibleInfo !== null;
    const isValidType =
      validateFileType(file, config.acceptedExtensions) || isConvertible;

    if (!isValidType) {
      invalidFiles.push({
        file,
        errorType: 'TYPE',
        message: '지원하지 않는 파일 형식입니다.',
      });
      return;
    }

    // 모든 검증 통과
    validFiles.push(file);
    totalSize += file.size;
  });

  return { validFiles, invalidFiles, totalSize, convertibleFiles };
};
