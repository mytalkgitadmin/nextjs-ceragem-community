import { memo } from "react";
import { Button } from "@/shared/ui/button";
import { Icons } from "@/shared/ui/icon";
import styles from "./ProfileActions.module.scss";
import { RelationType } from "@/entities/channel";

interface PrimaryActionsProps {
  userData: any;
  friendId: number;
  phoneNumber?: string;
  relationType?: RelationType;
  onPhoneCall: (phoneNumber: string) => void;
  onStartChat: () => void;
}

const PrimaryActions = memo<PrimaryActionsProps>(
  ({
    userData,
    friendId,
    phoneNumber,
    relationType,
    onPhoneCall,
    onStartChat,
  }) => {
    return (
      <div className={styles.primaryActions}>
        <Button variant="secondary" onClick={onStartChat}>
          <Icons name="message" /> 채팅하기
        </Button>
        {phoneNumber && (
          <Button variant="default" onClick={() => onPhoneCall(phoneNumber)}>
            <Icons name="phone" /> 전화하기
          </Button>
        )}
      </div>
    );
  }
);

PrimaryActions.displayName = "PrimaryActions";
export default PrimaryActions;
