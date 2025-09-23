import { ReactNode } from "react";

// === 기본 타입들 ===
export interface Position {
  x: number;
  y: number;
}

export type TriggerMode = "contextmenu" | "click" | "hover" | "manual";

export type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
  divider?: boolean;
}

// === 훅 관련 타입들 ===
export interface UseContextMenuProps {
  items: ContextMenuItem[];
  triggerMode?: TriggerMode;
  placement?: Placement;
  offset?: number;
  onOpen?: (position: Position) => void;
  onClose?: () => void;
}

export interface UseContextMenuReturn {
  isOpen: boolean;
  position: Position;
  handleClose: () => void;
  handleOpen: (event?: React.MouseEvent) => void;
  triggerProps: Record<string, any>;
}

// === 컴포넌트 Props 타입들 ===
export interface ContextMenuProps {
  isOpen: boolean;
  position: Position;
  items: ContextMenuItem[];
  onClose: () => void;
  className?: string;
}

export interface ContextMenuWrapperProps {
  children: ReactNode;
  items: ContextMenuItem[];
  triggerMode?: TriggerMode;
  placement?: Placement;
  offset?: number;
  onOpen?: (position: Position) => void;
  onClose?: () => void;
  className?: string;
}
