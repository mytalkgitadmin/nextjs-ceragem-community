// 설정 모달 타입
export enum SettingModalEnum {
  SETTING,
  CONNECT_MODE,
  HIDE_MNG,
  BLOCK_MNG,
  GROUP_SORT_MNG,
  GROUP_MNG,
  PWD_CHANGE_EMAIL, //전체 설정 > 계정 > 비밀번호 변경 (이메일 인증)
  PWD_CHANGE_CURRENT, //전체 설정 > 계정 > 비밀번호 변경 (기존 비밀번호 입력)
  PWD_CHANGE_NEW, //전체 설정 > 계정 > 비밀번호 변경 (신규 비밀번호 입력)
}

// 디데이 모달 타입
export enum DdayModalEnum {
  DDAY_SELECT, //디데이 기념일 선택
  DDAY_ADD, //디데이 기념일 등록
  DDAY_LIST, //디데이 리스트
  DDAY_DETAIL, //디데이 상세
}

// 포인트 모달 타입
export enum PointModalEnum {
  POINT_MAIN,
  POINT_HISTORY,
  POINT_EXCAHNGE,
  POINT_COUPON,
}
