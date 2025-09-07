# API

## 베이스 및 프록시

- FamilyTown API 요청은 BFF 프록시를 통해 전달합니다.
- 프록시 핸들러: `app/api/familytown/[...path]/route.ts`
- 환경 변수: `FAMILYTOWN_API_BASE_URL` 필수
- JSON 응답은 Content-Type을 보존하여 pass-through

## 인증

- 클라이언트는 `Authorization: Bearer <JWT>` 헤더를 포함합니다.
- 토큰 저장 위치: 클라이언트 스토리지(쿠키 아님).

## 클라이언트 Fetcher

- 위치: `src/shared/api/client.ts`
- `axiosInstance` 기본 헤더/타임아웃/파라미터 직렬화
- 요청 유틸: `appApiFTRequest(endpoint, body?, { pathParams, query, headers })`
- 엔드포인트 타입: `src/shared/api/endpoints.ts`

## 엔드포인트 정의

- 위치: `src/shared/api/endpoints.ts`
- 도메인별 Grouping 예시:
  - `ACCOUNT.GET_FRIENDS: { url: "/account/friend", method: "GET" }`

## 에러 처리

- 프록시는 원본 status/headers를 보존
- 클라이언트는 React Query로 재시도/캐시/오류 UI 제어

## 예시

```ts
import { appApiFTRequest, FAMILYTOWN_API_ENDPOINTS } from "@/shared/api";

const res = await appApiFTRequest(
  FAMILYTOWN_API_ENDPOINTS.ACCOUNT.GET_FRIENDS,
  undefined,
  { query: { friendType: ["NORMAL"] } }
);
```
