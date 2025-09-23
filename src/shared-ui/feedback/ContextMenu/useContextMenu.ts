import { useState, useRef, useCallback } from "react";
import type {
  UseContextMenuProps,
  UseContextMenuReturn,
  Position,
  TriggerMode,
} from "./types";
import { calculatePlacementPosition } from "./utils";

export const useContextMenu = ({
  items,
  triggerMode = "contextmenu",
  placement,
  offset = 8,
  onOpen,
  onClose,
}: UseContextMenuProps): UseContextMenuReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement>(null);

  const handleOpen = useCallback(
    (event?: React.MouseEvent) => {
      let newPosition: Position;

      if (triggerMode === "contextmenu") {
        if (event) {
          event.preventDefault();
          event.stopPropagation();

          if (placement && triggerRef.current) {
            // contextmenu에서 placement가 지정된 경우 트리거 요소 기준으로 배치
            newPosition = calculatePlacementPosition(
              triggerRef.current,
              placement,
              offset
            );
          } else {
            // placement가 없으면 클릭한 위치에 표시
            const { clientX, clientY } = event;
            newPosition = { x: clientX, y: clientY };
          }
        } else {
          return;
        }
      } else if (triggerMode === "click") {
        if (placement && triggerRef.current) {
          // click에서 placement가 지정된 경우 트리거 요소 기준으로 배치
          newPosition = calculatePlacementPosition(
            triggerRef.current,
            placement,
            offset
          );
        } else if (event) {
          // placement가 없으면 클릭한 위치에 표시
          const { clientX, clientY } = event;
          newPosition = { x: clientX, y: clientY };
        } else {
          return;
        }
      } else if (triggerRef.current) {
        // hover, manual 등은 항상 트리거 요소 기준
        const defaultPlacement = placement || "bottom-start";
        newPosition = calculatePlacementPosition(
          triggerRef.current,
          defaultPlacement,
          offset
        );
      } else {
        return;
      }

      setPosition(newPosition);
      setIsOpen(true);
      onOpen?.(newPosition);
    },
    [triggerMode, placement, offset, onOpen]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const handleToggle = useCallback(
    (event?: React.MouseEvent) => {
      if (isOpen) {
        handleClose();
      } else {
        handleOpen(event);
      }
    },
    [isOpen, handleOpen, handleClose]
  );

  // 트리거 모드에 따른 props 생성
  const getTriggerProps = (): Record<string, any> => {
    const baseProps = {
      ref: triggerRef,
    };

    switch (triggerMode) {
      case "contextmenu":
        return {
          ...baseProps,
          onContextMenu: handleOpen,
        };

      case "click":
        return {
          ...baseProps,
          onClick: handleToggle,
        };

      case "hover":
        return {
          ...baseProps,
          onMouseEnter: handleOpen,
          onMouseLeave: handleClose,
        };

      case "manual":
        return baseProps;

      default:
        return {
          ...baseProps,
          onContextMenu: handleOpen,
        };
    }
  };

  return {
    isOpen,
    position,
    handleClose,
    handleOpen,
    triggerProps: getTriggerProps(),
  };
};
