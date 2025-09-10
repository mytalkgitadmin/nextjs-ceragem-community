// Notifications 도메인 API endpoints

import { Endpoint } from "@/shared/api/model";

export const NOTIFICATIONS_ENDPOINTS: Record<string, Endpoint> = {
  GET_NOTI: {
    url: `/ums/notifications`,
    method: "GET",
  },
  PATCH_NOTI: {
    url: `/ums/notifications/{notification_id}`,
    method: "PATCH",
  },
  DEL_NOTI: {
    url: `/ums/notifications/{notification_id}`,
    method: "DELETE",
  },
};
