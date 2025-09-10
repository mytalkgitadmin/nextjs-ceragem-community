"use client";

import { Fragment } from "react";

import { useGroupChannelContext } from "@sendbird/uikit-react/GroupChannel/context";
import { IconButton } from "@/shared/ui/IconButton";
import { useChatLayoutStore } from "../../store/useChatLayoutStore";
import useChannelInfo from "@/features/chat/hooks/useChannelInfo";

import { getMemberName } from "@/features/chat/lib";
import { ChannelDrawer } from "../ChannelDrawer";

import styles from "./ChannelHeader.module.scss";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { useRouter } from "next/navigation";

export default function ChannelHeader() {
  const { currentChannel: channel } = useGroupChannelContext();
  const { isChatListVisible, toggleChatList } = useChatLayoutStore();
  const channelInfoForHeader = useChannelInfo(channel, false);
  const isMobile = useMediaQuery(500);
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div>
        {isChatListVisible ? (
          <IconButton
            name="chevronLeft"
            text="대화목록 접기"
            onClick={toggleChatList}
          />
        ) : (
          <IconButton
            name="chevronRight"
            text="대화목록 열기"
            onClick={() => {
              if (isMobile) {
                router.push("/chat-list");
              } else {
                toggleChatList();
              }
            }}
          />
        )}

        {channel?.customType === "MY" ? (
          <p>MY 메모</p>
        ) : (
          <p>
            {channelInfoForHeader.channelName ||
              channelInfoForHeader.membersList?.map((member, index) => {
                if (index === 0)
                  return (
                    <Fragment key={`member${index}`}>
                      {getMemberName(member)}
                    </Fragment>
                  );
                return (
                  <Fragment key={`member${index}`}>
                    , {getMemberName(member)}
                  </Fragment>
                );
              })}{" "}
            {channelInfoForHeader.membersList.length > 1 && (
              <strong>{channelInfoForHeader.membersList.length}</strong>
            )}
          </p>
        )}
      </div>

      <div>
        <IconButton name="stopwatch" text="타이머" />

        <ChannelDrawer
          title={channelInfoForHeader.channelName}
          channelCustomType={channel?.customType as "DIRECT" | "MY" | "GROUP"}
        />
      </div>
    </header>
  );
}
