import React, { useState, SetStateAction, Dispatch } from "react";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { GroupChannelListProvider } from "@sendbird/uikit-react/GroupChannelList/context";
import { useChannelOpen } from "@/domains/channel";
import { useGroupChannelListContext } from "@sendbird/uikit-react/GroupChannelList/context";
import PlaceHolder from "@sendbird/uikit-react/ui/PlaceHolder";
import { useInfiniteScroll } from "@/shared/hooks";
import { ChannelPreview, SendbirdChannelListEmpty } from "./components";
import styles from "./SendbirdChannelList.module.css";
import "./sendbird.css";

const SCROLL_CONTAINER_ID = "sendbird_channel_list";

export const SendbirdChannelList = () => {
  const { openChannel } = useChannelOpen();
  return (
    <GroupChannelListProvider
      onChannelSelect={(channel) => channel && openChannel(channel)}
      onChannelCreated={() => {}}
      channelListQueryParams={{
        // 운영 PRIVATE 제외
        customTypesFilter: ["DIRECT", "GROUP"], // 'PRIVATE', 'DIRECT', 'MY', 'GROUP'
      }}
      disableAutoSelect
    >
      <Channels />
    </GroupChannelListProvider>
  );
};

const Channels = ({}) => {
  const {
    groupChannels,
    onChannelSelect,
    initialized, // loading 대신 사용
    loadMore, // SendBird에서 제공하는 loadMore 함수
    scrollRef: sendbirdScrollRef,
    refreshing,
  } = useGroupChannelListContext();

  const { isLoadingMore, loadMoreTriggerRef, error, retry } = useInfiniteScroll(
    {
      hasNext: !!loadMore,
      loadMore,
      scrollContainerId: SCROLL_CONTAINER_ID,
    }
  );

  if (!initialized) {
    return <PlaceHolder type={"LOADING"} />;
  }

  return (
    <div className={styles.sendbird_channel_list}>
      <div
        id={SCROLL_CONTAINER_ID}
        className={styles.sendbird_channel_list_body}
        ref={sendbirdScrollRef}
      >
        {groupChannels.length > 0 ? (
          <>
            {groupChannels.map((channel: GroupChannel, index: number) => {
              return (
                <div
                  key={`channel_list_${channel.url}_${index}`}
                  onClick={() => onChannelSelect(channel)}
                >
                  <ChannelPreview channel={channel} />
                </div>
              );
            })}
            {/* 무한 스크롤 트리거 (Intersection Observer용) */}
            {!!loadMore && !refreshing && (
              <div
                ref={loadMoreTriggerRef}
                className={styles.load_more_trigger}
              />
            )}
          </>
        ) : (
          <SendbirdChannelListEmpty />
        )}
      </div>
    </div>
  );
};
