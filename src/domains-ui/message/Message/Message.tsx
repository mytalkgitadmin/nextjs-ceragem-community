import { useAuth } from "@/domains/auth";
import { BaseMessage } from "@sendbird/chat/message";
import { UIMessageType } from "@/domains/message";
import styles from "./Message.module.css";
import {
  MessageProfile,
  MessageContent,
  MessageUnread,
  MessageMenu,
} from "./components";
import { useMyChatSettingsStore } from "@/domains/settings";
import { formatTime } from "@/shared/utils/dateUtils";
import { ContextMenuWrapper } from "@/shared-ui/feedback";

export interface MessageProps {
  message: BaseMessage;
  chainTop?: boolean;
  chainBottom?: boolean;
}

export const Message = ({
  message,
  chainTop = false,
  chainBottom = false,
}: MessageProps) => {
  const { sendBirdId: mySendBirdId } = useAuth();
  const { fontSize } = useMyChatSettingsStore();

  const isMyMessage = mySendBirdId === message.sender?.userId;
  const showProfile = !isMyMessage && !chainTop;
  const showSenderName = !isMyMessage && !chainTop;
  const showTime = !chainBottom;
  const senderName = message.sender?.nickname || "사용자";
  const createdAt = message.createdAt;

  return (
    <>
      <div
        className={`${styles.container} ${isMyMessage ? styles.my : styles.receiver}`}
      >
        {/*     // CHECK: 삭제 모드 체크 박스 세라젬에서는 제외
        {chatDeleteMode && (
          <DeleteCheckBox
            message={messageData.message}
            channelId={channelInfo?.channelId}
            chatDeleteMode={chatDeleteMode}
          />
        )}*/}

        <div className={styles.message}>
          {/* 받은 메시지일 경우 프로필,닉네임 표시 */}
          {showProfile && <MessageProfile message={message} />}

          <div className={styles.content_wrap}>
            <MessageMenu message={message}>
              <div
                className={styles.contents}
                // onContextMenu={handleContextMenu}
              >
                {/* 메시지 fontSize를 인라인 스타일로 적용 - 사용자 사이즈 조절 */}
                <div style={{ fontSize }} className={styles.contents_inner}>
                  <MessageContent />
                </div>

                {/*  메시지 메뉴 */}

                {/* {!chatDeleteMode &&
                selectedMessageId === messageData?.message?.messageId && (
                  <MessageMenu
                    type={!isSender ? "RECIEVER" : null}
                    copyDisabled={copyDisabled === true ? true : false}
                    channelInfo={channelInfo}
                    message={messageData}
                    openMessageControl={openMessageControl}
                    setOpenMessageControl={setOpenMessageControl}
                    handleMessageDelete={handleMessageDelete}
                    setOpenModalShare={setOpenModalShare}
                    setEditMessage={setEditMessage}
                    setParentMessage={setParentMessage}
                    // file
                    setToastMessage={setToastMessage}
                    fileResource={
                      data?.type !== "MESSAGE_BUBBLE" && data?.resource
                    }
                  />
                )} */}
              </div>
            </MessageMenu>

            <div className={styles.date_unread}>
              {/* 읽음여부 */}
              <MessageUnread message={message} />

              {/* 시간 */}
              {showTime && (
                <span className={styles.message_date}>
                  {createdAt ? formatTime(createdAt) : ""}
                </span>
              )}
            </div>
          </div>

          {/*    // 일정 등록 버튼   //TODO: 추후 구현
          {(showScheduleRegisterButton || isEditedMessage) && (
            <div className={styles.add_content}>
              
              {showScheduleRegisterButton && messageData?.message && (
                <div className={styles.calendarBtn}>
                  <ScheduleRegisterButton
                    message={messageData.message.message}
                    channelInfo={channelInfo}
                  ></ScheduleRegisterButton>
                </div>
              )}

              {isEditedMessage && <p className={styles.editText}>편집됨</p>}
            </div>
          )} */}
        </div>
      </div>

      {/* <CommonModal  //TODO: 추후 구현
        open={openModalShare}
        setOpen={setOpenModalShare}
        title={"전달할 친구 선택"}
        body={
          <ModalShare
            setOpenModal={setOpenModalShare}
            message={newMessageObj}
          />
        }
        isFooter={false}
        draggle={false}
        centered={true}
      /> */}
    </>
  );
};
