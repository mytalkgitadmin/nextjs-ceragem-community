"use client";
import { Tab, TabItem } from "./Tab";
import { TabIndicator } from "./TabIndicator";
import { TabBorder } from "./TabBorder";
import { useState, useRef, useEffect } from "react";

export interface TabNavigationProps {
  tabs: TabItem[];
  activeKey: string;
  onTabChange: (tabId: string) => void;
  showBorder?: boolean;
  tabClassName?: string;
  className?: string;
}

export function TabNavigation({
  tabs,
  activeKey,
  onTabChange,
  showBorder = true,
  tabClassName = "",
  className = "",
}: TabNavigationProps) {
  const [activeTabPosition, setActiveTabPosition] = useState({
    left: 0,
    width: 0,
  });
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // 활성 탭의 위치와 크기를 계산하여 인디케이터 위치 업데이트
  useEffect(() => {
    const activeTabElement = tabRefs.current[activeKey];
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setActiveTabPosition({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeKey, tabs]);

  return (
    <div className="relative px-4">
      {/* 탭 컨테이너 */}
      <div className={`flex items-center space-x-0 relative ${className}`}>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            ref={(el) => {
              tabRefs.current[tab.key] = el;
            }}
            tab={tab}
            isActive={activeKey === tab.key}
            onClick={onTabChange}
            className={tabClassName}
          />
        ))}

        {/* 활성 탭 인디케이터 */}
        <TabIndicator position={activeTabPosition} />
      </div>

      {/* 하단 경계선 */}
      {showBorder && <TabBorder />}
    </div>
  );
}
