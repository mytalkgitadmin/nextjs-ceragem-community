import { useState, useEffect } from "react";
import { BaseMessage } from "@sendbird/chat/message";
import {
  extractNamesFromMessageForSysMsg,
  insertNamesIntoSysMsg,
  SYSTEM_MESSAGE_TEMPLATES,
  isCustomSystemMessageType,
  extractNameFromMessageForCustomSysMsg,
  insertNamesIntoCustomSysMsg,
  CUSTOM_SYSTEM_MESSAGE_TEMPLATES,
  MessageDataType,
  getTimerMessage,
} from "@/domains/message";
import { parseJson } from "@/shared/utils";
import styles from "./SystemMessage.module.css";

interface SystemMessageProps {
  message: BaseMessage;
}

export const SystemMessage = ({ message }: SystemMessageProps) => {
  const [text, setText] = useState("");
  const data = parseJson(message.data || "");
  const isCustom = isCustomSystemMessageType(data.type);
  // const [reInvite, setReInvite]: any = useState([]); // Q: ???

  useEffect(() => {
    if (!isCustom) {
      extractNamesFromMessageForSysMsg(message).then((names) => {
        const template =
          SYSTEM_MESSAGE_TEMPLATES[
            data.type as keyof typeof SYSTEM_MESSAGE_TEMPLATES
          ];
        const text = template ? insertNamesIntoSysMsg(template, names) : "";
        setText(text);
      });
    } else {
      extractNameFromMessageForCustomSysMsg(message).then((name) => {
        const data = parseJson(message.data || "");
        const template =
          CUSTOM_SYSTEM_MESSAGE_TEMPLATES[
            data.type as keyof typeof CUSTOM_SYSTEM_MESSAGE_TEMPLATES
          ];

        let text = "";
        if (data.type === MessageDataType.UPDATE_TIMER_NOTI) {
          const timer = getTimerMessage(data?.timerSecond || 0);
          text = insertNamesIntoCustomSysMsg(template, { name, timer });
        } else {
          text = insertNamesIntoCustomSysMsg(template, { name });
        }
        setText(text);
      });
    }
  }, [message, isCustom]);

  return (
    <div className={styles.chat_message_content_wrap}>
      <div className={styles.chat_message}>{text}</div>
      {/* {reInvite && // Q: ???
        reInvite.length > 0 &&
        reInvite.map((invite: any, index: number) => {
          return (
            <div key={`invite-${index}`} className={styles.chat_message}>
              {resultMessage}
            </div>
          );
        })} */}
    </div>
  );
};
