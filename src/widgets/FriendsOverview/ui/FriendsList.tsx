import { Fragment, useState } from 'react';

import {
  Friend,
  useFriendBlock,
  useFriendBlockCancel,
  useFriendFavorite,
  useFriendHide,
  useFriendHideCancel,
} from '@/features/friend/api';
import { ProfileViewer } from '@/widgets/Profile';
import { ProfileCard } from '@/widgets/Profile/ui/ProfileCard';
import { ProfileItem } from '@/widgets/Profile/ui/ProfileItem';
import {
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from '@/shared/ui/accordion';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/shared/ui/context-menu';

import styles from './Friends.module.scss';
import { Button } from '@/shared/ui/button';
import { AccountProfile, Member } from '@/features/chat/model';
import { useAuth } from '@/features/auth';

import { IconButton } from '@/shared/ui/IconButton';
import { getThumbnailUrl } from '@/features/viewer/utils/mediaUtils';

export default function FriendsList({
  friends,
  title,
  index,
  horizon,
}: {
  friends: Friend[] | Member[] | AccountProfile[];
  title?: string;
  index?: number;
  horizon?: boolean;
}) {
  const { userProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [accountId, setAccountId] = useState(0);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const friendHideCancel = useFriendHideCancel();
  const friendBlockCancel = useFriendBlockCancel();

  const favoriteMutation = useFriendFavorite();

  const hideMutation = useFriendHide();
  const blockMutation = useFriendBlock();

  const openViewer = ({
    accountId,
    profileImageUrl,
  }: {
    accountId: number;
    profileImageUrl: string;
  }) => {
    setIsOpen(true);
    setAccountId(accountId);
    setProfileImageUrl(profileImageUrl);
  };

  const closeViewer = () => {
    setIsOpen(false);
  };
  if (index) {
    return (
      <>
        <AccordionItem value={`item${index}`}>
          {title && (
            <AccordionTrigger className={styles.title2}>
              <Title title={title} length={friends.length} />
            </AccordionTrigger>
          )}
          <div className={horizon ? styles.horizonWrap : ''}>
            {friends.map((friend) => {
              const profileImageUrl = getThumbnailUrl(friend.profile);
              return (
                <Fragment key={friend.accountId}>
                  <AccordionContent className={styles.item}>
                    <ContextMenu>
                      <ContextMenuTrigger className="w-full">
                        <ProfileCard
                          profile={friend.profile}
                          profileImageUrl={profileImageUrl}
                          syncName={friend.syncName}
                          editedName={friend.editedName}
                          horizon={horizon}
                          onClick={() =>
                            openViewer({
                              accountId: friend.accountId,
                              profileImageUrl,
                            })
                          }
                        />
                      </ContextMenuTrigger>

                      <ContextMenuContent className={styles.menu}>
                        {friend.relationType !== 'REQUESTED' ? (
                          <>
                            <ContextMenuItem>대화하기</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem
                              onClick={() =>
                                openViewer({
                                  accountId: friend.accountId,
                                  profileImageUrl,
                                })
                              }
                            >
                              프로필보기
                            </ContextMenuItem>
                            {/* <ContextMenuItem>패밀리 설정</ContextMenuItem> */}
                            <ContextMenuItem>이름 변경</ContextMenuItem>
                            <ContextMenuItem
                              onClick={() =>
                                favoriteMutation.mutate({
                                  friendId: friend.accountId,
                                  isFavorite:
                                    friend.relationType === 'FAVORITE'
                                      ? false
                                      : true,
                                })
                              }
                            >
                              즐겨찾기
                              {friend.relationType === 'FAVORITE' && ' 해제'}
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem
                              onClick={() =>
                                hideMutation.mutate(friend.accountId)
                              }
                            >
                              숨김
                            </ContextMenuItem>
                            <ContextMenuItem
                              onClick={() =>
                                blockMutation.mutate(friend.accountId)
                              }
                            >
                              차단
                            </ContextMenuItem>
                          </>
                        ) : (
                          <>
                            <ContextMenuItem>친구 추가</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem
                              onClick={() =>
                                openViewer({
                                  accountId: friend.accountId,
                                  profileImageUrl,
                                })
                              }
                            >
                              프로필보기
                            </ContextMenuItem>
                          </>
                        )}
                      </ContextMenuContent>
                    </ContextMenu>
                  </AccordionContent>
                </Fragment>
              );
            })}

            <ProfileViewer
              open={isOpen}
              accountId={accountId}
              profileImageUrl={profileImageUrl}
              onOpenChange={closeViewer}
            />
          </div>
        </AccordionItem>
      </>
    );
  }

  return (
    <>
      {title && <Title title={title} length={friends.length} />}
      <div className={horizon ? styles.horizonWrap : 'listWrap'}>
        {friends.map((friend) => {
          return (
            <div className="flex items-center" key={friend.accountId}>
              <ProfileItem
                profile={friend.profile}
                accountId={friend?.accountId}
                editedName={friend.editedName}
                syncName={friend.syncName}
                isMyProfile={friend.accountId === userProfile?.accountId}
              />

              {friend.relationType === 'NONE' && (
                <IconButton name="user-plus" text="친구 추가" />
              )}

              {friend.relationType === 'DELETE' && (
                <IconButton name="user-plus" text="친구 추가" />
              )}

              {friend.relationType === 'HIDE' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => friendHideCancel.mutate(friend.accountId)}
                >
                  해제
                </Button>
              )}
              {friend.relationType === 'BLOCK' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => friendBlockCancel.mutate(friend.accountId)}
                >
                  해제
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

const Title = ({ title, length }: { title: string; length: number }) => {
  return (
    <h3 className={styles.title2}>
      {title} <span>{length}</span>
    </h3>
  );
};
