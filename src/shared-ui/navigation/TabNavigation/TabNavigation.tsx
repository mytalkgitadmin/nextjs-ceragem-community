"use client";

import { Tabs } from "antd";

export interface TabItem {
  key: string;
  label: React.ReactNode;
}

export interface TabNavigationProps {
  tabs: TabItem[];
  activeKey: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function TabNavigation({
  tabs,
  activeKey,
  onTabChange,
  className = "",
}: TabNavigationProps) {
  return (
    <div className={`flex items-center justify-between bg-white ${className}`}>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => onTabChange(key)}
        items={tabs.map((tab) => ({ ...tab, key: tab.key }))}
        className="px-4"
        tabBarStyle={{
          marginBottom: 0,
          borderBottom: "none",
        }}
      />
    </div>
  );
}
