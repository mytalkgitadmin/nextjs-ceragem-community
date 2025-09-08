# Conventions

## Naming

- 파일/폴더: `kebab-case` (예: `friend-list`, `create-channel.ts`)
- 컴포넌트 폴더: PascalCase 폴더 + `index.tsx`, `index.module.scss`
- 컴포넌트 네이밍: `PascalCase`
- 훅 파일: `useXxxx.ts` (camelCase, 예: `useProfileQuery.ts`)
- 훅 네이밍: `useXxx`
- 타입/인터페이스: `PascalCase`
- 상수: `UPPER_SNAKE_CASE`

## Directory

- `src/`는 FSD 전용 디렉토리

## UI

#### Component

- 컴포넌트 폴더 기본: `index.tsx`, `index.module.scss`
- 하위 폴더 생성 기준
  - 서브컴포넌트가 2개 이상이거나 훅/유틸이 복수로 분리돼야 할 때만 추가
  - 폴더 깊이는 1단계만 허용(중첩 폴더 금지)
- 허용 하위 폴더(선택)

  - `components/`: 서브컴포넌트 모음. 내부 폴더 생성 금지 (내부 파일 예: `Header.tsx`, `Header.module.scss`)
  - `hooks/`: 이 컴포넌트 전용 훅.
  - `utils/`: 이 컴포넌트 전용 순수 유틸 함수
  - `types/`: 이 컴포넌트 전용 타입 정의
  - `assets/`: 이 컴포넌트 전용 정적 리소스(svg, lottie 등). 필요 시만 사용

- Export / Import 규칙

  - 하위 폴더는 외부 export 금지
  - 외부 공개는 FSD 규칙에 맞춰 허용
  - 컴포넌트 폴더 내부 임포트는 상대 경로만 사용(`./`, `../`)

- 금지/지양 사항
  - `styles/` 하위 폴더 생성 금지

#### Primitives

- 폴더 위치: `src/shared/ui/_primitives/`
- 하위 파일 네이밍은 `kebab-case`
- 외부에서 `_primitives/*` 경로 직접 import 금지
- 사용 위치: `/src/shared/ui/**` 내부 컴포넌트에서만 `_primitives/*` import 허용
  - 예: `src/shared/ui/button/Button/index.tsx` → `import { Button } from "@/shared/ui/_primitives/button";`

#### Styles

- 스타일은 각 컴포넌트 내 인접 배치
- 글로벌 스타일은 `src/app/styles/` 폴더에 배치

## API

[추후 내용 작성]

## Types & Enums

각 슬라이스에서 타입과 enum은 책임에 따라 분리합니다:

#### Types

- `model/entity-types.ts`: 앱 내부 도메인 모델 (예: `FriendEntity`)
- `api/dto-types.ts`: 백엔드 API 원형 데이터 (예: `FriendDTO`)
- `api/contracts-types.ts`: API 요청/응답 계약 (예: `FriendListResponse`)

#### Enums

- `model/entity-enums.ts`: 앱 도메인 용어 (예: `Relation.FRIEND`)
- `api/dto-enums.ts`: 백엔드 정의 값 (예: `FriendRelationDTO.FRIEND`)
- `api/contracts-enums.ts`: API 전용 옵션 (예: `FriendListSort.NAME_ASC`)

#### 파일 구조

```
entities/friend/
├── model/
│   ├── entity-types.ts    # 도메인 모델
│   └── entity-enums.ts     # 도메인 열거형
├── api/
│   ├── dto-types.ts        # API 데이터 타입
│   ├── dto-enums.ts        # API 열거형
│   ├── contracts-types.ts  # API 계약
│   └── contracts-enums.ts  # API 옵션
└── index.ts
```

## Code Style

[추후 내용 작성]

## FSD

#### Imports

- 의존 방향 준수: `shared → entities → features → widgets → src/app → app`
- slice 루트에만 Public API `index.ts`를 두고 외부 접근은 반드시 루트로만 한다 예) `@/features/friend-list`
  - 예외: `shared/`는 번들 최적화를 위해 세그먼트 하위 (집합)폴더(예: `shared/ui/button`, `shared/ui/icon`, `shared/lib/date`)에 `index.ts`를 두고, 해당 경로로 직접 import하는 것을 허용
- 동일 레이어 간 교차 임포트는 지양하고, 공통 로직은 `shared`로 승격하여 참조
- 동일 슬라이스/세그먼트 내부는 상대 경로(`./`, `../`)만 사용하고 `@` alias 금지 (파일 경로로 직접 import 하여 순환 참조를 방지)

예시 (외부에서 사용):

```ts
// 올바름: 루트 Public API만 사용
import { ProfileItem, type Profile } from "@/entities/profile";
```

예시 (슬라이스 내부에서 사용):

```ts
// 올바름: 파일 경로 직접 참조 (루트 index 재참조 금지)
import { ProfileItem } from "./ui/ProfileItem";
import { useProfileStore } from "./model/use-profile-store";
```

- 동일 레이어 cross-import는 지양한다. 불가피하면 Entity 레이어에서만 `@x` 전용 Public API를 사용한다.
  - 예: `entities/artist/@x/song`을 통해 `entities/song`에서 `type Artist`를 가져오기

#### Slice Naming

- app/{segment} : 슬라이스 없이 세그먼트 단일 계층을 사용
  - 세그먼트 네이밍은 기술/역할 기반으로 작성
  - 예: `providers/`, `styles/`, `routes/`, `store/`, `entrypoint/`
- views/{slice} : 화면/라우트 맥락 기반으로 네이밍
  - 예: `chat/`, `login/`, `setting/`
- widgets/{slice} : `도메인-형태`, 역할/위치(Layout·공용 블록) 기반으로 네이밍
  - 예: `profile-card/`, `app-header/`, `side-bar/`
- features/{slice} : 도메인 또는 `도메인-행동`으로 네이밍
  - 예: `friend-list/`, `chat-send-message/`, `auth-login/`
- entities/{slice} : 단수 명사으로 네이밍
  - 예: `profile/`, `friend/`, `notification/`
- shared/{segment} : 슬라이스 없이 세그먼트 단일 계층을 사용
  - 예: `api/`, `model/`, `ui/`, `lib/`, `config/`

#### Segment Naming

- 목적 기반 네이밍만 허용
  - 예: `api/`, `model/`, `ui/`, `lib/`, `config/`
- 내용물/형태/수단 기반 네이밍 금지
  - 예: `types/`, `constants/`, `hooks/`, `store/`, `utils/`

#### Directory

- 레이어 `app/`, `views/`, `widgets/`, `features/`, `entities/`, `shared/` 외의 폴더 생성 금지
- 슬라이스 내부에는 세그먼트 폴더만 존재해야한다.
- 세그먼트 하위 폴더(depth)는 최대 1단계만 허용합니다. (더 깊어질 경우 슬라이스/세그먼트를 재구성 고려)
  - 예외: 세그먼트 하위에 컴포넌트 폴더가 있는 경우, 해당 컴포넌트 폴더 내부에 **Component(UI)** 섹션의 허용 하위 폴더를 1단계까지 생성할 수 있다.
    - 예: `shared/ui/button/IconButton`(집합: button, 컴포넌트: IconButton), `shared/ui/button/IconButton/components`
