"use client";

import { ReactNode, useEffect, useState } from "react";

export interface DrawerProps {
  /**
   * Drawer 열림/닫힘 상태
   */
  isOpen: boolean;
  /**
   * Drawer 닫기 콜백
   */
  onClose: () => void;
  /**
   * Drawer 내용
   */
  children: ReactNode;
  /**
   * Drawer 제목
   */
  title?: string;
  /**
   * 뒤로가기 버튼 표시 여부
   */
  showBackButton?: boolean;
  /**
   * 헤더 오른쪽 액션 버튼들
   */
  headerActions?: ReactNode;
  /**
   * Drawer 너비 (기본값: max-w-md)
   */
  width?: string;
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
   * Z-index 값 (여러 drawer 스택을 위해)
   */
  zIndex?: number;
}

export function Drawer({
  isOpen,
  onClose,
  children,
  title,
  showBackButton = true,
  headerActions,
  width = "max-w-md",
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  className = "",
  zIndex = 50,
}: DrawerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // 열기 애니메이션 처리
  useEffect(() => {
    if (isOpen && !isClosing) {
      // 열기: 먼저 보이게 하고, 바로 다음에 애니메이션 시작
      setIsVisible(true);
      // 브라우저가 DOM을 렌더링할 시간을 주고 애니메이션 시작
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
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
    }, 300);
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

  if (!isVisible) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disableBackdropClick && event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0" style={{ zIndex }}>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 transition-all duration-300 ease-out
          ${isAnimating ? "bg-black/30" : "bg-black/0"}
        `}
        onClick={handleBackdropClick}
      />

      {/* Drawer */}
      <div
        className={`
          fixed inset-y-0 right-0 ${width} w-full bg-white shadow-xl
          transform transition-transform duration-300 ease-out
          ${isAnimating ? "translate-x-0" : "translate-x-full"}
          ${className}
        `}
      >
        {/* Header */}
        {(title || showBackButton || headerActions) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              {/* 뒤로가기 버튼 */}
              {showBackButton && (
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="닫기"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}

              {/* 제목 */}
              {title && (
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {title}
                </h2>
              )}
            </div>

            {/* 헤더 액션 버튼들 */}
            {headerActions && (
              <div className="flex items-center space-x-2">{headerActions}</div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
