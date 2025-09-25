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
 * 메시지가 특정 사용자에게 삭제된 메시지인지 확인
 * @param message 메시지
 * @param userId 사용자 ID
 * @returns 삭제된 메시지인지 여부
 */

export const isDeletedMessageToUser = (
  message: BaseMessage,
  userId: string
) => {
  const messageData = parseJson(message.data || "");
  const deleteUserIds =
    messageData?.deleteUsers?.map((user: any) => user.user_id) || [];

  return (
    message.data === "[TYPE_DELETED]" ||
    message.message === "[TYPE_DELETED]" ||
    message.data?.includes("[TYPE_DELETED]") ||
    deleteUserIds.includes(userId)
  );
};

export const isInvisibleMessage = (message: BaseMessage) => {
  const messageData = parseJson(message.data || "");
  const dataType = messageData?.type;

  return (
    message.data?.includes(MessageDataType.UPDATED_TIMER_MESSAGE) ||
    message.data?.includes(MessageDataType.DELETED_TIMER_MESSAGE) ||
    dataType === MessageDataType.UPDATED_TIMER_MESSAGE ||
    dataType === MessageDataType.DELETED_TIMER_MESSAGE ||
    dataType === MessageDataType.MESSAGE_DELETED_ALL_SCREEN
  );
};

/**
 * 메시지를 UI 타입으로 변환
 * @param message 메시지
 * @returns UIMessageType
 */

export const getUIMessageType = (message: BaseMessage): UIMessageType => {
  const customType = message.customType;
  const messageType = message.messageType;
  const messageData = parseJson(message.data || ""); // JSON 파싱해서 data 가져오기
  const dataType = messageData?.type;

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

/**
 * 공유된 파일의 다운로드 URL을 반환합니다.
 * @param message - 메시지 객체
 * @returns 공유된 파일의 다운로드 URL
 */
export function getShareFileDonwloadUrl(shareFile: any) {
  return `${process.env.NEXT_PUBLIC_BASE_DOMAIN}${shareFile.originalUrl}?attachment=true`;
}

/**
 * 공유된 파일의 썸네일 높이를 반환합니다.
 * @param shareFile - 공유된 파일 객체
 * @returns 썸네일 높이
 */
export function getShareFileThumbnailHeight(shareFile: any) {
  const rate = parseFloat(
    parseFloat(shareFile.thumbUrl?.split("sizeRate=")[1] || "1").toFixed(2)
  );

  if (rate >= 1) return "min(300px, 50vw)";
  if (rate < 0.34) return "100px";
  return `${Math.round(300 * rate)}px`;
}

/**
 * 메시지가 긴 텍스트 메시지인지 확인
 * @param message - 메시지
 * @returns 긴 텍스트 메시지인지 여부
 */
export function isLongTextMessage(message: BaseMessage): boolean {
  const messageText = message.message || "";
  const text = removeEditPrefix(messageText);
  return text.length > 2000;
}

/**
 * 답장 메시지의 썸네일 URL을 반환합니다.
 * @param message - 메시지
 * @returns 썸네일 URL
 */

export const getReplyMessageThumbUrl = (message: BaseMessage) => {
  const parentMessage = message?.parentMessage;
  const data = parseJson(parentMessage?.data || "");
  const messageDataType = data?.type;
  const messageType = parentMessage?.messageType;
  const domain = process.env.NEXT_PUBLIC_BASE_DOMAIN;

  if (
    [
      MessageDataType.MESSAGE_CONTACT,
      MessageDataType.MESSAGE_AFFILIATE,
      MessageDataType.MESSAGE_FAMILY_EVENT,
      MessageDataType.MESSAGE_CALENDAR_EVENT,
      MessageDataType.MESSAGE_DDAY_EVENT,
    ].includes(messageDataType)
  ) {
    return null;
  }

  if (messageDataType === MessageDataType.MESSAGE_BUBBLE) {
    return `${domain}${data?.resource?.thumbUrl}`;
  }

  if (messageType === MessageType.FILE) {
    const resource = data?.resource || [];
    if (
      !resource.length ||
      resource[0]?.fileType === "document" ||
      resource[0]?.fileType === "zip" ||
      resource[0]?.fileType === "audio"
    ) {
      return null;
    }
    return `${domain}${resource[0]?.thumbUrl}`;
  }

  return null;
};

/**
 * 답장 메시지의 내용을 반환합니다.
 * @param message 메시지
 * @returns 답장 메시지의 내용
 */

export const getReplyMessageContents = (message: BaseMessage) => {
  const parentMessage = message?.parentMessage;
  const data = parseJson(parentMessage?.data || "");
  const messageDataType = data?.type;

  if (messageDataType === MessageDataType.MESSAGE_CONTACT) {
    return "연락처:" + data?.contact?.[0]?.name;
  } else if (data?.type === MessageDataType.MESSAGE_AFFILIATE) {
    return "재휴사";
  } else if (data?.type === MessageDataType.MESSAGE_FAMILY_EVENT) {
    return "가족행사";
  } else if (data?.type === MessageDataType.MESSAGE_CALENDAR_EVENT) {
    return "캘린더";
  } else if (data?.type === MessageDataType.MESSAGE_DDAY_EVENT) {
    return "디데이";
  } else if (data?.resource) {
    if (data?.resource?.length === 1) {
      if (
        data?.resource[0]?.fileType === "image" ||
        data?.resource[0]?.fileType === "webp" ||
        data?.resource[0]?.fileType === "gif"
      ) {
        return "사진";
      } else if (data?.resource[0]?.fileType === "video") {
        return "동영상";
      } else if (
        data?.resource[0]?.fileType === "document" ||
        data?.resource[0]?.fileType === "zip" ||
        data?.resource[0]?.fileType === "audio"
      ) {
        return "파일: " + data?.resource[0]?.originalFileName;
      }
    } else {
      if (messageDataType === MessageDataType.MESSAGE_BUBBLE) {
        return "이모티콘";
      } else {
        return "사진 " + data?.resource?.length + "장";
      }
    }
  }

  const messageText = parentMessage?.message || "";
  const text = removeEditPrefix(messageText);
  return text;
};
