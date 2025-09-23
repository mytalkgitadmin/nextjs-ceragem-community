import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ContextMenuProps } from "./types";
import { setupOutsideClickListeners, adjustMenuPosition } from "./utils";

const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  position,
  items,
  onClose,
  className = "",
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 애니메이션을 위한 상태 관리
  useEffect(() => {
    if (isOpen) {
      // 약간의 지연 후 visible 상태로 변경 (DOM 렌더링 후)
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // 외부 클릭으로 닫기 및 키보드 이벤트 처리
  useEffect(() => {
    if (!isOpen) return;

    const cleanup = setupOutsideClickListeners(menuRef, onClose);
    return cleanup;
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // position이 이미 계산된 좌표이므로 그대로 사용하되 화면 밖으로 나가지 않게만 조정
  const adjustedPosition = menuRef.current
    ? adjustMenuPosition(position, menuRef.current, "bottom-start")
    : position;

  return createPortal(
    <div
      ref={menuRef}
      className={`
        fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200
        min-w-48 py-2 transition-all duration-200 ease-out
        ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-1"
        }
        ${className}
      `}
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
        transformOrigin: "top left",
      }}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          {item.divider && index > 0 && (
            <div className="h-px bg-gray-200 my-1" />
          )}
          <button
            onClick={() => {
              if (!item.disabled) {
                item.onClick();
                onClose();
              }
            }}
            disabled={item.disabled}
            className={`
              w-full px-4 py-2 text-left text-sm flex items-center gap-3
              transition-colors duration-150
              ${
                item.disabled
                  ? "text-gray-400 cursor-not-allowed"
                  : item.destructive
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            {item.icon && (
              <span className="flex-shrink-0 w-4 h-4">{item.icon}</span>
            )}
            <span className="flex-1">{item.label}</span>
          </button>
        </React.Fragment>
      ))}
    </div>,
    document.body
  );
};

export default ContextMenu;
