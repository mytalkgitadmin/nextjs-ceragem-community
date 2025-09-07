import { useCallback, useEffect, useRef, useState } from "react";

import { useSendbirdStateContext } from "@sendbird/uikit-react";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import {
  useGroupChannel,
  useGroupChannelContext,
} from "@sendbird/uikit-react/GroupChannel/context";
import type { UserMessageCreateParams } from "@sendbird/chat/message";

import { Icons } from "@/shared/ui/icon";
import { MessageCustomType } from "@/entities/message";
import { encryptData } from "@/entities/message/lib";

import styles from "./index.module.scss";
import { MESSAGE_LIMITS } from "@/entities/message/config/chat";
import { isValidMessage } from "@/entities/message/lib/message-validators";
import FileInput from "@/features/attachment-upload/ui/InputBox";

interface MessageInputProps {
  onSubmit?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}
export default function MessageInput({
  onSubmit,
  placeholder = "메시지를 입력하세요",
  disabled = false,
  maxLength = MESSAGE_LIMITS.MAX_LENGTH,
}: MessageInputProps) {
  const { currentChannel } = useGroupChannelContext();
  const store = useSendbirdStateContext();
  const sendUserMessage = sendbirdSelectors.getSendUserMessage(store);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const {
    actions: { scrollToBottom },
  } = useGroupChannel();

  useEffect(() => {
    if (!isSending && !disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSending, disabled]);

  /**
   * Sendbird를 통한 메시지 전송
   */
  const sendMessage = useCallback(() => {
    if (!inputRef.current || !currentChannel || isSending || disabled) {
      return;
    }

    const messageText = inputRef.current.value.trim();

    if (!isValidMessage(messageText)) {
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
      return;
    }
    setIsSending(true);

    const params: UserMessageCreateParams = {
      message: encryptData(messageText),
      customType: MessageCustomType.BEFAMILY,
    };

    sendUserMessage(currentChannel, params)
      .onPending(() => {
        // props: message
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      })
      .onFailed(() => {
        // props: error, message
        setIsSending(false);
      })
      .onSucceeded(() => {
        // props: message
        onSubmit?.(messageText);
        setIsSending(false);

        setTimeout(() => {
          scrollToBottom();
        }, 300);
      });
  }, [
    currentChannel,
    isSending,
    disabled,
    sendUserMessage,
    onSubmit,
    scrollToBottom,
  ]);

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      sendMessage();
    },
    [sendMessage]
  );

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );
  const isInputDisabled = disabled || isSending;

  return (
    <form onSubmit={handleFormSubmit} className={styles.formWrap}>
      <textarea
        ref={inputRef}
        className={styles.textarea}
        placeholder={placeholder}
        onKeyDown={handleOnKeyDown}
        disabled={isInputDisabled}
        maxLength={maxLength}
      />

      {/* 파일 전송 */}
      <div className={styles.buttons}>
        <FileInput />
        <button
          type="submit"
          className={`${styles.button} ${isSending ? styles.isSending : ""}`}
          disabled={isInputDisabled}
        >
          <Icons name="arrowUp" />
          <span className="a11y-hidden"> {isSending ? "전송 중" : "전송"}</span>
        </button>
      </div>
    </form>
  );
}
