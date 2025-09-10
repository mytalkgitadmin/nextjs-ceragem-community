import { RelationType } from '@/features/chat/model';
import styles from './SingleAvatar.module.scss';
import Icons from '@/shared/ui/Icons';

interface SingleAvatarProps {
  imageUrl: string;
  size?: number;
  isMyProfile?: boolean;
  isUpdatedProfile?: boolean;
  relationType?: RelationType;
}
export default function SingleAvatar({
  imageUrl,
  size = 60,
  isMyProfile = false,
  isUpdatedProfile,
  relationType,
}: SingleAvatarProps) {
  const defaultProfile = "/assets/profile/bemilyDefaultProfile.webp";
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== defaultProfile) {
      target.src = defaultProfile;
    }
  };

  return (
    <div className={styles.avatarWrap}>
      <div className={styles.circle} style={{ width: size, height: size }}>
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="" 
            width={size} 
            height={size}
            onError={handleImageError}
          />
        )}
        {!imageUrl && (
          <img 
            src={defaultProfile} 
            alt="" 
            width={size} 
            height={size}
          />
        )}
        {relationType &&
          (relationType === 'NONE' || relationType === 'DELETE') && (
            <span className={styles.add}>
              <Icons name="question-mark" />
            </span>
          )}
      </div>

      {isMyProfile && <div className={styles.me}>나</div>}

      {!isMyProfile && isUpdatedProfile && (
        <span className={styles.new}>new</span>
      )}
    </div>
  );
}
