// === 메인 컴포넌트들 ===
export { default as ContextMenu } from "./ContextMenu";
export { default as ContextMenuWrapper } from "./ContextMenuWrapper";

// === 커스텀 훅 ===
export { useContextMenu } from "./useContextMenu";

// === 타입들 ===
export type {
  Position,
  TriggerMode,
  Placement,
  ContextMenuItem,
  UseContextMenuProps,
  UseContextMenuReturn,
  ContextMenuProps,
  ContextMenuWrapperProps,
} from "./types";

// === 유틸리티 함수들 ===
export {
  getAdjustedPosition,
  setupOutsideClickListeners,
  calculatePlacementPosition,
  adjustMenuPosition,
} from "./utils";
