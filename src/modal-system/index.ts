// Main exports
export { ModalProvider, useModalContext } from "./context";
export { ModalManager } from "./ModalManager";
export { useModal, modalUtils } from "./hooks";

// Component exports
export { Modal } from "./components";
export type { ModalProps } from "./components";

// Type exports
export type {
  ModalConfig,
  ModalItem,
  ModalContextState,
  ModalSize,
  OpenModalFunction,
  CloseModalFunction,
} from "./types";
