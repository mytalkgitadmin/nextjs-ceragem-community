// ⚠️  DEPRECATED: 이 파일은 더 이상 사용되지 않습니다.
// 새로운 파일들을 사용해주세요:
// - 공통 파일 타입: @/shared/model/core-file-types
// - Chat 파일 타입: @/entities/chat
// - Profile 파일 타입: @/entities/profile

// 하위 호환성을 위한 재export (단계적 마이그레이션용)
export {
  FileKind,
  CoreFileCategory as FileCategory,
  CoreFileSubCategory as FileSubCategory,
  PreviewType,
} from "./core-file-types";

// 도메인별 enum 재export
export { ChatFileCategory, ChatFileSubCategory } from "@/entities/chat";

export {
  ProfileFileCategory,
  ProfileFileSubCategory,
} from "@/entities/profile";

// Feature 도메인별 enum 재export
export { PointFileCategory, PointFileSubCategory } from "@/features/points";

export {
  SmileMeFileCategory,
  SmileMeFileSubCategory,
} from "@/features/smile-me";
