export const SYSTEM_MESSAGE_TEMPLATES = {
  /** 대화방 초대 - {names}: 초대된 사용자 이름 */
  USER_JOIN: "{names}(님)이 대화방에 초대 되었습니다.",

  /** 대화방 나감 - {names}: 나간 사용자 이름 */
  USER_LEAVE: "{names}(님)이 대화방을 나갔습니다.",

  /** 사용자 강퇴 - {names}: 강퇴된 사용자 이름 */
  CHANNEL_KICK_USERS: "방장이 {names}(님)을 내보내기 하였습니다",

  /** 방장 변경 - {names}: 새 방장 이름 */
  CHANNEL_ASSIGN_MASTER: "방장이 {names}(님)으로 변경되었습니다.",
};

export const CUSTOM_SYSTEM_MESSAGE_TEMPLATES = {
  /** 가족앨범 사진 등록 - {name}: 사용자 이름 */
  ALBUM_ADD_PHOTO: "{name}(님)이 가족앨범에 사진을 등록 하였습니다.",

  /** 가족앨범 좋아요 - {name}: 사용자 이름 */
  ALBUM_ADD_LIKE: "{name}(님)이 가족앨범에 좋아요를 남겼습니다.",

  /** 타이머 설정 - {name}: 사용자 이름, {timer}: 타이머 설정 */
  UPDATE_TIMER_NOTI: "{name}(님)이 {timer}",
};

/**
 * 타이머 시간 설정 메시지
 */
export const TIMER_MESSAGES = {
  OFF: "자동 삭제 타이머를 껐습니다.",
  ONE_MINUTE: "자동 삭제 타이머를 1분으로 설정하였습니다.",
  TEN_MINUTES: "자동 삭제 타이머를 10분으로 설정하였습니다.",
  ONE_HOUR: "자동 삭제 타이머를 1시간으로 설정하였습니다.",
  ONE_DAY: "자동 삭제 타이머를 1일로 설정하였습니다.",
  ONE_WEEK: "자동 삭제 타이머를 1주로 설정하였습니다.",
  FOUR_WEEKS: "자동 삭제 타이머를 4주로 설정하였습니다.",
};

export const MESSAGE_DELETE_TYPE = {
  DELETE_MY: "DELETE_MY", // 메시지 삭제(내화면)
  DELETE_ALL: "DELETE_ALL", // 메시지 삭제(친구화면까지)
};
