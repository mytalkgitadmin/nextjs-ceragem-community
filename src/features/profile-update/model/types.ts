// 레거시 타입 파일 - 새로운 타입 파일들을 re-export
// 점진적 마이그레이션을 위해 유지

// Entity types
export type { ProfileTextData, ProfileFormData } from "./entity-types";

// API types
export type {
  UpdateProfileRequestDTO as UpdateProfileRequest,
  UpdateProfileResponseDTO as UpdateProfileResponse,
  GroupProfileParamsDTO as GroupProfileParams,
  UpdateGroupProfileResponseDTO as UpdateGroupProfileResponse,
} from "../api/dto-types";
