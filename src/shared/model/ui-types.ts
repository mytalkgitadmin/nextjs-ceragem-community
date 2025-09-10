// 메뉴 아이템
export enum MenuItem {
  FRIEND,
  MY,
  GIFT,
  CHAT,
  FAMILY_ALBUM,
  ALL_EDIT,
  NONE,
}

// 레이아웃 타입
export enum LayoutType {
  EXPAND,
  COLLAPSE,
}

// 설정 모달 메뉴 타입
export enum SettingModalMenuType {
  ACCOUNT,
  FRIEND,
  TALK,
  NOTICE,
  CS,
  INFOR,
}

// 설정 모달 대화 타입
export enum SettingModalTalkType {
  TextWidth, // 글자 크기 변경
  BackgroundColor, // 배경 화면 변경
  Backup, // 백업
}
