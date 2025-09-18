"use client";

import { useState, useRef, useEffect, forwardRef } from "react";

export interface TabItem {
  key: string;
  label: React.ReactNode;
}

export interface TabProps {
  tab: TabItem;
  isActive: boolean;
  onClick: (key: string) => void;
  className?: string;
}

// 개별 Tab 컴포넌트
export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ tab, isActive, onClick, className = "" }, ref) => {
    return (
      <button
        ref={ref}
        onClick={() => onClick(tab.key)}
        className={`
          relative px-4 py-3 text-sm font-medium transition-all duration-300 ease-in-out
          hover:text-blue-600 hover:bg-blue-50/50 rounded-lg
          ${isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}
          ${className}
        `}
      >
        <span className="relative z-10">{tab.label}</span>

        {/* 개별 탭 배경 효과 */}
        <div
          className={`
            absolute inset-0 rounded-lg transition-all duration-200 ease-in-out
            ${isActive ? "bg-blue-50" : "bg-transparent hover:bg-gray-50"}
          `}
        />
      </button>
    );
  }
);

Tab.displayName = "Tab";
