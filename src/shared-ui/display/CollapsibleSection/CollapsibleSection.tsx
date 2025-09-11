"use client";

import { Collapse, type CollapseProps } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

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
  const headerTitle = count !== undefined ? `${title} (${count})` : title;

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex items-center justify-between w-full">
          <span className="font-medium text-gray-900 text-sm">
            {headerTitle}
          </span>
          {extra && <div onClick={(e) => e.stopPropagation()}>{extra}</div>}
        </div>
      ),
      children: <div className="space-y-2">{children}</div>,
    },
  ];

  return (
    <div className={className}>
      <Collapse
        items={items}
        defaultActiveKey={defaultActive ? ["1"] : []}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            rotate={isActive ? 90 : 0}
            className="text-gray-400"
          />
        )}
        ghost
        size="small"
        className="bg-white border-b border-gray-200"
      />
    </div>
  );
}
