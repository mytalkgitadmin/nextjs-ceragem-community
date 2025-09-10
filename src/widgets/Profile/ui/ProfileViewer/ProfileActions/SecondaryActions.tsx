import { Button } from "@/shared/ui/button";
import { RelationType } from "@/entities/friend";
import Icons from "@/shared/ui/Icons";
import { memo } from "react";
interface SecondaryActionsProps {
  relationType?: RelationType;
  onFavoriteToggle: () => void;
}
const SecondaryActions = memo<SecondaryActionsProps>(
  ({ relationType, onFavoriteToggle }) => {
    if (!relationType) return;

    return (
      <Button size="icon" variant="ghost" onClick={onFavoriteToggle}>
        <FavoriteBtn relationType={relationType} />
      </Button>
    );
  }
);
SecondaryActions.displayName = "SecondaryActions";
export default SecondaryActions;

const FavoriteBtn = ({ relationType }: { relationType: RelationType }) => {
  // 즐겨찾기 버튼
  if (relationType === "FAVORITE") {
    return (
      <>
        <Icons name="star-filled" color="var(--warning)" />
        <span className="sr-only">즐겨찾기 해제</span>
      </>
    );
  } else {
    if (relationType === "NORMAL") {
      return (
        <>
          <Icons name="star" />
          <span className="sr-only">즐겨찾기</span>
        </>
      );
    }
  }
};
