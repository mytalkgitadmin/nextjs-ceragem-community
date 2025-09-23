import { BaseMessage } from "@sendbird/chat/message";
import { isEmpty } from "lodash-es";
import { parseJson } from "@/shared/utils/stringUtils";

import {
  MessageCustomType,
  UIMessageType,
  MessageDataType,
  MessageType,
} from "../constants/messageEnum";
import { DeliveryMessageRequest } from "../api";

const IMAGE_FILE_TYPES = ["gif", "image", "webp"];
const CUSTOM_SYSTEM_MESSAGE_TYPES = [
  MessageDataType.UPDATE_TIMER_NOTI,
  MessageDataType.ALBUM_ADD_PHOTO,
  MessageDataType.ALBUM_ADD_LIKE,
];

/**
 * Sendbird 메시지 타입을 UI 메시지 타입으로 변환
 * @param userId 사용자 ID
 * @param message Sendbird 메시지
 * @returns UIMessageType
 */

export const getUIMessageType = (
  userId: string,
  message: BaseMessage
): UIMessageType => {
  const customType = message.customType;
  const messageType = message.messageType;
  const messageData = parseJson(message.data || ""); // JSON 파싱해서 data 가져오기
  const dataType = messageData?.type;
  const deleteUserIds =
    messageData?.deleteUsers?.map((user: any) => user.user_id) || [];

  if (
    message.data === "[TYPE_DELETED]" ||
    message.message === "[TYPE_DELETED]" ||
    message.data?.includes("[TYPE_DELETED]") ||
    deleteUserIds.includes(userId)
  ) {
    return UIMessageType.DELETED;
  }

  if (
    message.data?.includes(MessageDataType.UPDATED_TIMER_MESSAGE) ||
    message.data?.includes(MessageDataType.DELETED_TIMER_MESSAGE) ||
    dataType === MessageDataType.UPDATED_TIMER_MESSAGE ||
    dataType === MessageDataType.DELETED_TIMER_MESSAGE ||
    dataType === MessageDataType.MESSAGE_DELETED_ALL_SCREEN
  ) {
    return UIMessageType.INVISIBLE;
  }

  if (
    customType === MessageCustomType.SENDBIRD ||
    (customType === MessageCustomType.BEFAMILY &&
      (dataType === MessageDataType.USER_LEAVE ||
        dataType === MessageDataType.USER_JOIN ||
        dataType === MessageDataType.CHANNEL_KICK_USERS ||
        dataType === MessageDataType.CHANNEL_ASSIGN_MASTER))
  ) {
    // 1. System 메시지 판단
    return UIMessageType.SYSTEM;
  }

  // 2. BEFAMILY 커스텀 메시지들
  if (customType === MessageCustomType.BEFAMILY) {
    // 파일/이미지 메시지
    if (
      messageType === MessageType.FILE ||
      dataType === MessageDataType.MESSAGE_FILE
    ) {
      // 이미지인지 체크 (FileMessage의 경우)

      const firstResource = messageData.resource[0];
      if (IMAGE_FILE_TYPES.includes(firstResource.fileType)) {
        return UIMessageType.IMAGE;
      } else if (firstResource.fileType === "video") {
        return UIMessageType.VIDEO;
      }
      return UIMessageType.FILE;
    }

    // 연락처 메시지
    if (dataType === MessageDataType.MESSAGE_CONTACT) {
      return UIMessageType.CONTACT;
    }

    // 버블 메시지
    if (dataType === MessageDataType.MESSAGE_BUBBLE) {
      return UIMessageType.BUBBLE; // UI 미구현
    }

    // 조합 메시지들 (제휴사, 이벤트 등)
    if (
      [
        MessageDataType.MESSAGE_AFFILIATE,
        MessageDataType.MESSAGE_FAMILY_EVENT,
        MessageDataType.MESSAGE_CALENDAR_EVENT,
        MessageDataType.MESSAGE_DDAY_EVENT,
      ].includes(dataType as MessageDataType)
    ) {
      return UIMessageType.EVENT; // UI 미구현
    }

    // BeFamily 특수 메시지들
    if (CUSTOM_SYSTEM_MESSAGE_TYPES.includes(dataType as MessageDataType)) {
      return UIMessageType.SYSTEM;
    }

    // 답장 메시지
    if ((message as any).parentMessage) {
      return UIMessageType.REPLY;
    }

    return UIMessageType.TEXT;
  }

  return UIMessageType.TEXT;
};

/**
 * UI 미구현 메시지 타입인지 확인
 * @param uiType UI 메시지 타입
 * @returns 미구현 메시지 타입인지 여부
 */
export const isNotImplementedUI = (uiType: UIMessageType): boolean => {
  return [UIMessageType.BUBBLE, UIMessageType.EVENT].includes(uiType);
};

/**
 * 커스텀 시스템 메시지 타입인지 확인
 * @param dataType 메시지 데이터 타입
 * @returns 커스텀 시스템 메시지 타입인지 여부
 */
export const isCustomSystemMessageType = (
  dataType: MessageDataType
): boolean => {
  return CUSTOM_SYSTEM_MESSAGE_TYPES.includes(dataType);
};

/**
 * 메시지 텍스트에서 편집 프리픽스를 제거하는 유틸리티 함수
 * @param text - 처리할 메시지 텍스트
 * @returns 편집 프리픽스가 제거된 텍스트
 */
export function removeEditPrefix(text: string): string {
  const EDIT_PREFIX = "✍🏻 ";
  return text.startsWith(EDIT_PREFIX) ? text.slice(EDIT_PREFIX.length) : text;
}

/**
 * 메시지가 편집된 메시지인지 확인하는 유틸리티 함수
 * @param text - 확인할 메시지 텍스트
 * @returns 편집된 메시지인지 여부
 */
export function isEditedMessage(text: string): boolean {
  const EDIT_PREFIX = "✍🏻 ";
  return text.startsWith(EDIT_PREFIX);
}

/**
 * 메시지 공유를 위한 데이터 준비
 * @param message - 메시지
 * @returns 메시지 공유를 위한 데이터
 */
export function getDataForShare(message: BaseMessage): DeliveryMessageRequest {
  const getType = (messageType: MessageType) => {
    if (messageType === MessageType.ADMIN) {
      return "ADMM";
    } else if (messageType === MessageType.FILE) {
      return "FILE";
    } else if (messageType === MessageType.USER) {
      return "MESG";
    }
    return "MESG";
  };

  return {
    message: {
      customType: message?.customType || MessageCustomType.BEFAMILY,
      data: message?.data || "",
      message: message?.message || "",
      type: getType(message?.messageType),
    },
    target: {
      channelIds: [], //[localStorage.getItem("myChannel")],
      targetType: "CHANNEL",
    },
  };
}

export function canShareFileMessage(message: BaseMessage): boolean {
  if (message?.messageType === MessageType.FILE) {
    const messageData = parseJson(message.data || "");
    const resource = messageData?.resource || [];
    let isShared = true;
    let notSharedCnt = 0;

    for (const file of resource) {
      if (file?.shared === false) {
        isShared = false;
        notSharedCnt += 1;
      }
    }

    return !
  }
  return false;
}
