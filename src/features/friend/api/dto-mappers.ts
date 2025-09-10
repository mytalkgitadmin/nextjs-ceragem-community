// DTO를 도메인 모델로 변환하는 매퍼들

import type {
  Friend,
  Group,
  InvitableUser,
  ApiFriendProfile,
  FriendStatus,
} from "@/entities/friend";
import type {
  FriendDTO,
  GroupDTO,
  InvitableUserDTO,
  ProfileDTO,
  FriendListResponseDTO,
} from "./dto-types";

// DTO의 string 값을 도메인 enum으로 변환
const mapRelationType = (relationType: string): FriendStatus => {
  const relationMap: Record<string, FriendStatus> = {
    BLOCK: "BLOCK",
    DELETE: "DELETE",
    FAVORITE: "FAVORITE",
    HIDE: "HIDE",
    LEAVE: "LEAVE",
    ME: "ME",
    NONE: "NONE",
    NORMAL: "NORMAL",
    REJECT: "REJECT",
    REQUEST: "REQUEST",
    REQUESTED: "REQUESTED",
  };
  return relationMap[relationType] || "NONE";
};

const mapProfileKind = (
  profileKind: string
): "normal" | "basic" | "emoticon" => {
  const profileKindMap: Record<string, "normal" | "basic" | "emoticon"> = {
    normal: "normal",
    basic: "basic",
    emoticon: "emoticon",
  };
  return profileKindMap[profileKind] || "normal";
};

// ProfileDTO → ApiFriendProfile 매퍼
export const mapProfileDTOToApiFriendProfile = (
  dto: ProfileDTO
): ApiFriendProfile => ({
  emoticonId: dto.emoticonId,
  groupId: dto.groupId,
  lastModifiedDate: dto.lastModifiedDate,
  profileId: dto.profileId,
  profileKind: mapProfileKind(dto.profileKind),
  profileMessage: dto.profileMessage,
  profileName: dto.profileName,
  profileOriginal: dto.profileOriginal,
  profileOrigin: dto.profileOrigin,
  profileSmallThumbnail: dto.profileSmallThumbnail,
  profileThumbnail: dto.profileThumbnail,
});

// FriendDTO → Friend 매퍼
export const mapFriendDTOToFriend = (dto: FriendDTO): Friend => ({
  accountId: dto.accountId,
  accountType: dto.accountType,
  isNew: dto.isNew,
  editedName: dto.editedName,
  syncName: dto.syncName,
  isRequestIgnore: dto.isRequestIgnore,
  myGroupId: dto.myGroupId,
  nationalNumber: dto.nationalNumber,
  phoneNumber: dto.phoneNumber,
  profile: mapProfileDTOToApiFriendProfile(dto.profile),
  relationType: mapRelationType(dto.relationType),
  sendbirdId: dto.sendbirdId,
  status: dto.status,
});

// GroupDTO → Group 매퍼
export const mapGroupDTOToGroup = (dto: GroupDTO): Group => ({
  isImmutable: dto.isImmutable,
  name: dto.name,
  profile: mapProfileDTOToApiFriendProfile(dto.profile),
  sequence: dto.sequence,
  type: dto.type,
});

// InvitableUserDTO → InvitableUser 매퍼
export const mapInvitableUserDTOToInvitableUser = (
  dto: InvitableUserDTO
): InvitableUser => ({
  editedName: dto.editedName,
  isRequestIgnore: dto.isRequestIgnore,
  myGroupId: dto.myGroupId,
  nationalNumber: dto.nationalNumber,
  phoneNumber: dto.phoneNumber,
  syncName: dto.syncName,
});

// FriendListResponseDTO → 도메인 모델 매퍼
export const mapFriendListResponse = (dto: FriendListResponseDTO) => ({
  result: dto.result,
  resultData: {
    friends: dto.resultData.friends.map(mapFriendDTOToFriend),
    groups: dto.resultData.groups.map(mapGroupDTOToGroup),
    invitableUsers: dto.resultData.invitableUsers.map(
      mapInvitableUserDTOToInvitableUser
    ),
  },
});
