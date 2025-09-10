// Core shared API endpoints (도메인 독립적)

import { Endpoint } from "./model";

export const CORE_ENDPOINTS: Record<string, Endpoint> = {
  // 파일 업로드 (여러 도메인에서 공통 사용)
  POST_FILE: {
    url: `/file/upload`,
    method: "POST",
  },
  GET_ACCEPT_LIST: {
    url: `/file/public/accept/{subCategory}`,
    method: "GET",
  },
};
