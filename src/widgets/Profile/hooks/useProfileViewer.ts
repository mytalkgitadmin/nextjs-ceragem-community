import { useState, useCallback, useMemo } from 'react';

import { useAuth } from '@/features/auth';
import { useProfile } from '@/features/profile/api';
import { BASE_URL } from '@/shared/api/endpoints';
import { ProcessedHistory } from '../types/viewer.types';
import { getEmoticonImageUrl } from '@/features/viewer/utils/mediaUtils';

export default function useProfileViewer({ accountId }: { accountId: number }) {
  const { userProfile } = useAuth();
  const { data: userData, isLoading, error } = useProfile(accountId);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  // 나의 프로필 여부 확인
  const isMyProfile = useMemo(
    () => userProfile?.accountId === accountId,
    [userProfile?.accountId, accountId],
  );

  // 프로필 히스토리
  const processedHistories = useMemo<ProcessedHistory[]>(() => {
    if (!userData?.histories) return [];

    return userData.histories.map((history) => {
      let processedImageUrl = `${BASE_URL}${history.profileThumbnail}`;

      if (history.profileKind === 'emoticon') {
        processedImageUrl = getEmoticonImageUrl(history.emoticonId) || '';
      }

      return {
        ...history,
        processedImageUrl,
      };
    });
  }, [userData?.histories]);

  // 뷰어 열기
  const handleImageClick = useCallback((index: number) => {
    setImgIndex(index);
    setViewerOpen(true);
  }, []);

  // 전화 걸기
  const handlePhoneCall = useCallback((phoneNumber: string) => {
    if (!phoneNumber) return;
    document.location.href = `tel:${phoneNumber}`;
  }, []);

  // 뷰어 닫기
  const handleViewerClose = useCallback(() => {
    setViewerOpen(false);
  }, []);

  return {
    // 데이터
    userData,
    isLoading,
    error,
    isMyProfile,
    processedHistories,

    // 상태
    viewerOpen,
    imgIndex,

    // 핸들러
    handleImageClick,
    handlePhoneCall,
    handleViewerClose,
  };
}
