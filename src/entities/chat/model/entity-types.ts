import type {
  Profile,
  EditableProfile,
  PersonalInfo,
} from "@/entities/profile";
import type { RelationType } from "@/entities/friend";

// 채팅 멤버 타입
export interface Member extends EditableProfile, PersonalInfo {
  accountId: number;
  sendbirdId: string;
  accountType: "USER" | string;
  accountStatus: "NORMAL" | string;
  profile: Profile;
  participantType: "MASTER" | string;
  joinDate: number;
  relationType: RelationType;
}
