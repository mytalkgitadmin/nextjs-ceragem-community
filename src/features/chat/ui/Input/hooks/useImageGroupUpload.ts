import { useState } from 'react';
import { uploadFile } from '@/features/chat/api/fileUploadApi';
import { GroupUploadResult, ProcessedFile, UploadResult } from '../types';
import { createImageGroups } from '../utils';

interface GroupUploadStatus {
  groupId: string;
  totalFiles: number;
  uploadedFiles: number;
  uploadResults: UploadResult[];
  isCompleted: boolean;
  error?: string;
}

interface GroupUploadOptions {
  channelUrl: string;
  onGroupComplete?: (groupResult: GroupUploadResult) => void;
  onAllComplete?: (allResults: UploadResult[][]) => void;
  onError?: (error: string) => void;
}

export default function useImageGroupUpload() {
  const [groupStatuses, setGroupStatuses] = useState<GroupUploadStatus[]>([]);
  const [isGroupUploading, setIsGroupUploading] = useState(false);

  // 이미지 그룹 업로드 시작
  const startGroupUpload = async (
    imageFiles: ProcessedFile[],
    options: GroupUploadOptions,
  ) => {
    setIsGroupUploading(true);
    try {
      // 1. 그룹 생성
      const ImageGroups = createImageGroups(imageFiles);

      // 2. 그룹 상태 초기화
      const initialStatuses: GroupUploadStatus[] = ImageGroups.map((group) => ({
        groupId: group.groupId,
        totalFiles: group.files.length,
        uploadedFiles: 0,
        uploadResults: [],
        isCompleted: false,
      }));

      setGroupStatuses(initialStatuses);

      const allGroupResults: UploadResult[][] = [];

      // 3. 각 그룹을 순차적 처리
      for (const group of ImageGroups) {
        console.log(
          `그룹 ${group.groupId} 업로드 시작 (${group.files.length}개 파일)`,
        );

        const groupResults = await processImageGroup(group, options.channelUrl);

        updateGroupStatus(group.groupId, {
          uploadedFiles: group.files.length,
          uploadResults: groupResults,
          isCompleted: true,
        });

        allGroupResults.push(groupResults);

        // 그룹 완료 콜백
        options.onGroupComplete?.({
          groupId: group.groupId,
          uploadResults: groupResults,
        });
        console.log(`그룹 ${group.groupId} 업로드 완료`);
      }

      // 모든 그룹 완료 콜백
      options.onAllComplete?.(allGroupResults);
    } catch (error) {
      console.error('그룹 업로드 실패:', error);
      options.onError?.(
        error instanceof Error ? error.message : '그룹 업로드 실패',
      );
    } finally {
      setIsGroupUploading(false);
    }
  };

  // 개별 그룹의 파일들을 순차 업로드
  const processImageGroup = async (
    group: { groupId: string; files: ProcessedFile[] },
    channelUrl: string,
  ): Promise<UploadResult[]> => {
    const uploadResults: UploadResult[] = [];

    for (let i = 0; i < group.files.length; i++) {
      const processedFile = group.files[i];

      try {
        console.log(
          `${group.groupId} - 파일 ${i + 1}/${group.files.length} 업로드:`,
          processedFile.processedFile.name,
        );
        const uploadParams = {
          file: processedFile.processedFile,
          contentId: channelUrl,
          subCategory: 'CHAT_FILE',
          autoEnable: false,
          openMetadata: JSON.stringify({
            groupId: group.groupId,
            fileIndex: i,
          }),
        };

        const result = (await uploadFile(uploadParams)) as UploadResult;
        uploadResults.push(result);

        console.log(`${group.groupId} - 파일 ${i + 1} 업로드 완료`);
      } catch (error) {
        console.error(`${group.groupId} - 파일 ${i + 1} 업로드 실패:`, error);
        // 개별 파일 실패 시에도 계속 진행 (또는 전체 중단 선택 가능)
        throw error;
      }
    }
    return uploadResults;
  };

  // 그룹 상태 업데이트
  const updateGroupStatus = (
    groupId: string,
    updates: Partial<GroupUploadStatus>,
  ) => {
    setGroupStatuses((prev) =>
      prev.map((status) =>
        status.groupId === groupId ? { ...status, ...updates } : status,
      ),
    );
  };

  return {
    groupStatuses,
    isGroupUploading,
    startGroupUpload,
  };
}
