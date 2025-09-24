import { get, post, put } from "@/shared/api/client";
import { MessageCustomType, MessageType } from "../constants";

export type RequestMessageType = "FILE" | "MESG" | "ADMM";
export type DeleteMessageRequestType = "MY" | "ALL";

export type ShareRequestTargetType =
  | "FRIEND_DIRECT"
  | "CHANNEL"
  | "FRIEND_GROUP";

export interface DeliveryMessageRequestData {
  message: {
    customType: MessageCustomType;
    data: string;
    message: string;
    type: RequestMessageType;
  };
  target: {
    channelIds?: string[];
    friendIds?: string[];
    targetType: ShareRequestTargetType;
  };
}

export const deliveryMessage = async (data: DeliveryMessageRequestData) => {
  const response = await post({
    url: "/channel/delivery",
    data,
  });
  return response;
};

export interface DeleteMessageRequestData {
  channelId: number;
  messageId: number;
  type: RequestMessageType;
  deleteType: DeleteMessageRequestType;
  data: { data: string };
}

export const deleteMessage = async (data: DeleteMessageRequestData) => {
  const response = await put({
    url: `/channel/${data.channelId}/user-message/${data.type}/${data.messageId}/${data.deleteType}`,
    data: data.data,
  });
  return response;
};
