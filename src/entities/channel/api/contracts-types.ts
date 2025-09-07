// 채널 API 계약 타입
import type { ApiResponse } from "@/shared/api";
import type { ChannelDTO } from "./dto-types";

// 채널 목록 조회 응답
export type ChannelListResponse = ApiResponse<ChannelDTO[]>;

// 파일 검색 응답 (채널 미디어/파일 검색)
export interface FileSearchResponse {
  resultData: {
    content: unknown[]; // 구체 타입은 필요 시 확장
    totalElements: number;
    totalPages: number;
  };
}
