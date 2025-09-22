// 친구 타입
export enum RelationType {
  BLOCK = "BLOCK", //친구 차단
  DELETE = "DELETE", //친구 삭제
  FAVORITE = "FAVORITE", //즐겨찾기
  HIDE = "HIDE", //친구 숨김
  LEAVE = "LEAVE", //탈퇴
  ME = "ME", //나
  NONE = "NONE", // 친구 데이터가 없음
  NORMAL = "NORMAL", //친구 상태
  REQUEST = "REQUEST", //친구 요청한 상태
  REQUESTED = "REQUESTED", //친구 요청 받은 상태
}
