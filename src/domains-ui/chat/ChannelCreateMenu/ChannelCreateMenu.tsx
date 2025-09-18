import { useState } from "react";
import {
  ChatBubbleLeftRightIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useDrawer } from "@/drawer-system";
import { Button } from "@/shared-ui";
import { ChannelParticipantSelector } from "../ChannelParticipantSelector";

type OptionItem = {
  id: string;
  label: string;
  icon: React.ElementType;
};

export interface ChannelCreateMenuProps {
  onChannelCreated?: () => void;
}

export function ChannelCreateMenu({
  onChannelCreated,
}: ChannelCreateMenuProps) {
  const { openDrawer } = useDrawer();

  const options: OptionItem[] = [
    { id: "direct", label: "1:1 대화형", icon: ChatBubbleLeftEllipsisIcon },
    { id: "group", label: "그룹 대화형", icon: ChatBubbleLeftRightIcon },
  ];

  const handleOptionClick = (optionId: string) => {
    openDrawer(
      <div className="flex flex-col gap-4 p-4">
        <ChannelParticipantSelector />
        <Button fullWidth onClick={() => console.log("대화방 만들기 클릭!")}>
          대화방 만들기
        </Button>
      </div>,
      {
        width: "max-w-full",
        title: "대화상대 선택",
      }
    );
  };

  return (
    <div className="flex gap-4">
      {options.map((option) => {
        const IconComponent = option.icon;
        return (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className="flex flex-1 items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200 cursor-pointer"
          >
            <IconComponent className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700 select-none">
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
