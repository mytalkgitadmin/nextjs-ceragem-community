// Sendbird 메시지 타입 정의
export const MESSAGE_TYPES = {
  // 기본 텍스트 메시지
  TEXT: "text",
  TEXT_LONG: "text_long", // 500자 이상

  // 파일 메시지
  FILE: "file",
  IMAGE: "image",
  IMAGES: "images",
  VIDEO: "video",

  // 조합 메시지 (커스텀)
  CONTACT: "contact", // 연락처
  NOTICE: "notice", // 공지사항

  // 답장 메시지
  REPLY: "reply",
} as const;

// 파일 MIME 타입별 메시지 타입 매핑
export const FILE_TYPE_MAPPING = {
  // 이미지
  "image/jpeg": MESSAGE_TYPES.IMAGE,
  "image/jpg": MESSAGE_TYPES.IMAGE,
  "image/png": MESSAGE_TYPES.IMAGE,
  "image/gif": MESSAGE_TYPES.IMAGE,
  "image/webp": MESSAGE_TYPES.IMAGE,

  // 비디오
  "video/mp4": MESSAGE_TYPES.VIDEO,
  "video/webm": MESSAGE_TYPES.VIDEO,
  "video/ogg": MESSAGE_TYPES.VIDEO,
  "video/avi": MESSAGE_TYPES.VIDEO,
  "video/mov": MESSAGE_TYPES.VIDEO,

  // 기본 파일 (나머지 모든 타입)
  default: MESSAGE_TYPES.FILE,
} as const;

export type MessageType = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];
