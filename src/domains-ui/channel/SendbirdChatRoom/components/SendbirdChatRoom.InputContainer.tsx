//in FamilTown: CustomizedMessageInput.tsx

import styles from "./SendbirdChatRoom.InputContainer.module.css";
import { SendbirdChatRoomInputBar } from "./SendbirdChatRoom.InputBar";
import { SendbirdChatRoomInputActions } from "./SendbirdChatRoom.InputActions";
import { GroupChannel } from "@sendbird/chat/groupChannel";

export interface SendbirdChatRoomInputContainerProps {
  channel: GroupChannel;
}

export function SendbirdChatRoomInputContainer({
  channel,
}: SendbirdChatRoomInputContainerProps) {
  return (
    <div className={`${styles.message_center_wrap} ${styles.message_input}`}>
      <div className={styles.chat_messages_footer}>
        {false ? (
          <>
            {/* <MessageEditor  //TODO: 메시지 편집 추후 구현
              editMessage={editMessage}
              setEditMessage={setEditMessage}
              channel={channel}
              hasTimer={hasTimer}
              timerSecond={timerSecond}
              inputRef={textInputRef}
            /> */}
          </>
        ) : false ? (
          <>
            {/* <MessageReply    //TODO: 응답 메시지 추후 구현
            channel={channel}
            hasTimer={hasTimer}
            timerSecond={timerSecond}
            inputRef={textInputRef}
            parentMessage={parentMessage}
            setParentMessage={setParentMessage}
            channelInfo={channelInfo}
          /> */}
          </>
        ) : (
          <>
            <div className={styles.chat_messages_input_wrap}>
              {/* {isPreview && (   //CHECK: 패밀리타운에 구현되어 있음 (이모티콘 전송 시 이모티콘 미리보기, ContextBar(예정))
                <PreviewEmoticonMessage
                  inputText={inputText}
                  sendIcon={sendIcon}
                  onClose={() => {
                    setSendIcon(undefined);
                    setIsPreview(false);
                  }}
                />
              )} */}
              <SendbirdChatRoomInputBar channel={channel} />
              <SendbirdChatRoomInputActions channel={channel} />
            </div>
          </>
        )}

        {/* <CommonModal    //CHECK: 패밀리 타운에 구현되어 있음 (내 이모티콘 편집 모달(이모티콘 삭제 및 순서 편집))
          open={isModalEmoticonSetting}
          setOpen={setIsModalEmoticonSetting}
          afterClose={() => {
            if (emoticons) {
              setIsEmoticonView(true);
              setIsDetailEmoticon(false);
            }
          }}
          bodyStyle={{
            height: "600px",
            maxHeight: "600px",
            overflow: "hidden",
            overflowY: "auto",
          }}
          title={"내 이모티콘 편집"}
          draggle={false}
          body={
            <ModalEmoticonSetting
              emoticons={emoticons}
              setEmoticons={setEmoticons}
              setIsModalEmoticonBox={setIsModalEmoticonBox}
              setIsModalEmoticonSetting={setIsModalEmoticonSetting}
              handleDeleteEmoticon={handleDeleteEmoticon}
            />
          }
          isFooter={false}
        /> */}

        {/* {allEmoticons && allEmoticons.length > 0 && (
          <CommonModal   //CHECK: 패밀리 타운에 구현되어 있음 (이모티콘 박스 모달(꺼낼 수 있는 이모티콘 리스트))
            open={isModalEmoticonBox}
            setOpen={setIsModalEmoticonBox}
            afterClose={() => {
              if (!isModalEmoticonSetting) {
                setIsEmoticonView(true);
                setIsDetailEmoticon(false);
                setIsSearchEmoticonAll(true);
              }
            }}
            bodyStyle={{
              padding: isDetailEmoticon ? "0px" : "20px",
              backgroundColor: isDetailEmoticon ? "#fff" : "#efefef",
              height: "600px",
              maxHeight: "600px",
              overflow: isDetailEmoticon ? "none" : "hidden",
              overflowY: isDetailEmoticon ? "hidden" : "auto",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
            prefix={
              isDetailEmoticon ? (
                <ModalHeaderButton onClick={() => handleModalBack()} />
              ) : (
                <></>
              )
            }
            title={isDetailEmoticon ? "이모티콘 상세" : "이모티콘 Box"}
            draggle={false}
            body={
              isDetailEmoticon ? (
                <ModalEmoticonBoxDetail
                  emoticon={emoticonBoxSelectIcon}
                  handleDownloadEmoticon={handleDownloadEmoticon}
                  setIsModalEmoticonBox={setIsModalEmoticonBox}
                />
              ) : (
                <ModalEmoticonBox
                  setEmoticonBoxSelectIcon={setEmoticonBoxSelectIcon}
                  handleDownloadEmoticon={handleDownloadEmoticon}
                  setIsDetailEmoticon={setIsDetailEmoticon}
                  setIsModalEmoticonBox={setIsModalEmoticonBox}
                  setIsModalEmoticonSetting={setIsModalEmoticonSetting}
                  emoticons={allEmoticons}
                />
              )
            }
            isFooter={false}
          />
        )} */}

        {/* <ConfirmModal    // CHECK: 패밀리 타운에 구현되어 있음 (에러 모달)
          open={openErrorAlert}
          setOpen={setOpenErrorAlert}
          title={
            <>
              <ExclamationCircleOutlined style={{ color: "red" }} /> 확인
            </>
          }
          body={<div>{errorMessage}</div>}
          isAlert={true}
        /> */}

        {/* <ConfirmModal    // CHECK: 패밀리 타운에 구현되어 있음 (스마일미 삭제 확인 모달)
          open={modalDeleteSmileMe}
          setOpen={setModalDeleteSmileMe}
          title="스마일미 삭제"
          body={
            <div>
              선택한 스마일미를 삭제할까요?
              <br />
              삭제한 스마일미는 복구할 수 없습니다.
            </div>
          }
          maskClosable={false}
          action={() => handleDeleteSmileMe()}
          cancelAfterAction={() => {
            setRecentImage(recent);
            setSmileMeImage(smileMeOn);
            setSelectedGroupEmoticon("");
            setIsEmoticonView(true);
          }}
        /> */}

        {/* <CommonModal   //CHECK: 패밀리 타운에 구현되어 있음 (QR로 패밀리타운 앱 바로 갈수 있어요.(스마일미))
          open={openModalQR}
          setOpen={setOpenModalQR}
          title={""}
          isTitle={false}
          body={<ModalInstallQr />}
          isFooter={false}
          afterClose={() => setIsEmoticonView(true)}
        /> */}
      </div>
    </div>
  );
}
