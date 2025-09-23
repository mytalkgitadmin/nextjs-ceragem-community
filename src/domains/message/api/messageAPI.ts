import { get, post } from "@/shared/api/client";
import { MessageCustomType, MessageType } from "../constants";

export interface DeliveryMessageRequest {
  message: {
    customType: MessageCustomType;
    data: string;
    message: string;
    type: "ADMM" | "FILE" | "MESG";
  };
  target: {
    channelIds?: string[];
    friendIds?: string[];
    targetType: "FRIEND_DIRECT" | "CHANNEL" | "FRIEND_GROUP";
  };
}

export const deliveryMessage = async (data: DeliveryMessageRequest) => {
  const response = await post({
    url: "/channel/delivery",
    data,
  });
  return response;
};

export interface DeleteMessageRequest {
  // messageIds: string[];
  // deleteType: MESSAGE_DELETE_TYPE;
}

export const deleteMessage = async (data: DeleteMessageRequest) => {};
