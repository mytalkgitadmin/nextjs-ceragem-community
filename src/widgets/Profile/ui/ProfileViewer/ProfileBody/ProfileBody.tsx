import Icons from '@/shared/ui/Icons';
import styles from './ProfileBody.module.scss';
import { memo } from 'react';
import { DATE_FORMATS, formatDate } from '@/shared/lib/dateFormatter';
import { ProcessedHistory } from '../../../types/viewer.types';
import { ProfileGallery } from '../ProfileGallery';

interface ProfileBodyProps {
  profileImageUrl: string;
  profileMessage: string;
  profileName: string;
  introduction: string;
  interests: string;
  birthday: string | undefined;
  isMyProfile: boolean;
  onImageClick: (index: number) => void;
  histories: ProcessedHistory[];
}

const ProfileBody = memo<ProfileBodyProps>(
  ({
    profileImageUrl,
    profileMessage,
    profileName,
    introduction,
    interests,
    birthday,
    isMyProfile,
    onImageClick,
    histories,
  }) => {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.profileContainer}>
            <img
              src={profileImageUrl}
              alt={`${profileName}의 프로필 이미지`}
              onClick={() => onImageClick(0)}
            />

            {profileMessage && <p className={styles.state}>{profileMessage}</p>}
          </div>

          <div className={styles.info}>
            <h2 className={styles.nickname}>
              {profileName}{' '}
              {!isMyProfile && (
                <button type="button" aria-label="프로필 수정">
                  <Icons name="edit" />
                  <span className="sr-only">수정</span>
                </button>
              )}
            </h2>

            {/* 자기소개 */}
            {introduction && (
              <p className={styles.introduction}>{introduction}</p>
            )}

            {/* 관심사 */}
            {interests && (
              <p>
                <Icons name="heart" /> {interests}
              </p>
            )}

            {/* 생일 */}
            {birthday && (
              <p>
                <Icons name="cake" />
                {formatDate(birthday, DATE_FORMATS.YEAR_MONTH_DAY)}
              </p>
            )}
          </div>
        </div>

        <ProfileGallery onImageClick={onImageClick} histories={histories} />
      </>
    );
  },
);
ProfileBody.displayName = 'ProfileBody';
export default ProfileBody;
