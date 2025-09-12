"use client";

import { Button } from "antd";
import { MessageOutlined, SettingOutlined } from "@ant-design/icons";

export interface OrganizationHeaderProps {
  title: string;
  onChatClick?: () => void;
  onSettingsClick?: () => void;
}

export function OrganizationHeader({
  title,
  onChatClick,
  onSettingsClick,
}: OrganizationHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      {/* 제목과 버튼들 */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>

        <div className="flex items-center space-x-2">
          <Button
            type="text"
            shape="circle"
            icon={<MessageOutlined />}
            onClick={onChatClick}
            className="text-gray-600 hover:text-blue-500"
          />
          <Button
            type="text"
            shape="circle"
            icon={<SettingOutlined />}
            onClick={onSettingsClick}
            className="text-gray-600 hover:text-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
