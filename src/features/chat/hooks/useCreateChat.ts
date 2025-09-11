"use client";

import { useAuth } from "@/features/auth";
import { useRouter } from "next/navigation";
import { useCreateChannel } from "../api/createChannel";
import { useChannelStore } from "../store";
import { useUIStore } from "@/shared/store/useUIStore";
import { useCallback } from "react";

interface UseCreateChatProps {
  onSuccess?: (channelUrl: string) => void;
  onError?: (error: Error) => void;
}

export default function useCreateChat({
  onSuccess,
  onError,
}: UseCreateChatProps) {
  const router = useRouter();
  const { userProfile } = useAuth();
  const { setCurrentChannelUrl } = useChannelStore();
  const { closeAllModals } = useUIStore();
  const createChannelMutation = useCreateChannel();

  const handleStartChat = useCallback(
    (friendIds: number[], channelType: "MY" | "DIRECT" | "GROUP") => {
      if (!userProfile?.accountId) return;

      const accountIds =
        channelType === "MY"
          ? [userProfile.accountId]
          : [userProfile.accountId, ...friendIds];

      createChannelMutation.mutate(
        { accountIds, channelType },
        {
          onSuccess: (data) => {
            closeAllModals();
            setCurrentChannelUrl?.(data.data.channelUrl);
            onSuccess?.(data.data.channelUrl);
            router.push("/chat");
          },
          onError: (error) => {
            console.error("채널 생성 실패:", error);
            onError?.(error);
          },
        }
      );
    },
    [
      userProfile,
      createChannelMutation,
      closeAllModals,
      setCurrentChannelUrl,
      router,
      onError,
      onSuccess,
    ]
  );

  return { handleStartChat };
}
