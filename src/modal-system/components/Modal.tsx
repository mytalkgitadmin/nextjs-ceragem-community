"use client";

import { ReactNode, useEffect, useState } from "react";
import { ModalSize } from "../types";

export interface ModalProps {
  /**
   * Modal 열림/닫힘 상태
   */
  isOpen: boolean;
  /**
   * Modal 닫기 콜백
   */
  onClose: () => void;
  /**
   * Modal 내용
   */
  children: ReactNode;
  /**
   * Modal 제목
   */
  title?: string;
  /**
   * Modal 크기
   */
  size?: ModalSize;
  /**
   * 헤더 표시 여부
   */
  showHeader?: boolean;
  /**
   * 닫기 버튼 표시 여부
   */
  showCloseButton?: boolean;
  /**
   * 헤더 오른쪽 액션 버튼들
   */
  headerActions?: ReactNode;
  /**
   * 푸터 내용
   */
  footer?: ReactNode;
  /**
   * 외부 클릭 시 닫기 비활성화
   */
  disableBackdropClick?: boolean;
  /**
   * ESC 키로 닫기 비활성화
   */
  disableEscapeKeyDown?: boolean;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * Z-index 값 (여러 modal 스택을 위해)
   */
  zIndex?: number;
  /**
   * 닫기 요청 플래그
   */
  requestClose?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  showHeader = true,
  showCloseButton = true,
  headerActions,
  footer,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  className = "",
  zIndex = 50,
  requestClose = false,
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // 열기 애니메이션 처리
  useEffect(() => {
    if (isOpen && !isClosing) {
      // 열기: 먼저 보이게 하고, 바로 다음에 애니메이션 시작
      setIsVisible(true);
      // 브라우저가 DOM을 렌더링할 시간을 주고 애니메이션 시작
      setTimeout(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      }, 100);
    }
  }, [isOpen, isClosing]);

  // 닫기 처리
  const handleClose = () => {
    if (isClosing) return; // 이미 닫는 중이면 무시

    setIsClosing(true);
    setIsAnimating(false);

    // 애니메이션 완료 후 숨김 및 onClose 호출
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 200);
  };

  // ESC 키 이벤트 핸들러
  useEffect(() => {
    if (!disableEscapeKeyDown && isOpen && !isClosing) {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isOpen, isClosing, disableEscapeKeyDown]);

  useEffect(() => {
    if (requestClose) {
      handleClose();
    }
  }, [requestClose]);

  if (!isVisible) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disableBackdropClick && event.target === event.currentTarget) {
      handleClose();
    }
  };

  // 크기별 클래스 정의
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-[95vw] max-h-[95vh]",
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex }}
    >
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 transition-all duration-200 ease-out
          ${isAnimating ? "bg-black/50" : "bg-black/0"}
        `}
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div
        className={`
          relative w-full max-w-sm bg-white rounded-xl shadow-xl
          transform transition-all duration-200 ease-out
          ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          ${className} flex flex-col
        `}
      >
        {/* Header */}
        {showHeader && (title || showCloseButton || headerActions) && (
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex items-center space-x-3">
              {/* 제목 */}
              {title && (
                <h2 className="text-base font-medium text-gray-900 truncate">
                  {title}
                </h2>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {/* 헤더 액션 버튼들 */}
              {headerActions && (
                <div className="flex items-center space-x-2">
                  {headerActions}
                </div>
              )}

              {/* 닫기 버튼 */}
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="닫기"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 px-4 pb-4">{children}</div>

        {/* Footer */}
        {footer && <div className="border-t border-gray-200 p-4">{footer}</div>}
      </div>
    </div>
  );
}
