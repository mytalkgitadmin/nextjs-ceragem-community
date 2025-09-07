import { DATE_FORMATS, formatDate } from "@/shared/lib/date";
import { Icons } from "@/shared/ui/icon";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/overlays";
import { Calendar } from "@/shared/ui/calendar";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Switch } from "@/shared/ui/switch";
import styles from "./EditProfileModal.module.scss";
import { ProfileFormData } from "@/features/profile-update/model/types";

interface FormFieldsProps {
  formData: ProfileFormData;
  handleInputChange: (
    field: keyof ProfileFormData,
    value: ProfileFormData[keyof ProfileFormData]
  ) => void;
  calendarOpen: boolean;
  setCalendarOpen: (open: boolean) => void;
  handleDateSelect: (date: Date | undefined) => void;
}

export default function FormFields({
  formData,
  handleInputChange,
  calendarOpen,
  setCalendarOpen,
  handleDateSelect,
}: FormFieldsProps) {
  return (
    <>
      <Label htmlFor="profile-name">프로필 이름</Label>
      <Input
        id="profile-name"
        value={formData.profileName}
        onChange={(e) => handleInputChange("profileName", e.target.value)}
        placeholder="프로필 이름을 입력하세요"
      />

      <Label htmlFor="profile-message">상태메시지</Label>
      <Input
        id="profile-message"
        value={formData.profileMessage}
        onChange={(e) => handleInputChange("profileMessage", e.target.value)}
        placeholder="상태메시지를 입력하세요"
      />

      <Label htmlFor="interests">관심사</Label>
      <Input
        id="interests"
        value={formData.interests}
        onChange={(e) => handleInputChange("interests", e.target.value)}
        placeholder="관심사를 입력하세요"
      />

      <Label htmlFor="birthday">생일</Label>

      <div className={styles.flex}>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="birthday" className={styles.birth}>
              {formData.birthday
                ? formatDate(formData.birthday.getTime(), DATE_FORMATS.DOT)
                : "날짜를 선택하세요"}
              <Icons name="chevron-down" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="center">
            <Calendar
              mode="single"
              selected={formData.birthday}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>

        <div className="flex items-center space-x-2">
          <Switch
            id="solar"
            checked={formData.solar}
            onCheckedChange={(checked) => handleInputChange("solar", checked)}
          />
          <Label htmlFor="solar">음력</Label>
        </div>
      </div>

      <Label htmlFor="introduction">내 소개</Label>
      <Textarea
        id="introduction"
        placeholder="자기소개를 입력하세요"
        value={formData.introduction}
        onChange={(e) => handleInputChange("introduction", e.target.value)}
        rows={3}
      />
    </>
  );
}
