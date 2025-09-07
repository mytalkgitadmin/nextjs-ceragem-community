export enum MessageType {
  ADMIN = 'admin',
  USER = 'user',
  FILE = 'file',
}
export enum MessageCustomType {
  SENDBIRD = 'SENDBIRD:AUTO_EVENT_MESSAGE',
  BEFAMILY = 'BEFAMILY:AUTO_EVENT_MESSAGE',
}
export enum MessageInDataType {
  // SENDBIRD
  USER_JOIN = 'USER_JOIN',
  USER_LEAVE = 'USER_LEAVE',
  CHANNEL_KICK_USERS = 'CHANNEL_KICK_USERS',
  CHANNEL_ASSIGN_MASTER = 'CHANNEL_ASSIGN_MASTER',

  // BEFAMILY
  MESSAGE_BUBBLE = 'MESSAGE_BUBBLE', //버블티콘
  MESSAGE_FILE = 'MESSAGE_FILE', //파일 메시지
  MESSAGE_CONTACT = 'MESSAGE_CONTACT', //연락처
  CHANNEL_CAPTURED = 'CHANNEL_CAPTURED',
  MESSAGE_EMOTICON = 'MESSAGE_EMOTICON',
  MESSAGE_SMILE_ME = 'MESSAGE_SMILE_ME', //스마일미
  CHANNEL_NOTICE = 'CHANNEL_NOTICE',
  MESSAGE_COMBINATION = 'MESSAGE_COMBINATION',
  MESSAGE_COMBINATION2 = 'MESSAGE_COMBINATION2',
  CHANNEL_INVITE = 'CHANNEL_INVITE',
  //WITH_DRAWAL = 'BEFAMILY:CHANNEL:WITH_DRAWAL',
  MESSAGE_DELETED_ALL = 'MESSAGE_DELETED_ALL',
  MESSAGE_DELETED_MY = 'MESSAGE_DELETED_MY',
  //ALBUM_CREATED = 'BEFAMILY:ALBUM:CREATED', //미사용
  ALBUM_ADD_PHOTO = 'ALBUM_ADD_PHOTO',
  ALBUM_ADD_LIKE = 'ALBUM_ADD_LIKE',
  //ALBUM_TAGGED = 'BEFAMILY:ALBUM:TAGGED', //미사용
  DDAY_CREATED = 'DDAY_CREATED',
  MESSAGE_DELETED = 'MESSAGE_DELETED', //단일 메시지 삭제
  BEFAMILY_PROFILE_UPDATE = 'BEFAMILY_PROFILE_UPDATE',
  UPDATE_TIMER_NOTI = 'UPDATE_TIMER_NOTI', //대화방 타이머 설정
  UPDATED_TIMER_MESSAGE = 'UPDATED_TIMER_MESSAGE', //대화방 타이머에 대한 메시지 삭제
  //MESSAGE_DELETED_MY_SCREEN = 'MESSAGE_DELETED_MY_SCREEN', // 대화방(본인화면) 단일 삭제 (미사용 협의, deleteUsers 유무로 구분)
  MESSAGE_DELETED_ALL_SCREEN = 'MESSAGE_DELETED_ALL_SCREEN', // 대화방(모두) 단일 삭제
  DELETED_TIMER_MESSAGE = 'DELETED_TIMER_MESSAGE', //삭제된 메시지 (어드민 메시지)
  MESSAGE_AFFILIATE = 'MESSAGE_AFFILIATE', //재휴사 메시지
  MESSAGE_FAMILY_EVENT = 'MESSAGE_FAMILY_EVENT', //가족행사 메시지
  MESSAGE_CALENDAR_EVENT = 'MESSAGE_CALENDAR_EVENT', //캘린더 일정 메시지
  MESSAGE_DDAY_EVENT = 'MESSAGE_DDAY_EVENT', //디데이 메시지
}

// Setting Modal Type
export enum SettingModalEnum {
  SETTING,
  CONNECT_MODE,
  HIDE_MNG,
  BLOCK_MNG,
  GROUP_SORT_MNG,
  GROUP_MNG,
  PWD_CHANGE_EMAIL, //전체 설정 > 계정 > 비밀번호 변경 (이메일 인증)
  PWD_CHANGE_CURRENT, //전체 설정 > 계정 > 비밀번호 변경 (기존 비밀번호 입력)
  PWD_CHANGE_NEW, //전체 설정 > 계정 > 비밀번호 변경 (신규 비밀번호 입력)
}

// Profile Modal Type
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

export enum DdayModalEnum {
  DDAY_SELECT, //디데이 기념일 선택
  DDAY_ADD, //디데이 기념일 등록
  DDAY_LIST, //디데이 리스트
  DDAY_DETAIL, //디데이 상세
}

export enum PointModalEnum {
  POINT_MAIN,
  POINT_HISTORY,
  POINT_EXCAHNGE,
  POINT_COUPON,
}

export enum MenuItem {
  FRIEND,
  MY,
  GIFT,
  CHAT,
  FAMILY_ALBUM,
  ALL_EDIT,
  NONE,
}

export enum LayoutType {
  EXPAND,
  COLLAPSE,
}

export enum SettingModalMenuType {
  ACCOUNT,
  FRIEND,
  TALK,
  NOTICE,
  CS,
  INFOR,
}

export enum SettingModalTalkType {
  TextWidth, // 글자 크기 변경
  BackgroundColor, // 배경 화면 변경
  Backup, // 백업
}

export enum FileKind {
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
  ETC = 'ETC',
  GIF = 'GIF',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  WEBP = 'WEBP',
  ZIP = 'ZIP',
}

export enum FileCategoryList {
  ALBUM = 'ALBUM',
  BACKUP = 'BACKUP',
  CALENDAR = 'CALENDAR',
  CHAT = 'CHAT',
  COMMON = 'COMMON',
  FEED = 'FEED',
  POINT = 'POINT',
  PROFILE = 'PROFILE',
  RESOURCE = 'RESOURCE',
  SMILE_ME = 'SMILE_ME',
}

export enum FileSubCategoryList {
  ALBUM_MEDIA = 'ALBUM_MEDIA',
  ALBUM_THUMBNAIL = 'ALBUM_THUMBNAIL',
  BACKUP = 'BACKUP',
  CHAT_FILE = 'CHAT_FILE',
  CHAT_MEDIA = 'CHAT_MEDIA',
  CHAT_THUMBNAIL = 'CHAT_THUMBNAIL',
  COMMON_IMAGE = 'COMMON_IMAGE',
  COMMON_NOTICE = 'COMMON_NOTICE',
  DDAY_BACKGROUND = 'DDAY_BACKGROUND',
  DDAY_BGCKGROUND_THUMBNAIL = 'DDAY_BGCKGROUND_THUMBNAIL',
  DDAY_BG_DEFAULT = 'DDAY_BG_DEFAULT',
  DDAY_BG_DEFAULT_THM = 'DDAY_BG_DEFAULT_THM',
  FEED = 'FEED',
  POINT_MISSIONS = 'POINT_MISSIONS',
  POINT_PRODUCTS = 'POINT_PRODUCTS',
  PROFILE_ORIGIN = 'PROFILE_ORIGIN',
  PROFILE_SMALL_THUMBNAIL = 'PROFILE_SMALL_THUMBNAIL',
  PROFILE_THUMBNAIL = 'PROFILE_THUMBNAIL',
  RESOURCE = 'RESOURCE',
  SMILE_ME = 'SMILE_ME',
}

export enum PreviewTypes {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  ALBUM = 'ALBUM',
  UNKNOWN = 'UNKNOWN',
}

// 친구 타입
export enum RelationType {
  BLOCK = 'BLOCK', //친구 차단
  DELETE = 'DELETE', //친구 삭제
  FAVORITE = 'FAVORITE', //즐겨찾기
  HIDE = 'HIDE', //친구 숨김
  LEAVE = 'LEAVE', //탈퇴
  ME = 'ME', //나
  NONE = 'NONE', // 친구 데이터가 없음
  NORMAL = 'NORMAL', //친구 상태
  REQUEST = 'REQUEST', //친구 요청한 상태
  REQUESTED = 'REQUESTED', //친구 요청 받은 상태
}

// 대화내용 컨트롤 타입
export enum MessageControlType {
  DEFAULT = 'DEFAULT', // 기본
  COPY = 'COPY', // 메세지 복사
  MY_MEMO = 'MY_MEMO', // MY 메모
  RELAY = 'RELAY', // 메세지 전달
  REPLY = 'REPLY', // 메세지 답장
  DELETE_MY = 'DELETE_MY', // 메시지 삭제(내화면)
  DELETE_ALL = 'DELETE_ALL', // 메시지 삭제(친구화면까지)
}
