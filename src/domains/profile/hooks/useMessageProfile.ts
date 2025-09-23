import { useState, useEffect } from "react";
import { useChannelMembers } from "@/domains/channel";
import { useSendbirdProfile } from "../queries";
import { BaseMessage } from "@sendbird/chat/message";
import { getUserNameFromProfile, getImgFromProfile } from "../utils";

const DEFAULT_NICKNAME = "(알 수 없음)";
const DEFAULT_PROFILE_IMG = "/assets/images/profile/bemily_profile000.png";

export const useMessageSenderProfile = (message: BaseMessage) => {
  const [channelNickname, setChannelNickname] = useState(DEFAULT_NICKNAME);
  const [channelProfileImg, setChannelProfileImg] =
    useState(DEFAULT_PROFILE_IMG);

  const { sender, channelUrl } = message;
  const channelMembers = useChannelMembers(channelUrl);
  const sendbirdId = sender?.userId;
  const userInfo = channelMembers.find(
    (member) => member.accountId === sendbirdId
  );

  const { data } = useSendbirdProfile(sendbirdId);
  const sendbirdProfile = data?.resultData.accountProfile;

  useEffect(() => {
    if (sender && userInfo && userInfo.accountStatus !== "EXIT") {
      // 나간 사용자인 경우
      const nickname =
        userInfo.relationType === "LEAVE"
          ? sender?.nickname || DEFAULT_NICKNAME
          : getUserNameFromProfile(userInfo.profile, DEFAULT_NICKNAME);

      const profileImg = getImgFromProfile(userInfo.profile);

      setChannelNickname(nickname);
      setChannelProfileImg(profileImg);
    }
  }, [userInfo, sender]);

  return {
    sendbirdId,
    nickname:
      channelNickname ||
      getUserNameFromProfile(sendbirdProfile, DEFAULT_NICKNAME) ||
      DEFAULT_NICKNAME,
    profileImg:
      channelProfileImg ||
      getImgFromProfile(sendbirdProfile.profile) ||
      DEFAULT_PROFILE_IMG,
    isNicknameNone: channelNickname === DEFAULT_NICKNAME,
    isProfileImgNone: channelProfileImg === DEFAULT_PROFILE_IMG,
  };
};
