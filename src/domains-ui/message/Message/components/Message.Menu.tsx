import { parseJson } from "@/shared/utils";
import { BaseMessage } from "@sendbird/chat/message";
import {
  UIMessageType,
  isNotImplementedUI,
  MESSAGE_MENU_CONFIG,
  getUIMessageType,
  MessageType,
  getDataForShare,
} from "@/domains/message";
import { useAuth } from "@/domains/auth";
import { ContextMenuWrapper, ContextMenuItem } from "@/shared-ui/feedback";
import { useDeliveryMessage } from "@/domains/message";

export interface MessageMenuProps {
  message: BaseMessage;
  children: React.ReactNode;
}

export const MessageMenu = ({ message, children }: MessageMenuProps) => {
  const { sendBirdId: mySendBirdId } = useAuth();
  const { mutate: deliveryMessage } = useDeliveryMessage();

  const uiType = getUIMessageType(mySendBirdId, message);
  const messageData = parseJson(message.data || "");
  const menuConfig = MESSAGE_MENU_CONFIG[uiType];

  if (!menuConfig) {
    return children;
  }

  const isMyMessage = mySendBirdId === message.sender?.userId;
  const resource = messageData?.resource;

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

  const shareText = () => {
    // TODO: 공유 기능 추가
    deliveryMessage(getDataForShare(message), {
      onSuccess: () => {
        // TODO: 공유 기능 추가
      },
    });
  };

  return (
    <ContextMenuWrapper
      items={[
        ...(!cantCopy
          ? [
              {
                id: "copy",
                label: "복사",
                onClick: () => {
                  copyText(message?.message || "");
                },
              },
            ]
          : []),
        ...(!cantEdit
          ? [
              {
                id: "edit",
                label: "편집",
                onClick: () => {
                  editText(message?.message || "");
                },
              },
            ]
          : []),
      ]}
      //   onOpen={() => {}}
      //   onClose={() => {}}
      triggerMode="contextmenu"
      placement="bottom-start"
    >
      {children}
    </ContextMenuWrapper>
  );
};
