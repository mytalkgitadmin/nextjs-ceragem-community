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

// Import Chat-specific file enums for backward compatibility
export { ChatFileCategory, ChatFileSubCategory } from "@/entities/chat";

// Import core file types for backward compatibility
export { FileKind, PreviewType } from "@/shared/model";
