//in FamilTown: MessageInputBase.tsx
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { useGroupChannelContext } from "@sendbird/uikit-react/GroupChannel/context";
import { useState } from "react";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";
import styles from "./SendbirdChatRoom.InputBar.module.css";
import { MessageCustomType } from "@/domains/message";
import { useChannelStatus, CHANNEL_STATUS } from "@/domains/channel";

export const CHAT_STATUS_MESSAGES: Record<any, string> = {
  ACTIVE: "메세지 입력",

  /** 대화 상대가 없는 경우 */
  NO_MEMBERS: "대화 상대가 없습니다. 다시 초대하여 대화하세요",

  /** 탈퇴한 사용자인 경우 */
  USER_NOT_FOUND: "사용자를 찾을 수 없습니다.",

  /** 차단한 사용자인 경우 */
  BLOCKED_USER: "차단한 상대와 대화할 수 없습니다.",

  /** 대화방에서 나간 경우 */
  LEFT_CHAT: "대화 상대가 없습니다. 다시 초대하여 대화하세요",
};

export interface SendbirdChatRoomInputBarProps {
  channel: GroupChannel;

  // inputRef?: React.RefObject<TextAreaRef>;
}

export function SendbirdChatRoomInputBar({
  channel,
}: SendbirdChatRoomInputBarProps) {
  const { scrollToBottom, sendUserMessage: sendbirdUserMessage } =
    useGroupChannelContext();

  const channelStatus = useChannelStatus(channel.url);

  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState(false);
  const [sending, setSending] = useState(false);

  const sendMessage = () => {
    console.log("sendMessage");
    if (sending) return;

    // if (isEmoticon) {  //CHECK: 이모티콘
    //   setIsSending(true)
    //   onSend()

    //   setTimeout(() => setIsSending(false), 300)
    //   return
    // }

    // if (checkEmptyText(inputText)) { //TODO
    //   setInputText('')
    //   return
    // }

    setSending(true);

    const params = {
      message: message.trim(),
      customType: MessageCustomType.BEFAMILY,
      // expiredSecond: 0, //TODO 타이머 삭제 기능
    };

    // onSend={isPreview ? sendBubbleMessage_ : sendUserMessage_}   //CHECK: 패밀리타운에서 이모티콘에 따른 send방식 차이존재
    sendbirdUserMessage(params)
      .then(() => {
        setMessage("");
        scrollToBottom();
      })
      .catch((error: any) => {
        console.log(error);
      });

    setTimeout(() => {
      setSending(false);
    }, 300);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.key === "Enter" || event.keyCode === 13) && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={styles.chat_messages_input_textarea}
      style={{
        border: focused ? "1px solid #7940ff" : "1px solid #ffffff",
      }}
    >
      <div className={styles.inner}>
        <TextArea
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={message}
          size="large"
          placeholder={CHAT_STATUS_MESSAGES[channelStatus]}
          disabled={channelStatus !== CHANNEL_STATUS.ACTIVE}
          autoSize={{ minRows: 1, maxRows: 20 }}
          autoFocus={true}
          maxLength={5000}
          // maxLength={isPreview ? 30 : 5000} //CHECK: 패밀리타운에서 이모티콘 입력시 텍스트 제한 있음
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          // ref={inputRef}
        />

        <div
          onClick={sendMessage}
          className={styles.chat_messages_input_textarea_button}
          style={{ opacity: sending ? 0.7 : 1 }}
        >
          <img
            src={"/assets/images/chat/send.png"}
            height={50}
            width={50}
            alt="send"
          />
        </div>
      </div>
    </div>
  );
}
