// FamilyTown 서버 DTO 타입들

export type ISODateString = string;
export type TimestampMs = number;

export type ProfileKind = "normal" | "basic" | "emoticon";
export type ProfileStatus = "NORMAL" | string;
export type RelationType = "ME" | string;
export type FriendRelationMode = "PRIVATE" | string;

export interface ProfileDTO {
  emoticonId: number;
  groupId: number;
  lastModifiedDate: ISODateString | TimestampMs | null;
  profileId: number;
  profileKind: ProfileKind;
  profileMessage: string | null;
  profileName: string;
  profileOriginal: string;
  profileSmallThumbnail: string;
  profileThumbnail: string;
}

export interface AccountProfileDTO {
  accountId: number;
  editedName: string;
  syncName: string;
  email: string | null;
  phoneNumber: string;
  birthday: ISODateString | null;
  solar: boolean | null;
  introduction: string | null;
  interests: string[] | null;
  isEmailCertification: boolean;
  cardNumber: string | null;
  friendRelationMode: FriendRelationMode;
  relationType: RelationType;
  status: ProfileStatus;
  agreementMarketing: boolean;
  agreementModifiedDate: TimestampMs | null;
  profile: ProfileDTO;
}
