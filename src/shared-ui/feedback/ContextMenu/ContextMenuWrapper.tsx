import React from "react";
import type { ContextMenuWrapperProps } from "./types";
import { useContextMenu } from "./useContextMenu";
import ContextMenu from "./ContextMenu";

const ContextMenuWrapper: React.FC<ContextMenuWrapperProps> = ({
  children,
  items,
  triggerMode = "contextmenu",
  placement, // placement는 optional
  offset = 8,
  onOpen,
  onClose,
  className,
}) => {
  const { isOpen, position, handleClose, triggerProps } = useContextMenu({
    items,
    triggerMode,
    placement,
    offset,
    onOpen,
    onClose,
  });

  return (
    <>
      <div {...triggerProps}>{children}</div>
      <ContextMenu
        isOpen={isOpen}
        position={position}
        items={items}
        onClose={handleClose}
        className={className}
      />
    </>
  );
};

export default ContextMenuWrapper;
