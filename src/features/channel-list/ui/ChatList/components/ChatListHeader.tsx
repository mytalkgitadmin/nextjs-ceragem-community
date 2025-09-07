import { useState } from "react";
import { IconButton } from "@/shared/ui/button";
import { SelectFriends } from "@/features/channel-create";

import styles from "./ChatListHeader.module.scss";

export default function ChatListHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className={`header ${styles.chat_header}`}>
      <h2>대화</h2>
      <div>
        {/* 대화방 만들기 */}
        <>
          <IconButton
            name="message-circle-plus"
            text="대화방 만들기"
            onClick={() => setIsOpen(true)}
          />
          <SelectFriends open={isOpen} onOpenChange={() => setIsOpen(false)} />
        </>

        {/* 대화방 검색 */}
        <IconButton name="search" text="대화방 검색" />

        {/* 대화방  */}
        <IconButton name="settings" text="대화방 설정" />
      </div>
    </header>
  );
}
