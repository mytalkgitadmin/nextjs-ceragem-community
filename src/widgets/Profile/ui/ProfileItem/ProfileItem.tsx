import { getThumbnailUrl } from '@/features/viewer/utils/mediaUtils';
import { ProfileCard } from '../ProfileCard';
import { ProfileViewer } from '../ProfileViewer';
import { Profile, RelationType } from '@/features/chat/model';
import { useUIStore } from '@/shared/store/useUIStore';

export default function ProfileItem({
  profile,
  accountId,
  editedName,
  syncName,
  isMyProfile,
  type,
  isMaster,
  relationType,
}: {
  profile: Profile;
  accountId: number;
  editedName: string;
  syncName: string;
  isMyProfile?: boolean;
  type?: 'friend' | 'talk';
  isMaster?: boolean;
  relationType?: RelationType;
}) {
  const { profileModal, openProfileModal, closeProfileModal } = useUIStore();
  const profileImageUrl = getThumbnailUrl(profile);

  const openViewer = () => {
    openProfileModal(accountId);
  };

  const closeViewer = () => {
    closeProfileModal();
  };
  return (
    <>
      <ProfileCard
        profile={profile}
        profileImageUrl={profileImageUrl}
        editedName={editedName}
        syncName={syncName}
        onClick={openViewer}
        isMyProfile={isMyProfile}
        type={type}
        isMaster={isMaster}
        relationType={relationType}
      />
      <ProfileViewer
        open={profileModal.isOpen && profileModal.accountId === accountId}
        accountId={accountId}
        profileImageUrl={profileImageUrl}
        onOpenChange={closeViewer}
      />
    </>
  );
}
