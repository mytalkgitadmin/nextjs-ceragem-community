import { parseJson } from "@/shared/utils";
import { BaseMessage } from "@sendbird/chat/message";
import {
  UIMessageType,
  MESSAGE_MENU_CONFIG,
  getUIMessageType,
  MessageType,
  getShareMessageRequestData,
  validateFileSharing,
  getShareFiles,
  type DeleteMessageRequestType,
  useDeliveryMessage,
  deleteMessage as deleteMessageAPI,
  getDeleteMessageRequestData,
} from "@/domains/message";
import { useAuth } from "@/domains/auth";
import { ContextMenuWrapper, ContextMenuItem } from "@/shared-ui/feedback";

import { downloadFile } from "@/shared/utils";
import { useChannelInfo } from "@/domains/channel";

export interface MessageMenuProps {
  message: BaseMessage;
  children: React.ReactNode;
}

export const MessageMenu = ({ message, children }: MessageMenuProps) => {
  const { sendBirdId: mySendBirdId } = useAuth();
  const { mutate: deliveryMessage } = useDeliveryMessage();
  const channelInfo = useChannelInfo(message.channelUrl);

  console.log(channelInfo);

  const uiType = getUIMessageType(mySendBirdId, message);
  const messageData = parseJson(message.data || "");
  const menuConfig = MESSAGE_MENU_CONFIG[uiType];

  if (!menuConfig) {
    return children;
  }

  const isMyMessage = mySendBirdId === message.sender?.userId;

  const cantCopy =
    !menuConfig.copy ||
    (uiType === UIMessageType.BUBBLE &&
      messageData?.bubbleType !== "Emoji_Bubble_None");
  const cantEdit = !menuConfig.edit || !isMyMessage;

  const copyText = (text: string) => {
    let tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    // showMessage('메시지가 복사되었습니다.') //TODO: 메시지 복사 알림 추가
  };

  const validate = (message: BaseMessage) => {
    const { canShare, status } = validateFileSharing(message);
    if (canShare) {
      if (status === "partial_shared") {
        //setToastMessage('공유가 허용되지 않은 콘텐츠는 제외됩니다. ') //TODO
      }
      return true;
    } else {
      // setToastMessage('공유가 허용되지 않은 콘텐츠 입니다.') //TODO
      return false;
    }
  };

  const shareToMyMemo = (message: BaseMessage) => {
    //CHECK: 패밀리타운 My 메모 추가 필요
    if (validate(message)) {
      deliveryMessage(
        getShareMessageRequestData(message, {
          channelIds: [], // [localStorage.getItem("myChannel")], // MY 채널 id
          targetType: "CHANNEL",
        }),
        {
          onSuccess: () => {
            // showMessage('메시지를 전달하였습니다.')
          },
          onError: (error) => {
            // setErrorMessage(e.response.data?.localeMessage) // 오류 모달
            // setOpenAlert(true)
          },
        }
      );
    }
  };

  const share = (message: BaseMessage) => {
    if (validate(message)) {
      //setOpenModalShare(true) //TODO: 공유 모달 추가
    }
  };

  const download = async (message: BaseMessage) => {
    if (validate(message)) {
      //setOpenModalDownload(true) //TODO: 다운로드 모달 추가
      const shareFiles = getShareFiles(message);

      for (const file of shareFiles) {
        await downloadFile(file?.originalUrl, file?.originalFileName);
      }
    }
  };

  const deleteMessage = async (
    message: BaseMessage,
    type: DeleteMessageRequestType
  ) => {
    const channelId = channelInfo.channelId;
    if (type === "ALL") {
      // CHECK: 패밀리타운은 '내화면만', '친구화면까지' 삭제 옵션 존재
    } else {
      // 내 화면만 삭제
      deleteMessageAPI(getDeleteMessageRequestData(channelId, message, type));
    }
  };

  const items: ContextMenuItem[] = [];
  if (!cantCopy) {
    items.push({
      id: "copy",
      label: "복사",
      onClick: () => copyText(message?.message || ""),
    });
  }
  // if (menuConfig.mymemo) {  //CHECK: 패밀리타운 My 메모 추가 필요
  //   items.push({
  //     id: "mymemo",
  //     label: "MY 메모",
  //     onClick: () => {
  //       shareToMyMemo(message);
  //     },
  //   });
  // }
  if (menuConfig.share) {
    items.push({
      id: "share",
      label: "전달",
      onClick: () => share(message),
    });
  }
  if (menuConfig.download) {
    items.push({
      id: "download",
      label: "저장",
      onClick: () => download(message),
    });
  }
  if (menuConfig.delete) {
    items.push({
      id: "delete",
      label: "삭제",
      onClick: () => {
        // CHECK: 패밀리타운에서는 체크박스 활성화 (다중 선택 삭제)
        // TODO: 삭제하기 모달 추가
      },
    });
  }
  if (!cantEdit) {
    items.push({
      id: "edit",
      label: "편집",
      onClick: () => {
        //TODO : input에 text 추가
        //TODO: Context Bar 표시
        //TODO: 편집중이라는 상태를 channel 글로벌 상태로 관리
      },
    });
  }
  if (menuConfig.reply) {
    items.push({
      id: "reply",
      label: "답장",
      onClick: () => {
        //TODO: input focus
        //TODO: Context Bar 표시
        //TODO: 답장중이라는 상태를 channel 글로벌 상태로 관리
      },
    });
  }

  return (
    <ContextMenuWrapper
      items={items}
      //   onOpen={() => {}}
      //   onClose={() => {}}
      triggerMode="contextmenu"
      placement="bottom-start"
    >
      {children}
    </ContextMenuWrapper>
  );
};
