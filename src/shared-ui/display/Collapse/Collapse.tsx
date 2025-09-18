import React, { useState, ReactNode, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

// Collapse Component with Animation
interface CollapseProps {
  title: string;
  isOpen: boolean;
  onToggle?: () => void;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export const Collapse: React.FC<CollapseProps> = ({
  title,
  isOpen,
  onToggle,
  children,
  className = "",
  defaultOpen = true,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // 초기 상태를 initOpen과 isOpen을 고려해서 설정
  const [height, setHeight] = useState<number>(() => {
    return defaultOpen && isOpen ? ("auto" as any) : 0;
  });

  // 첫 번째 렌더링 후 실제 높이를 측정하고 애니메이션 활성화
  useEffect(() => {
    if (contentRef.current && !isInitialized) {
      const contentHeight = contentRef.current.scrollHeight;

      // 초기 상태가 열린 상태라면 높이를 설정
      if (defaultOpen && isOpen) {
        setHeight(contentHeight);
      }

      // 다음 프레임에서 초기화 완료로 설정 (애니메이션 활성화)
      requestAnimationFrame(() => {
        setIsInitialized(true);
      });
    }
  }, []);

  // isOpen 상태 변경 시 높이 업데이트 (초기화 후에만)
  useEffect(() => {
    if (contentRef.current && isInitialized) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(isOpen ? contentHeight : 0);
    }
  }, [isOpen, children, isInitialized]);

  return (
    <div className={`border-b border-gray-100 last:border-b-0 ${className}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-4 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <div
          className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </button>

      <div
        className={`overflow-hidden ${isInitialized ? "transition-all duration-300 ease-in-out" : ""}`}
        style={{
          height: typeof height === "number" ? `${height}px` : height,
          visibility:
            isInitialized || (defaultOpen && isOpen) ? "visible" : "hidden",
        }}
      >
        <div ref={contentRef} className="pb-2">
          {children}
        </div>
      </div>
    </div>
  );
};
