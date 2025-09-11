export interface Friend {
  id: string;
  name: string;
  profileImage?: string;
  phoneNumber?: string;
  email?: string;
  department?: string;
  position?: string;
  status: FriendStatus;
  statusMessage?: string;
  lastSeen?: Date;
  isOnline: boolean;
}

export type FriendStatus =
  | "normal" // 본사
  | "favorite" // 즐겨찾기
  | "blocked" // 차단
  | "pending" // 대기중
  | "requested" // 요청됨
  | "hidden"; // 숨김

export interface FriendGroup {
  id: string;
  name: string;
  count: number;
  friends: Friend[];
  isCollapsed?: boolean;
}

export interface FriendSearchFilters {
  query?: string;
  status?: FriendStatus[];
  department?: string[];
  isOnline?: boolean;
}

// 조직도 관련 타입
export interface OrganizationNode {
  id: string;
  name: string;
  position: string;
  department: string;
  profileImage?: string;
  children?: OrganizationNode[];
  parentId?: string;
}

// 세라젬 패밀리 관련 타입
export interface FamilyMember {
  id: string;
  name: string;
  profileImage?: string;
  familyRole: string; // 가족 내 역할
  relation: string; // 관계
  joinedAt: Date;
  isActive: boolean;
}
