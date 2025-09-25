"use client";

import { useMemo } from "react";
import { useGroupChannelContext } from "@sendbird/uikit-react/GroupChannel/context";
import {
  isDeletedMessageToUser,
  getUIMessageType,
  isInvisibleMessage,
} from "@/domains/message";

export const useChannelMsgChainMap = (sendBirdId: string) => {
  const { messages } = useGroupChannelContext();

  const chainMap = useMemo(() => {
    if (!messages) {
      return new Map();
    }

    const visibleMessages = messages.filter((msg) => {
      if (isDeletedMessageToUser(msg, sendBirdId) || isInvisibleMessage(msg))
        return false;
      return true;
    });

    const map = new Map();
    visibleMessages.forEach((msg, index) => {
      const prev = visibleMessages[index - 1];
      const next = visibleMessages[index + 1];
      const userId = msg.sender?.userId;

      map.set(msg.messageId, {
        chainTop: prev?.sender?.userId === userId,
        chainBottom: next?.sender?.userId === userId,
      });
    });

    return map;
  }, [messages, sendBirdId]);

  return chainMap;
};

// const { message } = messageContent;

// if (isDeletedMessageToUser(message, sendBirdId)) {
//   return <div style={{ height: 0, overflow: 'hidden' }} />;
// }

// // ... 기타 조건들

// // ✅ 미리 계산된 체인 정보 사용
// const chainInfo = chainMap.get(message.messageId) || {
//   chainTop: false,
//   chainBottom: false
// };
