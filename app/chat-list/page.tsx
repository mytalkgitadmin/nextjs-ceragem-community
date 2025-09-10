"use client";

import dynamic from "next/dynamic";

const ChatList = dynamic(
  () =>
    import("@/features/chat/ui/ChatList").then((mod) => ({
      default: mod.ChatList,
    })),
  {
    ssr: false,
  }
);

export default function ChatListPage() {
  return <ChatList />;
}
