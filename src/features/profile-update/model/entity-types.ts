// 프로필 업데이트 feature 엔티티 타입
import type { ProfileEntity } from "@/entities/profile/model/entity-types";
import type { ProfileHistory } from "@/entities/profile/api/contracts-types";

// 프로필 텍스트 데이터 엔티티
export interface ProfileTextData {
  profileName?: string;
  profileMessage?: string;
  interests?: string;
  birthday?: string | undefined;
  introduction?: string;
  solar?: boolean;
}

// 프로필 폼 데이터 엔티티
export interface ProfileFormData {
  profileName: string;
  profileMessage: string;
  interests: string;
  birthday: Date | undefined;
  introduction: string;
  solar: boolean;
  profileImage?: string;
}

// 프로필 뷰어 프로퍼티 (레거시 파일에서 이동)
export interface ProfileViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountId: number;
  profileImageUrl: string;
  // 기존 프로퍼티 (호환성)
  profile?: ProfileEntity;
  isOwner?: boolean;
  onClose?: () => void;
  onEdit?: () => void;
}

// 프로필 갤러리 프로퍼티
export interface ProfileGalleryProps {
  histories: ProcessedHistory[];
  currentProfile?: ProfileEntity;
  onImageClick?: (index: number) => void;
}

// 처리된 히스토리 타입
export type ProcessedHistory = ProfileHistory & {
  processedImageUrl?: string;
  isActive?: boolean;
};

// 프로필 모달 상태
export interface ProfileModalState {
  isOpen: boolean;
  profile: ProfileEntity | null;
  mode: "view" | "edit";
  openModal: (profile: ProfileEntity, mode?: "view" | "edit") => void;
  closeModal: () => void;
  setMode: (mode: "view" | "edit") => void;
}

// 계정 프로필 유사 타입 (폼 용도)
export interface AccountProfileLike {
  nickname?: string;
  introduction?: string;
  interests?: string;
  birthday?: string;
  solar?: boolean;
}

// 프로필 폼 사용 프로퍼티
export interface UseProfileFormProps {
  initialData?: AccountProfileLike;
  onSubmit?: (data: ProfileFormData) => void;
}
