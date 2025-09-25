import { Button } from "@/shared-ui";

interface ProfileViewerCoachActionsProps {
  onConnect?: () => void;
}

export const ProfileViewerCoachActions: React.FC<
  ProfileViewerCoachActionsProps
> = ({ onConnect }) => {
  return (
    <div className="flex justify-center space-x-12 py-6 bg-gray-50">
      <Button onClick={onConnect}>연결하기</Button>
    </div>
  );
};
