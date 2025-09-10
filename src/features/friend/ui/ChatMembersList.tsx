import { AccountProfile, Member } from '@/features/chat/model';
import styles from './ChatMembersList.module.scss';
import { ProfileItem } from '@/widgets/Profile/ui/ProfileItem';
import { useAuth } from '@/features/auth';
import { IconButton } from '@/shared/ui/IconButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { useFriendBlockCancel, useFriendHideCancel } from '../api';

const isMember = (member: Member | AccountProfile): member is Member => {
  return 'participantType' in member;
};

export default function ChatMembersList({
  members,
  channelCustomType,
}: {
  members: Member[] | AccountProfile[];
  channelCustomType: 'GROUP' | 'MY' | 'DIRECT';
}) {
  const { userProfile } = useAuth();
  const friendHideCancel = useFriendHideCancel();
  const friendBlockCancel = useFriendBlockCancel();

  const master = members.find(
    (member) => isMember(member) && member.participantType === 'MASTER',
  );
  const isMyGroup =
    channelCustomType === 'GROUP' &&
    master?.accountId === userProfile?.accountId;

  return (
    <div className={styles.wrap}>
      {members.map((member) => {
        const isMaster =
          channelCustomType === 'GROUP' &&
          isMember(member) &&
          member.participantType === 'MASTER';
        return (
          <div className="flex items-center" key={member.accountId}>
            <ProfileItem
              profile={member.profile}
              accountId={member?.accountId}
              editedName={member.editedName}
              syncName={member.syncName}
              type="talk"
              isMyProfile={member.accountId === userProfile?.accountId}
              relationType={member.relationType}
              isMaster={isMaster}
            />

            {(member.relationType === 'NONE' ||
              member.relationType === 'DELETE') && (
              <IconButton name="user-plus" text="친구 추가" />
            )}

            {isMyGroup && member.accountId !== userProfile?.accountId && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton name="dots" text="더보기" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>방장이관</DropdownMenuItem>
                  <DropdownMenuItem>내보내기</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {member.relationType === 'HIDE' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => friendHideCancel.mutate(member.accountId)}
              >
                해제
              </Button>
            )}
            {member.relationType === 'BLOCK' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => friendBlockCancel.mutate(member.accountId)}
              >
                해제
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
