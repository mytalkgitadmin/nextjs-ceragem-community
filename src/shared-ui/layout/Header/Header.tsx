"use client";

import {
  UserCircleIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export interface HeaderProps {
  title: string;
  showProfile?: boolean;
  showSettings?: boolean;
  showChat?: boolean;
  showOrganization?: boolean;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onChatClick?: () => void;
  onOrganizationClick?: () => void;
  className?: string;
}

export function Header({
  title,
  showProfile = false,
  showSettings = false,
  showChat = false,
  showOrganization = false,
  onChatClick,
  onProfileClick,
  onSettingsClick,
  onOrganizationClick,
  className = "",
}: HeaderProps) {
  return (
    <header
      className={`flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 ${className}`}
    >
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>

      <div className="flex items-center space-x-3">
        {showOrganization && (
          <button
            onClick={onOrganizationClick}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <UserGroupIcon className="w-6 h-6 text-gray-600" />
          </button>
        )}
        {showProfile && (
          <button
            onClick={onProfileClick}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <UserCircleIcon className="w-6 h-6 text-gray-600" />
          </button>
        )}

        {showChat && (
          <button
            onClick={onChatClick}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-gray-600" />
          </button>
        )}

        {showSettings && (
          <button
            onClick={onSettingsClick}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <Cog6ToothIcon className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>
    </header>
  );
}
