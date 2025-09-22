import { BaseMessage } from "@sendbird/chat/message";
import { isEmpty } from "lodash-es";
import { parseJson } from "@/shared/utils/stringUtils";

import {
  MessageCustomType,
  UIMessageType,
  MessageDataType,
  MessageType,
} from "../constants/messageEnum";

const IMAGE_FILE_TYPES = ["gif", "image", "webp"];

/**
 * Sendbird 메시지 타입을 UI 메시지 타입으로 변환
 * @param sendBirdId Sendbird 사용자 ID
 * @param message Sendbird 메시지
 * @returns UIMessageType
 */

export const getUIMessageType = (
  sendBirdId: string,
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
    deleteUserIds.includes(sendBirdId)
  ) {
    return UIMessageType.DELETED;
  }

  if (
    message.data?.includes("UPDATED_TIMER_MESSAGE") ||
    message.data?.includes("DELETED_TIMER_MESSAGE")
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
    // 1. ADMIN 메시지 판단
    return UIMessageType.ADMIN;
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
      return UIMessageType.NOT_IMPLEMENTED; // UI 미구현
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
      return UIMessageType.NOT_IMPLEMENTED; // UI 미구현
    }

    // BeFamily 특수 메시지들
    if (
      [
        MessageDataType.MESSAGE_DELETED_ALL_SCREEN,
        MessageDataType.DELETED_TIMER_MESSAGE,
        MessageDataType.UPDATE_TIMER_NOTI,
        MessageDataType.ALBUM_ADD_PHOTO,
        MessageDataType.ALBUM_ADD_LIKE,
      ].includes(dataType as MessageDataType)
    ) {
      return UIMessageType.NOT_IMPLEMENTED;
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
