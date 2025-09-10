// 도메인에 독립적인 핵심 파일 타입들

// 파일 종류
export enum FileKind {
  AUDIO = "AUDIO",
  DOCUMENT = "DOCUMENT",
  ETC = "ETC",
  GIF = "GIF",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  WEBP = "WEBP",
  ZIP = "ZIP",
}

// 공통 파일 카테고리 (도메인 독립적)
export enum CoreFileCategory {
  BACKUP = "BACKUP",
  CALENDAR = "CALENDAR",
  COMMON = "COMMON",
  RESOURCE = "RESOURCE",
}

// 공통 파일 하위 카테고리 (도메인 독립적)
export enum CoreFileSubCategory {
  BACKUP = "BACKUP",
  COMMON_IMAGE = "COMMON_IMAGE",
  COMMON_NOTICE = "COMMON_NOTICE",
  DDAY_BACKGROUND = "DDAY_BACKGROUND",
  DDAY_BACKGROUND_THUMBNAIL = "DDAY_BACKGROUND_THUMBNAIL",
  DDAY_BG_DEFAULT = "DDAY_BG_DEFAULT",
  DDAY_BG_DEFAULT_THM = "DDAY_BG_DEFAULT_THM",
  RESOURCE = "RESOURCE",
}

// 미리보기 타입
export enum PreviewType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  ALBUM = "ALBUM",
  UNKNOWN = "UNKNOWN",
}
