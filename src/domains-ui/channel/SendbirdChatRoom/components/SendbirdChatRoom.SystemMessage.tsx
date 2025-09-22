import { useState, useEffect } from "react";
import { getSysMsgUserNames } from "@/domains/message";
import styles from "./SendbirdChatRoom.SystemMessage.module.css";

export const SendbirdChatRoomSystemMessage = ({
  //   channelInfo,
  message,
}: any) => {
  console.log("message", message);
  const [reInvite, setReInvite]: any = useState([]);
  const data = (() => {
    try {
      return message?.message?.data ? JSON.parse(message?.message?.data) : {};
    } catch {
      return {};
    }
  })();
  const type = data?.type ? data.type : "";
  let resultMessage = "";

  //   // sendbird id를 통한 프로필 정보 가져오기
  //   const getUserBySendbirdId = (sendbirdId: string) => {
  //     const {
  //       data: accountProfile,
  //       isLoading: accountProfileLoading,
  //       error: accountProfileError,
  //     } = useQuery(
  //       [QUERY_KEYS.sendBirdIdforProfile, sendbirdId],
  //       () => getSendbirdProfile(sendbirdId),
  //       {
  //         enabled: !isEmpty(sendbirdId),
  //         refetchOnWindowFocus: false,
  //         retry: 1,
  //       }
  //     );

  //     if (accountProfile && accountProfile.resultData) return accountProfile;

  //     return null;
  //   };

  //   // 사용자 초대
  //   const poseInvite: any = useMutation({
  //     mutationFn: ({ data }: { data: InviteChannelParams }) => {
  //       return inviteChannel(data);
  //     },
  //     onSuccess: (res: any) => {},
  //     onError: (e: any) => {},
  //   });

  //   // 사용자 초대
  //   const invite = (accountIds: []) => {
  //     poseInvite.mutate({
  //       data: {
  //         accountIds: accountIds,
  //         channelUrl: channelInfo?.channelUrl,
  //       },
  //     });
  //   };

  useEffect(() => {
    const userNames = getSysMsgUserNames(message);
    console.log("userNames", userNames);
  }, [message]);

  //   const generateResultMessage = () => {
  //     const names = getUserNamesFromMessage();

  //     switch (type) {
  //       case MessageType.USER_JOIN:
  //         return formatAdminMessage(ADMIN_MESSAGE_TEMPLATES.USER_INVITED, names);
  //       case MessageType.CHANNEL_ASSIGN_MASTER:
  //         return formatAdminMessage(
  //           ADMIN_MESSAGE_TEMPLATES.MASTER_CHANGED,
  //           names
  //         );
  //       case MessageType.USER_LEAVE:
  //         return formatAdminMessage(ADMIN_MESSAGE_TEMPLATES.USER_LEFT, names);
  //       case MessageType.CHANNEL_KICK_USERS:
  //         return formatAdminMessage(ADMIN_MESSAGE_TEMPLATES.USER_KICKED, names);
  //       default:
  //         return "";
  //     }
  //   };

  //   resultMessage = generateResultMessage();

  return (
    <div className={styles.chat_message_content_wrap}>
      <div className={styles.chat_message}>{resultMessage}</div>
      {reInvite &&
        reInvite.length > 0 &&
        reInvite.map((invite: any, index: number) => {
          return (
            <div key={`invite-${index}`} className={styles.chat_message}>
              {/* {resultMessage} */}
            </div>
          );
        })}
    </div>
  );
};
