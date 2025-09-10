"use client";

import dynamic from "next/dynamic";

const ChatView = dynamic(
  () =>
    import("@/features/chat/ui/ChatView").then((mod) => ({
      default: mod.ChatView,
    })),
  {
    ssr: false,
  }
);

export default function ChatPage() {
  return <ChatView />;
}
