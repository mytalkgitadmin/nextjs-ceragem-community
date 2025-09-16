"use client";

import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ChatDrawerContentProps } from "./types";


export function ChatDrawerContent({
  chatInfo,
  messages = [],
  onSendMessage,
}: ChatDrawerContentProps) {
  const handleSendMessage = (message: string) => {
    onSendMessage?.(message);
  };

  return (
    <div className="h-full w-full flex flex-col min-h-0">
      <MessageList messages={messages} chatInfo={chatInfo} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
