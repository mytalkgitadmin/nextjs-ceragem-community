// Friend API 전용 Profile 타입 (백엔드 API와 호환)
export interface ApiFriendProfile {
  emoticonId: number;
  groupId: number;
  lastModifiedDate: string;
  profileId: number;
  profileKind: "normal" | "basic" | "emoticon";
  profileMessage: string;
  profileName: string;
  profileOriginal: string;
  profileOrigin: string; // 추가 - Profile과 호환성을 위해
  profileSmallThumbnail: string;
  profileThumbnail: string;
}

// 친구 상태 타입 (API 호환)
export type FriendStatus =
  | "BLOCK" // 친구 차단
  | "DELETE" // 친구 삭제
  | "FAVORITE" // 즐겨찾기
  | "HIDE" // 친구 숨김
  | "LEAVE" // 탈퇴
  | "ME" // 나
  | "NONE" // 친구 데이터가 없음
  | "NORMAL" // 친구 상태
  | "REJECT" // 친구 거절
  | "REQUEST" // 친구 요청한 상태
  | "REQUESTED"; // 친구 요청 받은 상태

// 친구 정보
export interface Friend {
  accountId: number;
  accountType: "ADMIN" | "USER";
  isNew: boolean;
  editedName: string;
  syncName: string;
  isRequestIgnore: boolean;
  myGroupId: number;
  nationalNumber: string;
  phoneNumber: string;
  profile: ApiFriendProfile;
  relationType: FriendStatus;
  sendbirdId: string;
  status: "BAN" | "ACTIVE";
}

// 그룹 정보
export interface Group {
  isImmutable: boolean;
  name: string;
  profile: ApiFriendProfile;
  sequence: number;
  type: "AD" | "NORMAL";
}

// 초대 가능한 사용자
export interface InvitableUser {
  editedName: string;
  isRequestIgnore: boolean;
  myGroupId: number;
  nationalNumber: string;
  phoneNumber: string;
  syncName: string;
}
