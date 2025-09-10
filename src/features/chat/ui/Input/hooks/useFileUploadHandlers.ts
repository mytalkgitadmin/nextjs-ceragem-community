import { useGroupChannelContext } from '@sendbird/uikit-react/GroupChannel/context';

import { createFileRatioMap, needsRatio, showFileUploadError } from '../utils';

import {
  useSimpleFileUpload,
  useSendbirdMessage,
  useImageGroupUpload,
} from '../hooks';

import { ProcessedFile, UploadResult } from '../types';
import { FILE_INPUT_CONFIG } from '../constants';

export default function useFileUploadHandlers() {
  const { channelUrl } = useGroupChannelContext();
  const { uploadSingleFile } = useSimpleFileUpload();
  const { sendFileMessage, sendGroupFileMessage } = useSendbirdMessage();
  const { startGroupUpload } = useImageGroupUpload();

  // 단일 파일 업로드
  const handleSingleFile = async (processedFile: ProcessedFile) => {
    const ratio = processedFile.metadata?.ratio;

    await uploadSingleFile(processedFile.processedFile, {
      channelUrl,
      onSuccess: async (uploadResult: UploadResult) => {
        await sendFileMessage(uploadResult, ratio);
      },
      onError: (error) => {
        showFileUploadError(`업로드 실패: ${error}`);
      },
    });
  };

  // 이미지 그룹 업로드
  const handleImageGroup = async (imageFiles: ProcessedFile[]) => {
    const maxCount = FILE_INPUT_CONFIG.LIMIT.MAX_UPLOAD_COUNT;

    if (imageFiles.length > maxCount) {
      showFileUploadError(
        `이미지는 최대 ${maxCount}개까지만 업로드할 수 있습니다.`,
      );
      return;
    }

    const fileRatios = createFileRatioMap(imageFiles);

    await startGroupUpload(imageFiles, {
      channelUrl,
      onGroupComplete: async (groupResult) => {
        try {
          await sendGroupFileMessage(groupResult, fileRatios);
        } catch (error) {
          console.error('❌ 그룹 메시지 전송 실패:', error);
          showFileUploadError(
            '파일은 업로드되었지만 메시지 전송에 실패했습니다.',
          );
        }
      },
      onError: (error) => {
        showFileUploadError(`그룹 업로드 실패: ${error}`);
      },
    });
  };

  // 개별 파일들 업로드
  const handleIndividualFiles = async (files: ProcessedFile[]) => {
    for (let i = 0; i < files.length; i++) {
      const processedFile = files[i];
      const fileType = processedFile.processedFile.type;
      const ratio = needsRatio(fileType)
        ? processedFile.metadata?.ratio
        : undefined;

      try {
        await uploadSingleFile(processedFile.processedFile, {
          channelUrl,
          onSuccess: async (uploadResult: UploadResult) => {
            await sendFileMessage(uploadResult, ratio);
          },
          onError: (error) => {
            console.error(`❌ 파일 ${i + 1} 업로드 실패:`, error);
          },
        });
      } catch (error) {
        console.error(`파일 ${i + 1} 처리 실패:`, error);
      }
    }
  };

  return { handleSingleFile, handleImageGroup, handleIndividualFiles };
}
