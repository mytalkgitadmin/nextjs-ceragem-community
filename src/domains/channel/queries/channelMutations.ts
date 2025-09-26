import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createChatRoom,
  inviteChatRoom,
  type CreateChatRoomInput,
  type InviteChatRoomInput,
} from "../utils";
import { chatQueryKeys } from "./queryKeys";

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateChatRoomInput) => createChatRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.channelList });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useInviteChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InviteChatRoomInput) => inviteChatRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.channelList });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
