import Icons from '@/shared/ui/Icons';
import { useAuth } from '@/features/auth';
import { Button } from '@/shared/ui/button';
import { ProfileItem } from '@/widgets/Profile/ui/ProfileItem';

import FriendsList from '../friends/FriendsList';
import styles from './SettingPage.module.scss';
import { useCategorizedFriends } from '@/features/friend/hooks/useCategorizedFriends';
import { Switch } from '@/shared/ui/switch';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Separator } from '@/shared/ui/separator';

export default function SettingPage() {
  const { userProfile, handleLogout } = useAuth();
  const { hideFriends, blockFriends } = useCategorizedFriends();
  return (
    <div className={`pageContainer ${styles.setting}`}>
      <header className="header">
        <h2>설정</h2>
      </header>

      <h2>
        <Icons name="user" />
        계정 설정
      </h2>
      <div className={styles.flex}>
        {userProfile && (
          <ProfileItem
            profile={userProfile.profile}
            accountId={userProfile?.accountId}
            editedName={userProfile.editedName}
            syncName={userProfile.syncName}
          />
        )}

        <Button size="sm" variant="outline">
          프로필 편집
        </Button>
      </div>

      {userProfile && (
        <div className="flex flex-col gap-4">
          <Label htmlFor="email">이메일</Label>
          <div className={styles.flex}>
            <Input type="email" value={userProfile.email} id="email" disabled />
            {userProfile.isEmailCertification ? (
              <Icons name="circle-check-filled" color="var(--success)" />
            ) : (
              <Icons name="exclamation-circle-filled" color="var(--error)" />
            )}

            <Button variant="outline">이메일 변경</Button>
          </div>

          <Label htmlFor="phone">휴대폰 번호</Label>
          <div className={styles.flex}>
            <Input value={userProfile.phoneNumber} id="phone" />
            <Button variant="outline">휴대폰 번호 변경</Button>
          </div>

          <div className={styles.flex}>
            <Button variant="outline">비밀번호 재설정</Button>

            <Button variant="outline" onClick={handleLogout}>
              로그아웃
            </Button>

            <Button variant="outline">탈퇴하기</Button>
          </div>

          <Label>친구 연결모드</Label>
          <div className={styles.flex}>
            <Switch
              id="airplane-mode"
              checked={
                userProfile.friendRelationMode === 'PRIVATE' ? true : false
              }
              disabled
            />
            <Label htmlFor="airplane-mode">
              {userProfile.friendRelationMode === 'PRIVATE'
                ? '프라이빗 모드'
                : ''}
            </Label>
          </div>
        </div>
      )}
      {/* 이름 */}

      <Separator className="my-4" />
      <h2>
        <Icons name="users" />
        친구 설정
      </h2>

      {hideFriends && <FriendsList title="숨김 친구" friends={hideFriends} />}
      {blockFriends && <FriendsList title="차단 친구" friends={blockFriends} />}

      <Separator className="my-4" />

      <h2>
        <Icons name="message" />
        대화 설정
      </h2>
      <Separator className="my-4" />
      <h2>
        <Icons name="speakerphone" />
        공지 사항
      </h2>
      <Separator className="my-4" />
      <h2>
        <Icons name="headset" />
        고객 센터
      </h2>
      <Separator className="my-4" />
      <h2>
        <Icons name="bell" />
        알림
      </h2>
      <Separator className="my-4" />
      <h2>
        <Icons name="device-ipad-horizontal-cog" />
        화면
      </h2>
    </div>
  );
}
