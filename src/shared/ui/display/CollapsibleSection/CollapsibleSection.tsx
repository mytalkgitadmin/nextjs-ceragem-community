import { Collapse } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

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

  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <Collapse
        defaultActiveKey={defaultActive ? ["1"] : []}
        ghost
        expandIcon={({ isActive }) =>
          isActive ? <UpOutlined /> : <DownOutlined />
        }
        className="bg-transparent"
      >
        <Panel
          header={
            <div className="flex items-center justify-between w-full">
              <span className="font-medium text-gray-900">{headerTitle}</span>
              {extra && <div className="mr-4">{extra}</div>}
            </div>
          }
          key="1"
          className="bg-white border-0 rounded-none"
        >
          <div className="space-y-2">{children}</div>
        </Panel>
      </Collapse>
    </div>
  );
}
