// ⚠️  DEPRECATED: 비즈니스 로직 관련 enum들이 features로 이동되었습니다.
// 새로운 import 경로를 사용해주세요:
// - MenuItem: @/features/navigation
// - SettingModalMenuType, SettingModalTalkType: @/features/settings

// 레이아웃 타입 (도메인 독립적이므로 shared에 유지)
export enum LayoutType {
  EXPAND,
  COLLAPSE,
}

// 하위 호환성을 위한 재export (단계적 마이그레이션용)
export { MenuItem } from "@/features/navigation";
export {
  SettingModalMenuType,
  SettingModalTalkType,
} from "@/features/settings";
