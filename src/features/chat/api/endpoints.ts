// Chat 도메인 API endpoints

import { Endpoint } from "@/shared/api/model";

export const CHAT_ENDPOINTS: Record<string, Endpoint> = {
  // 참가한 전체 대화방 목록 조회
  GET_LIST: {
    url: `/channel/list`,
    method: "GET",
  },
  POST_FILE_INFO: {
    url: `/file/info/searchGroup`,
    method: "POST",
  },
  POST_CREATE_CHANNEL: {
    url: `/channel/`,
    method: "POST",
  },
};
