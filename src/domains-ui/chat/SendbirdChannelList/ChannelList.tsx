import React, { useState, useCallback } from "react";
import { useGroupChannelListContext } from "@sendbird/uikit-react/GroupChannelList/context";
import PlaceHolder from "@sendbird/uikit-react/ui/PlaceHolder";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { ListEmpty } from "./ListEmpty";
import { useInfiniteScroll } from "@/shared/hooks";
import { ChannelPreview } from "../ChannelPreview";

import styles from "./ChannelList.module.css";

const SCROLL_CONTAINER_ID = "sendbird_channel_list";

interface ChannelListProps {}

export const ChannelList = ({}: ChannelListProps) => {
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

  // const { searchName, setSearchName, getFilteredChannels } = useChannelSearch();

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
          <ListEmpty />
        )}
      </div>
    </div>
  );
};
