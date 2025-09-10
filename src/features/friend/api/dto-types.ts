// Friend API의 원시 DTO 타입들 (백엔드 API 응답과 1:1 대응)

export interface FriendListResponseDTO {
  result: boolean;
  resultData: {
    friends: FriendDTO[];
    groups: GroupDTO[];
    invitableUsers: InvitableUserDTO[];
  };
}

export interface FriendDTO {
  accountId: number;
  accountType: "ADMIN" | "USER";
  isNew: boolean;
  editedName: string;
  syncName: string;
  isRequestIgnore: boolean;
  myGroupId: number;
  nationalNumber: string;
  phoneNumber: string;
  profile: ProfileDTO;
  relationType: string; // 백엔드 원시 값
  sendbirdId: string;
  status: "BAN" | "ACTIVE";
}

export interface GroupDTO {
  isImmutable: boolean;
  name: string;
  profile: ProfileDTO;
  sequence: number;
  type: "AD" | "NORMAL";
}

export interface InvitableUserDTO {
  editedName: string;
  isRequestIgnore: boolean;
  myGroupId: number;
  nationalNumber: string;
  phoneNumber: string;
  syncName: string;
}

export interface ProfileDTO {
  emoticonId: number;
  groupId: number;
  lastModifiedDate: string;
  profileId: number;
  profileKind: string; // 백엔드 원시 값
  profileMessage: string;
  profileName: string;
  profileOriginal: string;
  profileOrigin: string;
  profileSmallThumbnail: string;
  profileThumbnail: string;
}
