import { FriendsView } from "@/views/friends";
import { ProtectedLayout } from "@/widgets/layouts/ProtectedLayout";

export default function HomePage() {
  return (
    <ProtectedLayout>
      <FriendsView />
    </ProtectedLayout>
  );
}
