"use client";

import { TabNavigation, type TabItem } from "@/shared-ui";

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
  const tabs: TabItem[] = [
    {
      key: "organization",
      label: "조직도",
    },
    {
      key: "customers",
      label: "고객",
    },
    {
      key: "family",
      label: "세라젬 패밀리",
    },
  ];

  return (
    <div className="px-4 border-b border-gray-200">
      <TabNavigation
        tabs={tabs}
        activeKey={activeTab}
        onTabChange={(tabId) => onTabChange(tabId as OrganizationTabType)}
        className={className}
      />
    </div>
  );
}
