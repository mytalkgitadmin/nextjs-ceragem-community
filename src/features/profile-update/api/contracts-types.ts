// 프로필 업데이트 API 계약 타입
import type {
  UpdateProfileRequestDTO,
  UpdateProfileResponseDTO,
  GroupProfileParamsDTO,
  UpdateGroupProfileResponseDTO,
} from "./dto-types";

// 프로필 업데이트 요청
export type UpdateProfileRequest = UpdateProfileRequestDTO;

// 프로필 업데이트 응답
export type UpdateProfileResponse = UpdateProfileResponseDTO;

// 그룹 프로필 파라미터
export type GroupProfileParams = GroupProfileParamsDTO;

// 그룹 프로필 업데이트 응답
export type UpdateGroupProfileResponse = UpdateGroupProfileResponseDTO;

// 확장된 프로필 업데이트 요청 (추가 메타데이터 포함)
export interface ExtendedUpdateProfileRequest extends UpdateProfileRequest {
  timestamp?: number;
  source?: string;
  metadata?: Record<string, unknown>;
}
