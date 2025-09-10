import { FILE_INPUT_CONFIG } from '../constants';
import { ProcessedFile } from '../types';

interface ImageGroup {
  groupId: string;
  files: ProcessedFile[];
  groupIndex: number;
}
export const createImageGroups = (
  imageFiles: ProcessedFile[],
): ImageGroup[] => {
  const MAX_FILES_PER_GROUP = FILE_INPUT_CONFIG.LIMIT.MAX_FILES_PER_GROUP;
  const groups: ImageGroup[] = [];

  for (let i = 0; i < imageFiles.length; i += MAX_FILES_PER_GROUP) {
    const groupIndex = Math.floor(i / MAX_FILES_PER_GROUP);
    const groupFiles = imageFiles.slice(i, i + MAX_FILES_PER_GROUP);

    groups.push({
      groupId: `image_${groupIndex}`,
      files: groupFiles,
      groupIndex,
    });
  }
  console.log(
    `${imageFiles.length}개 이미지를 ${groups.length}개 그룹으로 분할:`,
    groups.map((g) => `${g.groupId}(${g.files.length}개)`).join(', '),
  );
  return groups;
};
