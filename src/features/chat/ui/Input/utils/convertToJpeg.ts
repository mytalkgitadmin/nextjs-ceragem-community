import heic2any from 'heic2any';
import { ConvertibleFile } from '../types';

const isHeic = (file: File): boolean => {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  return (
    fileType === 'image/heic' ||
    fileType === 'image/heif' ||
    fileName.endsWith('.heic') ||
    fileName.endsWith('.heif')
  );
};

const isSvg = (file: File): boolean => {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  return fileType === 'image/svg+xml' || fileName.endsWith('.svg');
};

const convertHeicToJpeg = async (file: File): Promise<File | null> => {
  if (!isHeic(file)) return null;

  try {
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.8,
    });

    // convertedBlob이 배열인 경우 처리
    const blobToUse = Array.isArray(convertedBlob)
      ? convertedBlob[0]
      : convertedBlob;

    const convertedFile = new File(
      [blobToUse],
      file.name.replace(/\.(heic|heif)$/i, '.jpg'),
      { type: 'image/jpeg' },
    );
    return convertedFile;
  } catch (error) {
    console.error('HEIC 변환 오류:', error);
    throw new Error(
      `HEIC 파일 변환에 실패했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
    );
  }
};

const convertSvgToJpeg = async (file: File): Promise<File | null> => {
  if (!isSvg(file)) return null;

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const svgString = event.target?.result as string;

      // SVG 문자열로부터 이미지 생성
      const img = new Image();

      img.onload = () => {
        // Canvas 생성 및 SVG 그리기
        const canvas = document.createElement('canvas');
        // 적절한 크기 설정 (필요에 따라 조정)
        canvas.width = img.width || 800;
        canvas.height = img.height || 600;

        // SVG가 너무 작은 경우 최소 크기 설정
        if (canvas.width < 100) canvas.width = 800;
        if (canvas.height < 100) canvas.height = 600;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Canvas 2D 컨텍스트를 생성할 수 없습니다.');
          resolve(null);
          return;
        }

        // 배경을 흰색으로 설정 (투명 배경을 방지)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // SVG 그리기
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // JPEG로 변환
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              console.error('JPEG blob을 생성할 수 없습니다.');
              resolve(null);
              return;
            }

            // 새 파일 생성
            const newFileName = file.name.replace(/\.svg$/i, '.jpg');
            const jpegFile = new File([blob], newFileName, {
              type: 'image/jpeg',
              lastModified: new Date().getTime(),
            });

            resolve(jpegFile);
          },
          'image/jpeg',
          0.9, // 품질 설정 (0.0 ~ 1.0)
        );
      };

      // SVG 문자열을 Data URL로 변환하여 이미지로 로드
      img.src =
        'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    };

    reader.onerror = () => {
      console.error('SVG 파일을 읽는 중 오류가 발생했습니다.');
      resolve(null);
    };

    reader.readAsText(file);
  });
};

// 변환 가능한 파일 체크
export const getConvertibleFileInfo = (file: File): ConvertibleFile | null => {
  if (isHeic(file)) {
    return {
      file,
      originalType: 'HEIC',
      convertToType: 'JPEG',
      reason: 'heic/heif 파일은 jpg로 변환되어 전송됩니다.',
    };
  }
  if (isSvg(file)) {
    return {
      file,
      originalType: 'SVG',
      convertToType: 'JPEG',
      reason: 'SVG 파일은 jpg로 변환되어 전송됩니다.',
    };
  }
  return null;
};

export const shouldConvertToJpeg = (file: File): boolean => {
  return isHeic(file) || isSvg(file);
};

export const convertToJpeg = async (file: File): Promise<File> => {
  if (isHeic(file)) {
    const converted = await convertHeicToJpeg(file);
    return converted || file;
  }

  if (isSvg(file)) {
    const converted = await convertSvgToJpeg(file);
    return converted || file;
  }
  return file;
};
