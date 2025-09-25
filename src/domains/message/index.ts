export {
  extractNamesFromMessageForSysMsg,
  insertNamesIntoSysMsg,
  extractNameFromMessageForCustomSysMsg,
  insertNamesIntoCustomSysMsg,
  getUIMessageType,
  isCustomSystemMessageType,
  getTimerMessage,
  getShareMessageRequestData,
  validateFileSharing,
  getShareFiles,
  getDeleteMessageRequestData,
  isDeletedMessageToUser,
  isEditedMessage,
  removeEditPrefix,
  isLongTextMessage,
  getReplyMessageThumbUrl,
  getReplyMessageContents,
  getShareFileDonwloadUrl,
  getShareFileThumbnailHeight,
  sendFileMessage,
  getSendirdFileMessageParamsList,
} from "./utils";

export {
  SYSTEM_MESSAGE_TEMPLATES,
  MessageDataType,
  UIMessageType,
  MESSAGE_MENU_CONFIG,
  CUSTOM_SYSTEM_MESSAGE_TEMPLATES,
  MessageType,
  MESSAGE_DELETE_TYPE,
  MessageCustomType,
} from "./constants";

export {
  deliveryMessage,
  type DeliveryMessageRequestData,
  type RequestMessageType,
  type DeleteMessageRequestType,
  type ShareRequestTargetType,
} from "./api";
export { deleteMessage, type DeleteMessageRequestData } from "./api";
export {
  uploadFile,
  type UploadFileRequestData,
  type UploadFileResponseData,
} from "./api";
export { useDeliveryMessage, useFileUploadAcceptList } from "./queries";
