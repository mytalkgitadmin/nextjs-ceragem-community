import type { ProfileDTO } from "@/entities/profile/api/dto-types";

export type FriendType =
  | "NORMAL"
  | "FAVORITE"
  | "ME"
  | "BLOCK"
  | "DELETE"
  | "HIDE"
  | "LEAVE"
  | "NONE"
  | "REJECT"
  | "REQUEST"
  | "REQUESTED";

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
  relationType: FriendType;
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
