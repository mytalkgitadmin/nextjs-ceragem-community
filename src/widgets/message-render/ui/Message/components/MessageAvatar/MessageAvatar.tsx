import { Profile, useSendbirdProfile, SingleAvatar } from "@/entities/profile";
import { ProfileViewer } from "@/features/profile-update/ui/ProfileViewer";
import { memo, useState } from "react";
const DEFAULT_SMALL_PROFILE = "/assets/profile/bemilyDefaultProfile.webp";
import { getThumbnailUrl } from "@/entities/attachment/lib/media";
const MessageAvatar = memo(({ sendbirdId }: { sendbirdId: string }) => {
  const { data } = useSendbirdProfile(sendbirdId);
  const [isOpen, setIsOpen] = useState(false);

  if (!sendbirdId || !data)
    return (
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <SingleAvatar imageUrl={DEFAULT_SMALL_PROFILE} size={40} />
      </button>
    );

  const imageUrl = getThumbnailUrl(data?.profile as Profile);
  return (
    <>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <SingleAvatar imageUrl={imageUrl} size={40} />
      </button>

      {data?.accountId && (
        <ProfileViewer
          open={isOpen}
          accountId={data?.accountId}
          profileImageUrl={imageUrl}
          onOpenChange={() => setIsOpen(false)}
        />
      )}
    </>
  );
});
export default MessageAvatar;
