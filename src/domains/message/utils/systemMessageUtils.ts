import { BaseMessage } from "@sendbird/chat/message";
import { parseJson } from "@/shared/utils/stringUtils";
import { getSendbirdProfile, getUserNameFromProfile } from "@/domains/profile";
import { RelationType } from "@/domains/contact";
import { MessageDataType, TIMER_MESSAGES } from "../constants";

/**
 * 시스템 메시지에서 사용자 이름을 추출
 * @param message 메시지
 * @returns 사용자 이름
 */

const UNKNOWN_USER = `'알 수 없음'`;

export async function extractNamesFromMessageForSysMsg(message: BaseMessage) {
  const data = parseJson(message.data || "");
  const users = data?.users || [];
  const userNames = [];
  for (const user of users) {
    const result = await getSendbirdProfile(user.user_id);
    const profile = result?.resultData?.accountProfile;

    if (!profile) {
      userNames.push(UNKNOWN_USER);
      continue;
    } else {
      const relationType = profile.relationType;

      if (
        relationType === RelationType.DELETE ||
        relationType === RelationType.LEAVE
      ) {
        userNames.push(UNKNOWN_USER);
        continue;
      }

      const validRelationTypes = [
        RelationType.NONE,
        RelationType.NORMAL,
        RelationType.FAVORITE,
        RelationType.ME,
      ];

      if (
        data.type === MessageDataType.USER_LEAVE ||
        data.type === MessageDataType.CHANNEL_KICK_USERS
      ) {
        validRelationTypes.push(RelationType.REQUEST, RelationType.REQUESTED);
      }

      if (validRelationTypes.includes(relationType)) {
        const name = getUserNameFromProfile(profile);
        userNames.push(name);
      }
    }
  }
  return userNames;
}

/**
 * 커스텀 시스템 메시지에서 사용자 이름을 추출
 * @param message 메시지
 * @returns 사용자 이름
 */

export async function extractNameFromMessageForCustomSysMsg(
  message: BaseMessage
) {
  const data = parseJson(message.data || "");
  const users = data?.users || [];

  if (!users || users.length === 0) return UNKNOWN_USER;

  const result = await getSendbirdProfile(users[0].user_id);
  const profile = result?.resultData?.accountProfile;

  if (!profile) return UNKNOWN_USER;

  if (
    [RelationType.DELETE, RelationType.LEAVE].includes(profile.relationType)
  ) {
    return UNKNOWN_USER;
  } else {
    return getUserNameFromProfile(profile);
  }
}

/**
 * 시스템 메시지에 사용자 이름을 삽입
 * @param template 템플릿
 * @param names 사용자 이름 배열
 * @returns 삽입된 템플릿
 */

export function insertNamesIntoSysMsg(template: string, names: string[]) {
  return template.replace(
    "{names}",
    names.map((name) => `'${name}'`).join(", ")
  );
}

/**
 * 커스텀 시스템 메시지에 사용자 이름을 삽입
 * @param template 템플릿
 * @param values 사용자 이름 배열
 * @returns 삽입된 템플릿
 */

export function insertNamesIntoCustomSysMsg(
  template: string,
  values: Record<string, string>
) {
  let result = template;

  for (const [key, value] of Object.entries(values)) {
    result = result.replace(`{${key}}`, value);
  }

  return result;
}

/**
 * 타이머 시간값(초)에 따른 메시지 반환 함수
 * @param timer 타이머 시간(초)
 * @returns 해당 타이머에 맞는 메시지
 */
export const getTimerMessage = (timer: number): string => {
  switch (timer) {
    case 0:
      return TIMER_MESSAGES.OFF;
    case 60:
      return TIMER_MESSAGES.ONE_MINUTE;
    case 600:
      return TIMER_MESSAGES.TEN_MINUTES;
    case 3600:
      return TIMER_MESSAGES.ONE_HOUR;
    case 86400:
      return TIMER_MESSAGES.ONE_DAY;
    case 604800:
      return TIMER_MESSAGES.ONE_WEEK;
    case 2419200:
      return TIMER_MESSAGES.FOUR_WEEKS;
    default:
      return "";
  }
};
