// 프로필 모달 타입
export enum ProfileModalEnum {
  ME_DEFAULT, // 프로필 본인(기본)
  GROUP_DEFAULT, // 프로필 그룹(기본)
  FRIEND_DEFAULT, // 프로필 친구(기본)
  FRIEND_BEFORE_ADDING, // 프로필 친구(추가 전)
  FRIEND_UNREGISTERED, // 프로필 친구(미등록)
  FRIEND_INVITING, // 프로필 친구(초대 중)
  FRIEND_TAKING, // 프로필 친구(대화방 내)
  FRIEND_HIDE, // 프로필 친구(숨김 친구)
  FRIEND_BLOCK, // 프로필 친구(차단 친구)
  FRIEND_VIDEO, // 프로필 친구(동영상)
  FRIEND_LEAVE, // 프로필 친구 탈퇴
}
