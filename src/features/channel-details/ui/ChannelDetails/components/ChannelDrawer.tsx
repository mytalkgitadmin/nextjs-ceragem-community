import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/overlays";
import useChannelInfo from "@/features/channel-member-list/model/useChannelInfo";

import { Icons } from "@/shared/ui/icon";
import { useGroupChannelContext } from "@sendbird/uikit-react/GroupChannel/context";
import { Button } from "@/shared/ui/button";

import styles from "./ChannelDrawer.module.scss";
import useChannelFilePreview from "@/features/channel-details/model/useChannelFilePreview";
import { getApiBaseUrl } from "@/shared/api";
import FileCard from "@/entities/attachment/ui/FileCard";
import { useAuth } from "@/features/auth";
import { IconButton } from "@/shared/ui/button";
import { useChannelDrawerStore } from "@/features/channel-details/model/useChannelDrawerStore";
import { ChatMembersList } from "@/features/channel-member-list";

export default function ChannelDrawer({
  title,
  channelCustomType,
}: {
  title: string;
  channelCustomType: "DIRECT" | "MY" | "GROUP";
}) {
  const { channelDrawer, openChannelDrawer, closeChannelDrawer } =
    useChannelDrawerStore();

  const { userProfile } = useAuth();
  const { currentChannel: channel } = useGroupChannelContext();
  const channelInfoForDrawer = useChannelInfo(channel, true);

  const BELL = true;
  const PIN = false;
  const { data: images } = useChannelFilePreview({
    channelUrl: channel?.url,
    isOpen: true,
    type: "image",
  });

  const { data: files } = useChannelFilePreview({
    channelUrl: channel?.url,
    isOpen: true,
    type: "file",
  });

  return (
    <Drawer
      direction="right"
      open={channelDrawer.isOpen}
      onOpenChange={(open) =>
        open ? openChannelDrawer() : closeChannelDrawer()
      }
    >
      <DrawerTrigger asChild>
        <IconButton
          name="menu"
          text="대화방 메뉴"
          onClick={openChannelDrawer}
        />
      </DrawerTrigger>
      <DrawerContent className={styles.drawerContent}>
        {/* header */}
        <DrawerHeader className={styles.drawerHeader}>
          <DrawerTitle>{title}</DrawerTitle>

          <DrawerDescription
            className={channelCustomType !== "GROUP" ? "sr-only" : ""}
          >
            참여자 {channelInfoForDrawer.membersList?.length || 1}명
          </DrawerDescription>
        </DrawerHeader>
        {/* body */}
        <div className={styles.drawerBody}>
          <div className={styles.pad}>
            <h3>
              <button type="button" className={styles.titleBtn}>
                <span>
                  <Icons name="photo" /> 사진/동영상
                </span>
                <Icons name="chevronRight" className={styles.right} />
              </button>
            </h3>

            <ul className={styles.imgWrap}>
              {images.map((img) => (
                <li key={img.fileId}>
                  <img
                    src={`${getApiBaseUrl()}${img.thumbnailInfo1?.directUrl}`}
                    alt=""
                  />
                </li>
              ))}
            </ul>
            <h3>
              <button type="button" className={styles.titleBtn}>
                <span>
                  <Icons name="folder" /> 파일
                </span>
                <Icons name="chevronRight" className={styles.right} />
              </button>
            </h3>

            {files && files.length > 0 && (
              <ul className={styles.fileWrap}>
                {files.map((file) => (
                  <li key={file.fileId}>
                    <FileCard
                      fileType={file.info.fileKind}
                      url={file.info.directUrl}
                      originalFileName={file.info.fileName}
                      fileSize={file.info.fileSize}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.gap}></div>
          <div className={styles.pad}>
            {channelCustomType !== "MY" ? (
              <>
                <button className={styles.addBtn}>
                  <Icons name="plus" />
                  대화상대 추가
                </button>

                <ChatMembersList
                  members={channelInfoForDrawer?.membersList}
                  channelCustomType={channelCustomType}
                />
              </>
            ) : (
              <>
                {userProfile && (
                  <ChatMembersList
                    members={[userProfile]}
                    channelCustomType={channelCustomType}
                  />
                )}
              </>
            )}
          </div>
        </div>
        {/* footer */}
        <DrawerFooter className={styles.drawerFooter}>
          {channelCustomType !== "MY" && (
            <Button variant="ghost">나가기</Button>
          )}
          <div>
            {channelCustomType !== "MY" && (
              <>
                {BELL ? (
                  <IconButton
                    name="bell-filled"
                    text="알람끄기"
                    className={styles.primary}
                  />
                ) : (
                  <IconButton name="bell-filled" text="알림켜기" />
                )}

                {PIN ? (
                  <IconButton
                    name="pin-filled"
                    text="핀 고정 해제"
                    className={styles.primary}
                  />
                ) : (
                  <IconButton name="pin" text="핀 고정" />
                )}
              </>
            )}

            <IconButton name="settings" text="설정" />
          </div>

          <DrawerClose asChild className={styles.closeBtn}>
            <IconButton name="x" text="닫기" />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
