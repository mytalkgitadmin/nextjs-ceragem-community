// ⚠️  DEPRECATED: 이 파일의 구조는 도메인별 분리를 위해 변경됩니다.
// 새로운 endpoints를 사용해주세요:
// - Auth: @/features/auth/api/endpoints
// - Friend: @/features/friend/api/endpoints  
// - Chat: @/features/chat/api/endpoints
// - Profile: @/features/profile/api/endpoints
// - Notifications: @/features/notifications/api/endpoints

import { Endpoint } from "./model";
import { AUTH_ENDPOINTS } from "@/features/auth/api/endpoints";
import { FRIEND_ENDPOINTS } from "@/features/friend/api/endpoints";
import { CHAT_ENDPOINTS } from "@/features/chat/api/endpoints";
import { PROFILE_ENDPOINTS } from "@/features/profile/api/endpoints";
import { NOTIFICATIONS_ENDPOINTS } from "@/features/notifications/api/endpoints";
import { CORE_ENDPOINTS } from "./core-endpoints";

// Next.js 환경변수로 전환 (브라우저 노출용: NEXT_PUBLIC_*)
export const BASE_URL = process.env.NEXT_PUBLIC_URL || "";
export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// 하위 호환성을 위한 통합 API_ENDPOINTS (단계적 마이그레이션용)
export const API_ENDPOINTS: Record<string, Record<string, Endpoint>> = {
  AUTH: AUTH_ENDPOINTS,
  USER: PROFILE_ENDPOINTS, // USER는 PROFILE로 이름 변경됨 
  PROFILE: PROFILE_ENDPOINTS,
  FILE_UPLOAD: CORE_ENDPOINTS,
  CHANNEL: CHAT_ENDPOINTS,
  FRIEND: FRIEND_ENDPOINTS,
  NOTI: NOTIFICATIONS_ENDPOINTS,
};