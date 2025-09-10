import { useEffect, useState } from "react";
import { Notification } from "@/features/notifications/model";
import { NotificationCard } from "../NotificationCard";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";

import styles from "./NotificationList.module.scss";
export default function NotificationList({
  notiList,
}: {
  notiList: Notification[];
}) {
  const [isAll, setIsAll] = useState(false);
  const [unReadData, setUnReadData] = useState<Notification[]>([]);

  useEffect(() => {
    if (notiList) {
      const unReadData = notiList.filter((noti) => noti.isRead === false);
      setUnReadData(unReadData);
    }
  }, [notiList]);

  return (
    <div className={styles.list}>
      <div className="w-full flex items-center justify-between ">
        <p>알림({isAll ? notiList.length : unReadData.length})</p>

        <div className="flex items-center gap-1">
          <Checkbox
            id="terms"
            checked={!isAll}
            onCheckedChange={() => setIsAll((prev) => !prev)}
          />
          <Label htmlFor="terms">읽지 않은 메시지만 보기</Label>
        </div>
      </div>

      {isAll ? (
        <div className="w-full">
          {!notiList || notiList.length === 0 ? (
            <>알림이 없습니다</>
          ) : (
            <ul className="flex flex-col gap-3">
              {notiList.map((noti) => (
                <NotificationCard key={noti.id} noti={noti} />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="w-full">
          {!unReadData || unReadData.length === 0 ? (
            <>알림이 없습니다</>
          ) : (
            <ul className="flex flex-col gap-3">
              {unReadData.map((noti) => (
                <NotificationCard key={noti.id} noti={noti} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
