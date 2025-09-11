"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export interface CollapsibleSectionProps {
  title: string;
  count?: number;
  children: React.ReactNode;
  defaultActive?: boolean;
  extra?: React.ReactNode;
  className?: string;
}

export function CollapsibleSection({
  title,
  count,
  children,
  defaultActive = true,
  extra,
  className = "",
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultActive);
  const headerTitle = count !== undefined ? `${title} (${count})` : title;

  return (
    <div className={`border-b border-gray-200 bg-white ${className}`}>
      {/* 헤더 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between w-full pr-2">
          <span className="font-medium text-gray-900 text-sm">
            {headerTitle}
          </span>
          {extra && <div className="flex-shrink-0 mr-2">{extra}</div>}
        </div>
        <div className="flex-shrink-0 text-gray-400">
          {isOpen ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </div>
      </button>

      {/* 콘텐츠 */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white">
          <div className="space-y-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
