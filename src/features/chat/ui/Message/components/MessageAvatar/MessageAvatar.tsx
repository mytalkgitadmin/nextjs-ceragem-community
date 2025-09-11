import { Profile } from "@/entities/profile";
import { useSendbirdProfile } from "@/features/profile/api";

import { ProfileViewer } from "@/widgets/Profile";
import { SingleAvatar } from "@/widgets/Profile/ui/ProfileAvatar";
import { memo, useState } from "react";
const defaultSmallProfile = "/assets/profile/bemilyDefaultProfile.webp";
import { getThumbnailUrl } from "@/shared/lib/media";
const MessageAvatar = memo(({ sendbirdId }: { sendbirdId: string }) => {
  const { data } = useSendbirdProfile(sendbirdId);
  const [isOpen, setIsOpen] = useState(false);

  if (!sendbirdId || !data)
    return (
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <SingleAvatar imageUrl={defaultSmallProfile} size={40} />
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
MessageAvatar.displayName = "MessageAvatar";
export default MessageAvatar;
