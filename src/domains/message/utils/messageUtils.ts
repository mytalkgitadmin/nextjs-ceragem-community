import { BaseMessage } from "@sendbird/chat/message";
import { isEmpty } from "lodash-es";
import { parseJson } from "@/shared/utils/stringUtils";

import {
  MessageCustomType,
  UIMessageType,
  MessageDataType,
  MessageType,
} from "../constants/messageEnum";
import {
  type DeliveryMessageRequestData,
  type ShareRequestTargetType,
  type RequestMessageType,
  type DeleteMessageRequestType,
  type DeleteMessageRequestData,
} from "../api";

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
 * 메시지 공유를 위한 메시지 요청 데이터 준비
 * @param message - 메시지
 * @returns 메시지 공유를 위한 데이터
 */
export function getShareMessageRequestData(
  message: BaseMessage,
  target: DeliveryMessageRequestData["target"]
) {
  const data = message?.data || "";
  const messageType = message?.messageType;
  const customType = message?.customType || MessageCustomType.BEFAMILY;
  // const data = message?.data || albumDataConvert(message, type) || '' //CHECK: 패밀리타운 가족앨범 전달 시 메시지 처리

  let type: RequestMessageType = "MESG";
  if (messageType === MessageType.ADMIN) {
    type = "ADMM";
  } else if (messageType === MessageType.FILE) {
    // else if (message?.messageType === 'file' || type === 'ALBUM') { //CHECK: 패밀리타운 가족앨범 전달 시 메시지 처리
    type = "FILE";
  } else if (messageType === MessageType.USER) {
    type = "MESG";
  }

  return {
    message: {
      message: message?.message || "",
      customType: customType as MessageCustomType,
      data,
      type,
    },
    target,
  };
}

/**
 * 메시지 삭제를 위한 메시지 요청 데이터 준비
 * @param channelId - 채널 Info ID
 * @param message - 메시지
 * @returns 메시지 삭제를 위한 데이터
 */

export function getDeleteMessageRequestData(
  channelId: number,
  message: BaseMessage,
  deleteType: DeleteMessageRequestType
): DeleteMessageRequestData {
  const data = message?.data || "";

  let type: RequestMessageType = "MESG";
  if (
    message.messageType === MessageType.FILE ||
    data.includes("MESSAGE_FILE")
  ) {
    type = "FILE";
  }

  return {
    channelId,
    messageId: message.messageId,
    type,
    deleteType,
    data: { data },
  };
}

/**
 * 메시지의 파일 공유 상태를 검증합니다.
 * @param {Object} message - 메시지 객체
 * @returns {Object} 공유 검증 결과 객체
 *   - canShare: boolean - 공유 가능 여부
 *   - status: string - 상태 ('all_shared' | 'partial_shared' | 'none_shared' | 'not_file')
 *   - totalCount: number - 전체 파일 수
 *   - notSharedCount: number - 공유되지 않은 파일 수
 */
export function validateFileSharing(message: BaseMessage) {
  if (message.messageType !== MessageType.FILE) {
    return {
      canShare: true,
      status: "not_file",
      totalCount: 0,
      notSharedCount: 0,
    };
  }

  const messageData = parseJson(message.data || "");
  const resource = messageData?.resource || [];

  const totalCount = resource.length;
  const notSharedCount = resource.filter(
    (file: any) => file?.shared === false
  ).length;

  if (notSharedCount === 0) {
    // 모든 파일이 공유 가능
    return {
      canShare: true,
      status: "all_shared",
      totalCount,
      notSharedCount,
    };
  } else if (totalCount > notSharedCount) {
    // 일부 파일만 공유되지 않음
    return {
      canShare: true,
      status: "partial_shared",
      totalCount,
      notSharedCount,
    };
  } else {
    // 모든 파일이 공유되지 않음
    return {
      canShare: false,
      status: "none_shared",
      totalCount,
      notSharedCount,
    };
  }
}

/**
 * 메시지의 공유된 파일 목록을 반환합니다.
 * @param message - 메시지 객체
 * @returns 공유된 파일 목록
 */
export function getShareFiles(message: BaseMessage) {
  if (message.messageType !== MessageType.FILE) {
    return [];
  }

  const messageData = parseJson(message.data || "");
  const resource = messageData?.resource || [];
  return resource.filter((file: any) => file?.shared === true);
}
