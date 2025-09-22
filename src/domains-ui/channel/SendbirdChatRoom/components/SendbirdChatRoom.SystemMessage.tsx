import { useState, useEffect } from "react";
import { BaseMessage } from "@sendbird/chat/message";
import {
  extractNamesFromSysMsg,
  insertNamesIntoTemplate,
  SYSTEM_MESSAGE_TEMPLATES,
  MessageDataType,
} from "@/domains/message";
import { parseJson } from "@/shared/utils";
import styles from "./SendbirdChatRoom.SystemMessage.module.css";

interface SendbirdChatRoomSystemMessageProps {
  message: BaseMessage;
}

export const SendbirdChatRoomSystemMessage = ({
  //   channelInfo,
  message,
}: SendbirdChatRoomSystemMessageProps) => {
  const [text, setText] = useState("");
  const [reInvite, setReInvite]: any = useState([]);

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
    extractNamesFromSysMsg(message).then((names) => {
      const data = parseJson(message.data || "");
      const template =
        SYSTEM_MESSAGE_TEMPLATES[
          data.type as keyof typeof SYSTEM_MESSAGE_TEMPLATES
        ];
      setText(template ? insertNamesIntoTemplate(template, names) : "");
    });
  }, [message]);

  return (
    <div className={styles.chat_message_content_wrap}>
      <div className={styles.chat_message}>{text}</div>
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
