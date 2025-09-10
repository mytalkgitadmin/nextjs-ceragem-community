export const FILE_INPUT_CONFIG = {
  // 업로드 제한
  LIMIT: {
    MAX_UPLOAD_COUNT: 30, // 최대 업로드 파일 수
    MAX_FILES_PER_GROUP: 30, // 이미지 그룹 최대
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  },

  // 파일 타입
  FILE_TYPES: {
    IMAGE: ['gif', 'image', 'webp'] as const,
    DOCUMENT: ['document', 'audio'] as const,
  },
} as const;

export const DEFAULT_FILE_CONFIG = {
  maxFileSize: FILE_INPUT_CONFIG.LIMIT.MAX_FILE_SIZE,
  maxFileCount: FILE_INPUT_CONFIG.LIMIT.MAX_UPLOAD_COUNT,
  acceptedTypes: [],
};
