export * from "./types";
// 기존 enums에서 UI 관련은 별도 파일로 분리
export * from "./ui-enums";

// Import entities enums for backward compatibility
export {
  MessageType,
  MessageCustomType,
  MessageInDataType,
  MessageControlType,
} from "@/entities/chat";

// Import shared enums for backward compatibility
export {
  FileCategory,
  FileKind,
  FileSubCategory,
  PreviewType,
} from "@/shared/model";
