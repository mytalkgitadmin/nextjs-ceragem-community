import React, { useState, SetStateAction, Dispatch } from "react";
import { debounce } from "lodash-es";
import { useChannelListContext } from "@sendbird/uikit-react/ChannelList/context";
import PlaceHolder from "@sendbird/uikit-react/ui/PlaceHolder";
import { useScroll } from "@/shared/hooks";
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { ListEmpty } from "./ListEmpty";

import styles from "./ChannelList.module.css";

interface ChannelListProps {}

const ChannelList = ({}: ChannelListProps) => {
  const { channelSource, allChannels, loading } = useChannelListContext();

  const {
    pinnedChannels,
    unpinnedChannels,
    pinChannel,
    unpinChannel,
    isChannelPinned,
  } = useChannelPin(mergeChannels);
  const { searchName, setSearchName, getFilteredChannels } = useChannelSearch();

  const [selectRowUrl, setSelectRowUrl] = useState<string>("");
  const [openModalEditName, setOpenModalEditName] = useState(false);
  const [openModalLeave, setOpenModalLeave] = useState(false);

  // 로딩 상태 처리
  if (loading) {
    return <PlaceHolder type={"LOADING"} />;
  }

  const handleChannelClick = (channelUrl: string) => {
    // setChannelUrl(channelUrl);
  };

  // const handleEditName = () => {
  //   setOpenModalEditName(!openModalEditName);
  // };

  // const handleLeave = () => {
  //   setOpenModalLeave(!openModalLeave);
  // };

  const { scrollRef } = useScroll(channelSource?.hasNext || false, () => {
    if (channelSource?.hasNext) {
      channelSource.next().catch((error) => {
        console.error("채널 목록 가져오기 실패:", error);
      });
    }
  });

  return (
    <div className={styles.sendbird_channel_list}>
      <div ref={scrollRef} className={styles.sendbird_channel_list_body}>
        {allChannels.length > 0 ? (
          allChannels.map((channel: GroupChannel, index: number) => {
            return (
              <div key={`channel_list_${channel.url}_${index}`}>
                <ChannelListItem
                  channel={channel}
                  channelInfo={currentChannelInfo}
                  isActive={channel.url === channelUrl}
                  isVisible={selectRowUrl === channel.url}
                  onChannelClick={handleChannelClick}
                  // onAlarmToggle={handleAlarm}
                  // onEditName={handleEditName}
                />
              </div>
            );
          })
        ) : (
          <ListEmpty />
        )}
      </div>
    </div>
  );
};

export default ChannelList;
