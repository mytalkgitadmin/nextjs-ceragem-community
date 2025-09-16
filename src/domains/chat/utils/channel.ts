import { getMemberName } from "./member";

/**
 * 채널명 생성 함수
 * 멤버 이름들을 콤마로 연결하여 채널명 생성 (최대 50자)
 * @param members 멤버 배열
 * @returns 생성된 채널명
 */
export const generateChannelName = (members: any[]): string => {
  let result = "";

  for (let i = 0; i < members.length; i++) {
    if (i > 0) {
      result += ", ";
    }
    result += getMemberName(members[i]) || "";

    // 길이가 50자를 넘으면 생략 표시 후 중단
    if (i < members.length - 1 && result.length >= 50) {
      result += "...";
      break;
    }
  }
  return result;
};
