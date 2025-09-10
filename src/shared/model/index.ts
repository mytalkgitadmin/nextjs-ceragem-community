// Core file types (domain-independent)
export {
  FileKind,
  CoreFileCategory,
  CoreFileSubCategory,
  PreviewType,
} from "./core-file-types";

// Backward compatibility - DEPRECATED
export {
  FileCategory,
  FileSubCategory,
  ChatFileCategory,
  ChatFileSubCategory,
  ProfileFileCategory,
  ProfileFileSubCategory,
} from "./file-types";

// UI related types (domain-independent only)
export { LayoutType } from "./ui-types";

// File validation types
export type { FileValidationError } from "./file-validation-types";
