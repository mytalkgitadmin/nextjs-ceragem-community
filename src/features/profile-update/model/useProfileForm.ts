import { useState, useCallback } from "react";
import { ProfileFormData } from "./types";

interface AccountProfileLike {
  editedName?: string;
  interests?: string;
  birthday?: string | undefined;
  introduction?: string;
  solar?: boolean | null;
  profile?: { profileMessage?: string };
}

interface UseProfileFormProps {
  initialData: AccountProfileLike | null;
}

export const useProfileForm = ({ initialData }: UseProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    profileName: initialData?.editedName || "",
    profileMessage: initialData?.profile?.profileMessage || "",
    interests: initialData?.interests || "",
    birthday: initialData?.birthday
      ? new Date(parseInt(initialData.birthday))
      : undefined,
    introduction: initialData?.introduction || "",
    solar: !!initialData?.solar,
  });

  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleInputChange = useCallback(
    (
      field: keyof ProfileFormData,
      value: ProfileFormData[keyof ProfileFormData]
    ) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleDateSelect = useCallback((date: Date | undefined) => {
    setFormData((prev) => ({
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

export default useProfileForm;
