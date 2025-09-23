import { get, post } from "@/shared/api/client";

export interface DeliveryMessageRequest {
  message: {
    customType: string;
    data: string;
    message: string;
    type: string; //MESG, FILE
  };
  target: {
    channelIds: number[];
    targetType: string;
  };
}

export const deliveryMessage = async (data: DeliveryMessageRequest) => {
  const response = await post({
    url: "/channel/delivery",
    data,
  });
  return response;
};
