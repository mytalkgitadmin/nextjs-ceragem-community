"use client";

import { useState, useEffect, useMemo } from "react";
import { SendbirdChannelList } from "@/domains-ui/chat";

export function ChatListPageChatListTab() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-full">
      <SendbirdChannelList />
    </div>
  );
}
