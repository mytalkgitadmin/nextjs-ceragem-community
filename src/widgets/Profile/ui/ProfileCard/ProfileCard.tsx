import { Profile, RelationType } from '@/features/chat/model';

import { SingleAvatar } from '../ProfileAvatar';
import styles from './ProfileCard.module.scss';
import { isUpdatedProfile } from '@/shared/lib/dateFormatter';
import Icons from '@/shared/ui/Icons';

// 친구
export interface ItemProps {
  profile: Profile;

  editedName?: string;
  syncName?: string;
  type?: 'friend' | 'talk';
  onClick?: () => void;
  profileImageUrl: string;
  horizon?: boolean;
  isMyProfile?: boolean;
  isMaster?: boolean;
  relationType?: RelationType;
}

export default function ProfileCard({
  profile,
  editedName,
  syncName,

  type = 'friend',
  isMyProfile = false,
  horizon,
  onClick,
  profileImageUrl,

  isMaster,
  relationType,
}: ItemProps) {
  return (
    <>
      <button
        type="button"
        className={`${styles.profileCard} ${horizon ? styles.horizon : ''}`}
        onClick={onClick}
      >
        <SingleAvatar
          imageUrl={profileImageUrl}
          size={type === 'friend' ? 60 : 40}
          isMyProfile={isMyProfile}
          isUpdatedProfile={
            profile.lastModifiedDate
              ? isUpdatedProfile(profile.lastModifiedDate)
              : false
          }
          relationType={relationType}
        />
        <div>
          <p className={`${styles.nickName} ${styles[type]}`}>
            {isMaster && (
              <span className={styles.master}>
                <Icons name="crown" />
                <span className="sr-only">방장</span>
              </span>
            )}{' '}
            {editedName || syncName || profile.profileName}
          </p>

          {/* 대화방(talk)에서는 상태메시지 숨김처리 */}
          {!horizon && type === 'friend' && (
            <p className={styles.message}>{profile.profileMessage}</p>
          )}
        </div>
      </button>
    </>
  );
}
