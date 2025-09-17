"use client";

import { useState, useEffect, useMemo } from "react";
import { ChannelList } from "@/domains-ui/chat";

export function ChatListTab() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-full">
      <ChannelList />
    </div>
  );
}
