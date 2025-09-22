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
