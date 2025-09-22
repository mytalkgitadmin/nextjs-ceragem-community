import { BaseMessage } from "@sendbird/chat/message";
import { parseJson } from "@/shared/utils/stringUtils";
import {
  getSendbirdProfile,
  UNKNOWN_USER,
  getUserNameFromProfile,
} from "@/domains/profile";
import { RelationType } from "@/domains/contact";
import { MessageDataType } from "../constants";

/**
 * 어드민 메시지에서 사용자 이름을 추출
 * @param message 메시지
 * @returns 사용자 이름
 */

export async function getUserNamesFromAdminMessage(message: BaseMessage) {
  const data = parseJson(message.data || "");
  const users = data?.users || [];
  const userNames = [];
  for (const user of users) {
    const result = await getSendbirdProfile(user.user_id);
    const profile = result.resultData.accountProfile;

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
