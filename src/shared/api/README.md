# API 클라이언트 가이드

## 개요

이 디렉토리는 프로젝트의 API 클라이언트를 관리합니다. 두 가지 주요 방식을 제공합니다:

1. **BFF 클라이언트** (권장) - Next.js API Routes를 통한 안전한 API 호출
2. **Direct 클라이언트** (특수 용도) - 브라우저에서 FamilyTown API 직접 호출

## 파일 구조

```
src/shared/api/
├── index.ts           # 통합 API 인터페이스 (FETA 호환성 포함)
├── bff-client.ts      # BFF를 통한 API 호출 (권장)
├── direct-client.ts   # FamilyTown API 직접 호출 (특수 용도)
└── README.md         # 이 문서
```

## BFF 클라이언트 (권장)

### 특징

- ✅ 안전한 인증 토큰 관리 (httpOnly 쿠키)
- ✅ CORS 이슈 없음
- ✅ 서버 사이드 프록시를 통한 보안 강화
- ✅ `/api/familytown/*` 경로로 자동 라우팅

### 사용 예시

```typescript
import { bffGet, bffPost, bffRequest } from "@/shared/api";

// GET 요청
const users = await bffGet<User[]>("/users");

// POST 요청
const newUser = await bffPost<User>("/users", {
  name: "John Doe",
  email: "john@example.com",
});

// Path parameters 사용
const user = await bffGet<User>("/users/{id}", {
  pathParams: { id: 123 },
});

// Query parameters 사용
const searchResults = await bffGet<User[]>("/users", {
  query: { role: "admin", active: true },
});

// 복잡한 요청
const result = await bffRequest<Response>(
  { url: "/api/complex", method: "POST" },
  requestBody,
  {
    pathParams: { id: 1 },
    query: { filter: "active" },
    headers: { "X-Custom-Header": "value" },
  }
);
```

## Direct 클라이언트 (특수 용도)

### ⚠️ 주의사항

- ❌ 토큰이 브라우저에 노출됨 (보안 위험)
- ❌ CORS 설정 필요
- ❌ XSS 공격에 취약할 수 있음
- ⚠️ 개발/테스트 환경에서만 권장

### 사용 예시

```typescript
import { directGet, directPost, setDirectAuthToken } from "@/shared/api";

// 토큰 설정 (필수)
setDirectAuthToken("your-bearer-token");

// GET 요청
const users = await directGet<User[]>("/users");

// POST 요청
const newUser = await directPost<User>("/users", {
  name: "Jane Doe",
  email: "jane@example.com",
});
```

### 환경 설정

Direct 클라이언트를 사용하려면 `.env.local`에 다음 설정이 필요합니다:

```bash
NEXT_PUBLIC_FAMILYTOWN_API_BASE_URL=https://api.familytown.com
```

## FETA 호환성 레이어

기존 FETA 프로젝트에서 마이그레이션된 코드를 위한 호환성 함수들:

```typescript
import { get, post, put, patch, remove } from "@/shared/api";

// FETA 스타일 호출 (deprecated)
const data = await get({
  url: "/users",
  params: { active: true },
});

// 새로운 스타일 권장
const data = await bffGet("/users", {
  query: { active: true },
});
```

## 언제 어떤 클라이언트를 사용할까?

### BFF 클라이언트를 사용하는 경우 (대부분의 경우)

- 프로덕션 환경
- 인증이 필요한 API 호출
- 일반적인 CRUD 작업
- 보안이 중요한 작업

### Direct 클라이언트를 사용하는 경우 (특수한 경우)

- 개발/테스트 환경에서 빠른 테스트
- BFF를 거치지 않고 직접 API 성능 테스트
- 특별한 요구사항이 있는 경우

## 마이그레이션 가이드

### 기존 코드 (client.ts 사용)

```typescript
import { appApiFTRequest } from "@/shared/api/client";

const data = await appApiFTRequest(
  { url: "/users", method: "GET" },
  undefined,
  { query: { active: true } }
);
```

### 새로운 코드 (bff-client 사용)

```typescript
import { bffGet } from "@/shared/api";

const data = await bffGet("/users", {
  query: { active: true },
});
```

## 타입 정의

모든 API 호출은 제네릭 타입을 지원합니다:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// 타입 안전한 API 호출
const users = await bffGet<User[]>("/users");
const user = await bffPost<User>("/users", userData);
```

## 에러 처리

```typescript
try {
  const data = await bffGet("/users");
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("API 에러:", error.response?.data);
    // 에러 처리 로직
  }
}
```

## 파일 업로드

```typescript
import { createFileUploadInstance } from "@/shared/api";

const uploadInstance = createFileUploadInstance();
const formData = new FormData();
formData.append("file", file);

const response = await uploadInstance.post("/upload", formData);
```
