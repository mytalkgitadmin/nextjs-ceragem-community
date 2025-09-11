"use client";

import { Tabs } from "antd";

export type OrganizationTabType = "organization" | "customers" | "family";

export interface OrganizationTabNavProps {
  activeTab: OrganizationTabType;
  onTabChange: (tab: OrganizationTabType) => void;
  className?: string;
}

export function OrganizationTabNav({
  activeTab,
  onTabChange,
  className = "",
}: OrganizationTabNavProps) {
  const tabItems = [
    {
      key: "organization" as OrganizationTabType,
      label: "조직도",
    },
    {
      key: "customers" as OrganizationTabType,
      label: "고객",
    },
    {
      key: "family" as OrganizationTabType,
      label: "세라젬 패밀리",
    },
  ];

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => onTabChange(key as OrganizationTabType)}
        items={tabItems}
        className="px-4"
        tabBarStyle={{
          marginBottom: 0,
          borderBottom: "none",
        }}
      />
    </div>
  );
}
