export const DEFAULT_CHANNEL_NAMES = [
  '메모 채널',
  '그룹 채널',
  '가족 채널',
  '1:1 채널',
  'Private 채널',
];

export const MESSAGE_LIMITS = {
  PREVIEW: 50,
  MAX_LENGTH: 5000,
  LONG_MESSAGE: 2000,
} as const;

export const FILE_TYPES = {
  IMAGE: ['gif', 'image', 'webp'],
  DOCUMENT: ['document', 'audio'],
} as const;
