import { ConversionType, FileProcessResult, ProcessedFile } from '../types';
import { convertToJpeg, shouldConvertToJpeg } from './convertToJpeg';

/**
 * 파일 타입별 처리 전략 결정
 */
const getProcessingStrategy = (file: File) => {
  const fileType = file.type.toLowerCase();

  if (fileType.startsWith('image/')) {
    return 'image';
  } else if (fileType.startsWith('video/')) {
    return 'video';
  } else if (fileType.includes('pdf') || fileType.includes('document')) {
    return 'document';
  }

  return 'default';
};

const processImageFile = async (file: File): Promise<ProcessedFile> => {
  try {
    // 1. 변환이 필요한 파일 타입 체크
    const needsConversion = shouldConvertToJpeg(file);

    let processedFile = file;
    let conversionType: ConversionType = 'NONE';

    // 2. 변환이 필요하면 JPEG로 변환
    if (needsConversion) {
      processedFile = await convertToJpeg(file);
      conversionType = 'IMAGE_CONVERT';
    }

    // 3. 메타데이터 추출(변환 파일 기준)
    const metadata = await extractImageMetadata(processedFile);
    return {
      originalFile: file,
      processedFile,
      status: 'SUCCESS',
      conversionType,
      metadata,
    };
  } catch (error) {
    console.error('이미지 처리 실패:', error);
    return {
      originalFile: file,
      processedFile: file,
      status: 'FAILED',
      conversionType: 'NONE',
      error:
        error instanceof Error
          ? error.message
          : '이미지 처리 중 오류가 발생했습니다.',
    };
  }
};
const processVideoFile = async (file: File): Promise<ProcessedFile> => {
  try {
    const metadata = await extractVideoMetadata(file);
    return {
      originalFile: file,
      processedFile: file,
      status: 'SUCCESS',
      conversionType: 'NONE',
      metadata,
    };
  } catch (error) {
    console.error('비디오 처리 실패:', error);
    return {
      originalFile: file,
      processedFile: file,
      status: 'FAILED',
      conversionType: 'NONE',
      error:
        error instanceof Error
          ? error.message
          : '비디오 처리 중 오류가 발생했습니다.',
    };
  }
};
const processDefaultFile = async (file: File): Promise<ProcessedFile> => {
  return {
    originalFile: file,
    processedFile: file,
    status: 'SUCCESS',
    conversionType: 'NONE',
  };
};

/**
 * 이미지 메타데이터 추출
 */
const extractImageMetadata = (
  file: File,
): Promise<{
  width: number;
  height: number;
  ratio: number;
}> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const ratio = parseFloat((height / width).toFixed(2));

      resolve({ width, height, ratio });

      // 메모리 정리
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('이미지 메타데이터 추출 실패'));
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * 비디오 메타데이터 추출
 */
const extractVideoMetadata = (
  file: File,
): Promise<{
  width: number;
  height: number;
  duration: number;
  ratio: number;
}> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');

    video.onloadedmetadata = () => {
      const width = video.videoWidth;
      const height = video.videoHeight;
      const duration = video.duration;
      const ratio = parseFloat((height / width).toFixed(2));
      resolve({ width, height, duration, ratio });

      // 메모리 정리
      URL.revokeObjectURL(video.src);
    };

    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('비디오 메타데이터 추출 실패'));
    };

    video.src = URL.createObjectURL(file);
  });
};

// 이미지 리사이징

// 개별 파일 처리
const processSingleFile = async (file: File) => {
  const strategy = getProcessingStrategy(file);

  switch (strategy) {
    case 'image':
      return await processImageFile(file);
    case 'video':
      return await processVideoFile(file);
    case 'document':
    case 'default':
      return await processDefaultFile(file);
  }
};

export const processValidFiles = async (
  validFiles: File[],
): Promise<FileProcessResult> => {
  try {
    const processPromises = validFiles.map((file) => processSingleFile(file));
    const processedFiles = await Promise.all(processPromises);

    const successCount = processedFiles.filter(
      (f) => f.status === 'SUCCESS',
    ).length;
    const failureCount = processedFiles.filter(
      (f) => f.status === 'FAILED',
    ).length;
    const totalSize = processedFiles
      .filter((f) => f.status === 'SUCCESS')
      .reduce((total, f) => total + f.processedFile.size, 0);

    return {
      processedFiles,
      successCount,
      failureCount,
      totalSize,
    };
  } catch (error) {
    console.error('파일 처리 중 오류:', error);

    return {
      processedFiles: [],
      successCount: 0,
      failureCount: validFiles.length,
      totalSize: 0,
    };
  }
};
