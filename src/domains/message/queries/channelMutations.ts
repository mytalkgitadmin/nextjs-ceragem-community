import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deliveryMessage,
  type DeliveryMessageRequest,
} from "@/domains/message";
import { chatQueryKeys } from "@/domains/channel";

export const useDeliveryMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeliveryMessageRequest) => deliveryMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.channelList });
    },
  });
};
