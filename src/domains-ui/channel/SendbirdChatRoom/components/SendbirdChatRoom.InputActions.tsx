import { GroupChannel } from "@sendbird/chat/groupChannel";
import { useGroupChannelContext } from "@sendbird/uikit-react/GroupChannel/context";
import { PhotoIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import styles from "./SendbirdChatRoom.InputActions.module.css";
import {
  useFileUploadAcceptList,
  sendFileMessage,
  getSendirdFileMessageParamsList,
} from "@/domains/message";

export interface SendbirdChatRoomInputActionsProps {
  channel: GroupChannel;
}

export function SendbirdChatRoomInputActions({
  channel,
}: SendbirdChatRoomInputActionsProps) {
  const channelUrl = channel?.url || "";

  const { sendFileMessage: sendbirdFileMessage, scrollToBottom } =
    useGroupChannelContext();

  const { data: acceptFile } = useFileUploadAcceptList("CHAT_FILE");
  const { data: acceptMedia } = useFileUploadAcceptList("CHAT_MEDIA");

  const handleSendFileMessage = async (
    event: React.ChangeEvent<HTMLInputElement>,
    isOnlyFile: boolean
  ) => {
    // const files: FileList | null = isDragDropSend //CHECK
    // ? dragDropFiles
    // : event?.target?.files

    const files = event.target.files as FileList;
    const imageGrouping = isOnlyFile ? false : true;

    sendFileMessage(
      channelUrl,
      files,
      { imageGrouping },
      {
        onOverSize() {
          // setErrorMessage( //CHECK
          //   errorMessage ||
          //     '사이즈가 커서 전송할 수 없습니다. 다른 파일 또는 압축 후 전송해 주세요.',
          // )
          //  '이미지 사이즈가 커서 전송할 수 없습니다. 다른 이미지 또는 압축 후 전송해 주세요.', //CHECK
          // setOpenErrorAlert(true) //CHECK
          // setIsDragDropSend(false)
          //'파일 사이즈가 커서 전송할 수 없습니다. 다른 파일 또는 압축 후 전송해 주세요.', //CHECK  (onlyFile)
        },
        // onSended() { //CHECK 사용안함
        //   // setSendFiles((prev) => ({ //CHECK
        //   //   ...prev,
        //   //   [fileType]: fileGroups[fileType][numericIdx],
        //   // }));
        // },
        onError() {},
        onUploaded(resultData, fileRatio) {
          // setFileRatio(_fileRatio) //CHECK
          // setTotalFiles(fileCount)
          console.log(resultData);
          const paramsList = getSendirdFileMessageParamsList(resultData, {
            fileRatio,
            // expiredSecond  //TODO: 타이머 삭제 기능
          });
          for (const params of paramsList) {
            console.log(params);
            sendbirdFileMessage(params)
              .then(() => {
                scrollToBottom();
              })
              .catch((error: any) => {
                console.log(error);
              });
          }
        },
      }
    );

    event.target.value = "";
  };

  // useEffect(() => { //CHECK: 패밀리타운에 구현되오있는 기능
  //   if (isDragDropSend) sendFileMessage_()
  // }, [isDragDropSend])

  return (
    <div className={styles.chat_messages_input_add}>
      <div>
        <input
          id="icon-button-file"
          type="file"
          multiple={true}
          accept={acceptMedia}
          max={5}
          maxLength={5}
          style={{ display: "none" }}
          onChange={(e) => handleSendFileMessage(e, false)}
        />
        <label htmlFor="icon-button-file">
          <PhotoIcon className="chat_gallery w-6 h-6" />
        </label>
      </div>

      <div>
        <input
          id="icon-button-onlyFile"
          type="file"
          multiple={false}
          accept={acceptFile}
          max={5}
          maxLength={5}
          style={{ display: "none" }}
          onChange={(e) => handleSendFileMessage(e, true)}
        />
        <label htmlFor="icon-button-onlyFile">
          <PaperClipIcon className="chat_chat w-6 h-6" />
        </label>
      </div>

      {/* <div>     //CHECK: 이모티콘 패밀리타운에는 구현되어 있음
        <Popover
          arrow={false}
          open={isEmoticonView}
          overlayInnerStyle={{
            marginBottom: width < 1150 ? "190px" : "0px",
          }}
          placement={width > 1150 ? "topLeft" : "topRight"}
          title={
            <div className={styles.icon_title_list}>
              <div className="title_emoticon_layout" onWheel={handleMouseWheel}>
                <Swiper
                  ref={swiperRef}
                  slidesPerView={
                    emoticons && emoticons?.length < 4
                      ? 2 + emoticons?.length
                      : 6
                  }
                  grabCursor={true}
                  spaceBetween={30}
                  navigation={{
                    enabled: true,
                    nextEl: ".custom-next-button",
                    prevEl: ".custom-prev-button",
                  }}
                  modules={[Pagination, Navigation]}
                >
                  <SwiperSlide>
                    <div
                      onClick={() => {
                        setRecentImage(recentSelected);
                        setSmileMeImage(smileMeOff);
                        setSelectedGroupEmoticon("");
                      }}
                      className={styles.icon_title_recent}
                    >
                      <img src={recentImage} alt="recentImage" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div
                      onClick={() => {
                        setRecentImage(recent);
                        setSmileMeImage(smileMeOn);
                        setSelectedGroupEmoticon("");
                      }}
                      className={styles.icon_title_status}
                    >
                      <Image
                        src={smileMeImage}
                        alt="smileMeImage"
                        preview={false}
                        fallback={thumbnailNoImage}
                      />
                    </div>
                  </SwiperSlide>

                  {emoticons &&
                    emoticons?.map(
                      (emoticon: EmoticonGroupType, index: number) => {
                        return (
                          <SwiperSlide
                            style={{
                              marginRight: "10px !important",
                            }}
                            key={"emoticon_" + emoticon.code + index}
                          >
                            <div
                              onClick={() => {
                                setRecentImage(recent);
                                setSmileMeImage(smileMeOff);
                                setSelectedGroupEmoticon(emoticon.code);
                                setEmoticonDetails(emoticon.emoticons);
                              }}
                              style={{
                                borderRadius: "8px",
                                padding: "2px",
                              }}
                              className={styles.icon_title_caractor}
                            >
                              <Image
                                src={
                                  selectedGroupEmoticon === emoticon.code
                                    ? import.meta.env.VITE_BASE_DOMAIN +
                                      emoticon.url.tab_on
                                    : import.meta.env.VITE_BASE_DOMAIN +
                                      emoticon.url.tab_off
                                }
                                alt="emoticon"
                                preview={false}
                                fallback={thumbnailNoImage}
                              />
                            </div>
                          </SwiperSlide>
                        );
                      }
                    )}

                  <div
                    className="custom-prev-button"
                    onClick={goToPrevSlide}
                  ></div>

                  <div
                    className="custom-next-button"
                    onClick={goToNextSlide}
                  ></div>
                </Swiper>
              </div>
              <div className={styles.title_layout}>
                <div
                  style={{
                    width: "1px",
                    height: "24px",
                    background: "#D8D8D8",
                  }}
                ></div>
                <div
                  className={styles.icon_box}
                  onClick={() => {
                    setIsViewEmoticonList(true);
                    setIsModalEmoticonBox(true);
                    setIsEmoticonView(false);
                    setIsSearchEmoticonAll(false);
                  }}
                >
                  <img src={emoBox} alt="emoBox" />
                </div>
                <div
                  className={styles.icon_setting}
                  onClick={() => {
                    setIsModalEmoticonSetting(true);
                    setIsEmoticonView(false);
                  }}
                >
                  <img src={set} alt="set" />
                </div>
              </div>
            </div>
          }
          content={
            <div className={styles.icon_list_wrap}>
              <div
                style={{
                  gridTemplateColumns:
                    recentEmoticonList && recentEmoticonList?.length > 0
                      ? "repeat(4, 1fr)"
                      : "repeat(1, 1fr)",
                }}
                className={styles.iconList}
              >
                {recentImage === recentSelected ? (
                  recentEmoticonList && recentEmoticonList?.length > 0 ? (
                    recentEmoticonList?.map(
                      (emoticon: EmoticonType, index: number) => {
                        return (
                          <div
                            key={"recentEmoticon_" + emoticon.code}
                            className={styles.iconListItem}
                          >
                            <Image
                              onClick={() => {
                                setSelectedDetailEmoticon(emoticon);
                                setSendIcon(
                                  import.meta.env.VITE_BASE_DOMAIN +
                                    emoticon.url.origin
                                );
                                setIsPreview(true);
                                setSelectBubbleImage(
                                  import.meta.env.VITE_BASE_DOMAIN +
                                    emoticon.url.origin
                                );
                                setSelectEmoticon(emoticon);
                                focusableDivRef?.current?.focus();
                              }}
                              src={
                                import.meta.env.VITE_BASE_DOMAIN +
                                emoticon.url.thumbnail
                              }
                              alt="thumbnailFileUrl"
                              preview={false}
                              fallback={thumbnailNoImage}
                            />
                          </div>
                        );
                      }
                    )
                  ) : (
                    <div className={styles.recentEmoticonsEmpty}>
                      최근 사용한 이모티콘이 없습니다.
                    </div>
                  )
                ) : null}
              </div>

              {smileMeImage === smileMeOn ? (
                <>
                  {smileMes && isEmpty(smileMes) ? (
                    <div className={styles.smileMeEmptyWrap}>
                      <div className={styles.smileMeEmptyContent}>
                        <div>
                          <img
                            className={styles.smileMeEmptyImg}
                            src={emptySmileMe}
                            alt="emptySmileMe"
                          />
                        </div>
                        <div>
                          내 얼굴이 이모티콘이 되는
                          <span className={styles.primary}> 스마일미</span>는
                          모바일에서 만들 수 있습니다!
                        </div>
                      </div>
                      <div
                        className={styles.smileMebutton}
                        onClick={() => {
                          setOpenModalQR(true);
                          setIsEmoticonView(false);
                        }}
                      >
                        패밀리타운 앱 바로 가기
                      </div>
                      <div className={styles.smileMeinfo}>
                        <div>
                          <img src={information} alt="information" />
                        </div>
                        <div>
                          저작권에 위반되는 자료 배포에 대한 책임은 사용자
                          본인에게 있습니다.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.iconList}>
                      {smileMes?.map((smileMe: SmileMeType, index: number) => {
                        return (
                          <div
                            key={"smileMe_" + smileMe.id}
                            className={styles.iconListItem}
                            onMouseOver={() => setDeleteSmileMeIcon(smileMe.id)}
                            onMouseOut={() => setDeleteSmileMeIcon(0)}
                          >
                            {deleteSmileMeIcon === smileMe.id ? (
                              <div className={styles.smileMeDelete}>
                                <img
                                  src={close_s}
                                  alt="smileMe_delete"
                                  width="16px"
                                  onClick={() => {
                                    setModalDeleteSmileMe(true);
                                    setSelectedSmileMeId(smileMe.id);
                                    setIsEmoticonView(false);
                                  }}
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                            <Image
                              onClick={() => {
                                setSelectedDetailEmoticon({
                                  code: "smile_me_" + smileMe.id,
                                  name: {
                                    ko: "smile_me_" + smileMe.id,
                                    en: "smile_me_" + smileMe.id,
                                  },
                                  emoticonId: "0",
                                  resource: {
                                    origin: smileMe.originFileUrl,
                                    thumbnail: smileMe.thumbnailFileUrl,
                                  },
                                  sequence: 0,
                                  url: {
                                    origin: smileMe.originFileUrl,
                                    thumbnail: smileMe.thumbnailFileUrl,
                                  },
                                });
                                setSelectEmoticon({
                                  code: "smile_me_" + smileMe.id,
                                  name: {
                                    ko: "smile_me_" + smileMe.id,
                                    en: "smile_me_" + smileMe.id,
                                  },
                                  emoticonId: "0",
                                  resource: {
                                    origin: smileMe.originFileUrl,
                                    thumbnail: smileMe.thumbnailFileUrl,
                                  },
                                  sequence: 0,
                                  url: {
                                    origin: smileMe.originFileUrl,
                                    thumbnail: smileMe.thumbnailFileUrl,
                                  },
                                });

                                setSelectedSmileMe(smileMe);
                                setSendIcon(
                                  import.meta.env.VITE_BASE_DOMAIN +
                                    smileMe.originFileUrl
                                );
                                setIsPreview(true);
                                setSelectBubbleImage(
                                  import.meta.env.VITE_BASE_DOMAIN +
                                    smileMe.originFileUrl
                                );
                                focusableDivRef?.current?.focus();
                              }}
                              src={
                                import.meta.env.VITE_BASE_DOMAIN +
                                smileMe.thumbnailFileUrl
                              }
                              alt="thumbnailFileUrl"
                              preview={false}
                              fallback={thumbnailNoImage}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : null}
              <div className={styles.iconList}>
                {selectedGroupEmoticon !== "" &&
                  emoticonDetails &&
                  emoticonDetails.map(
                    (emoticon: EmoticonType, index: number) => {
                      return emoticon.emoticonId.includes(
                        selectedGroupEmoticon
                      ) ? (
                        <div
                          key={"emoticonDetail_" + emoticon.code}
                          className={styles.iconListItem}
                        >
                          <Image
                            onClick={() => {
                              setSelectedDetailEmoticon(emoticon);
                              setSendIcon(
                                import.meta.env.VITE_BASE_DOMAIN +
                                  emoticon.url.origin
                              );
                              setIsPreview(true);
                              setSelectBubbleImage(
                                import.meta.env.VITE_BASE_DOMAIN +
                                  emoticon.url.origin
                              );
                              setSelectEmoticon(emoticon);
                              focusableDivRef?.current?.focus();
                            }}
                            src={
                              import.meta.env.VITE_BASE_DOMAIN +
                              emoticon.url.thumbnail
                            }
                            alt="thumbnailFileUrl"
                            preview={false}
                            fallback={thumbnailNoImage}
                          />
                        </div>
                      ) : null;
                    }
                  )}
              </div>
            </div>
          }
          onOpenChange={handleOpenChange}
          trigger="click"
        >
          <img
            className="chat_emoji"
            src={isEmoticonView ? emoji_hover : emojiImage}
            onMouseOver={() => {
              setEmojiImage(emoji_hover);
            }}
            onMouseLeave={() => {
              setEmojiImage(emoji);
            }}
            onClick={() => {
              setIsEmoticonView(!isEmoticonView);
            }}
            width={24}
            height={24}
            alt="emoji"
          />
        </Popover>
      </div> */}
    </div>
  );
}
