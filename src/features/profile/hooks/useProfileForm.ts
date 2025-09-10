import { useState, useCallback } from 'react';

import { AccountProfile } from '@/features/chat/model';
import { ProfileFormData } from '../types';

interface UseProfileFormProps {
  initialData: AccountProfile | null; // userProfile 타입
}

/**
 * 프로필 수정 폼의 상태와 핸들러를 관리하는 Hook
 */
export const useProfileForm = ({ initialData }: UseProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    profileName: initialData?.editedName || '',
    profileMessage: initialData?.profile?.profileMessage || '',
    interests: initialData?.interests || '',
    birthday: initialData?.birthday
      ? new Date(parseInt(initialData.birthday))
      : undefined,
    introduction: initialData?.introduction || '',
    solar: initialData?.solar || false,
  });

  const [calendarOpen, setCalendarOpen] = useState(false);

  // 입력값 변경 핸들러
  const handleInputChange = useCallback(
    (
      field: keyof ProfileFormData,
      value: ProfileFormData[keyof ProfileFormData],
    ) => {
      setFormData((prev: ProfileFormData) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  // 생일 선택 핸들러
  const handleDateSelect = useCallback((date: Date | undefined) => {
    setFormData((prev: ProfileFormData) => ({
      ...prev,
      birthday: date,
    }));
    setCalendarOpen(false);
  }, []);

  return {
    formData,
    calendarOpen,
    setCalendarOpen,
    handleInputChange,
    handleDateSelect,
  };
};
