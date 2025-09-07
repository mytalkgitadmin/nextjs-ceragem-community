"use client";

import { useState, useCallback, useMemo } from "react";

import { useProfileStore } from "@/entities/profile";
import { useProfile } from "@/entities/profile";
import { getApiBaseUrl } from "@/shared/api";
import { ProcessedHistory } from "@/features/profile-update/model/viewer.types";
import { getEmoticonImageUrl } from "@/entities/profile";

export default function useProfileViewer({ accountId }: { accountId: number }) {
  const { userProfile } = useProfileStore();
  const { data: userData, isLoading, error } = useProfile(accountId);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const isMyProfile = useMemo(
    () => userProfile?.accountId === accountId,
    [userProfile?.accountId, accountId]
  );

  const processedHistories = useMemo<ProcessedHistory[]>(() => {
    if (!userData?.histories) return [];

    return userData.histories.map((history): ProcessedHistory => {
      let processedImageUrl = `${getApiBaseUrl()}${history.profileThumbnail}`;
      if (history.profileKind === "emoticon") {
        processedImageUrl = getEmoticonImageUrl(history.emoticonId) || "";
      }
      return { ...history, processedImageUrl };
    });
  }, [userData?.histories]);

  const handleImageClick = useCallback((index: number) => {
    setImgIndex(index);
    setViewerOpen(true);
  }, []);

  const handlePhoneCall = useCallback((phoneNumber: string) => {
    if (!phoneNumber) return;
    document.location.href = `tel:${phoneNumber}`;
  }, []);

  const handleViewerClose = useCallback(() => {
    setViewerOpen(false);
  }, []);

  return {
    userData,
    isLoading,
    error,
    isMyProfile,
    processedHistories,
    viewerOpen,
    imgIndex,
    handleImageClick,
    handlePhoneCall,
    handleViewerClose,
  };
}
