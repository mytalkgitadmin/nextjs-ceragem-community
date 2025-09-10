// Profile UI 관련 타입들

export interface ProfileImageFile {
  file: File;
  preview: string; // 미리보기용 URL
  id: string; // 고유 식별자
}
