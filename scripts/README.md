# FSD Slice 생성 스크립트 사용법 (`fsd-generate.mjs`)

간단한 CLI로 FSD 레이어/슬라이스의 기본 디렉터리와 `index.ts`(재노출) 파일을 생성합니다.

## 실행

```bash
npm run gen:fsd -- <layer> [slice] [--segments ui,model,lib,api,config] [--pages-alias views]
```

- **layer**: `app | widgets | features | entities | shared | pages | views`
- **slice**: `widgets|features|entities|pages|views`에서 필수 (`app|shared`는 불필요)
- **--segments**: 쉼표 구분. 기본값 `ui,model,lib`
- **--pages-alias**: FSD pages 레이어 이름 변경(기본 `pages`, 예: `views`)

## 예시

- features 슬라이스 생성

```bash
npm run gen:fsd -- features friend-list
```

생성 결과(기본 세그먼트):

```
src/features/friend-list/
  ui/
    index.ts
  model/
    index.ts
  lib/
    index.ts
  index.ts            # 생성된 세그먼트만 re-export
```

- entities + 세그먼트 확장

```bash
npm run gen:fsd -- entities friend --segments ui,model,lib,api
```

- pages 레이어를 `views`로 사용

```bash
npm run gen:fsd -- views profile
```

## 동작 규칙

- 존재하지 않으면 `src/<layer>`와 필요한 하위 폴더를 생성합니다.
- 각 세그먼트 폴더에 `index.ts`(재노출 전용)를 생성합니다.
- 슬라이스 루트에 `index.ts`를 만들고, 선택한 세그먼트만 `export * as <seg> from './<seg>'`로 노출합니다.
- 이미 존재하는 파일은 덮어쓰지 않습니다.

## 권장 사용 가이드

- 파일/폴더 네이밍은 `kebab-case`, 컴포넌트 파일은 `PascalCase.tsx`를 권장합니다.
- 세그먼트는 필요할 때만 추가하세요(`api`, `config`는 선택).
- 생성 후 불필요한 세그먼트는 제거하거나, 실제 구현 파일로 대체하세요.

## 트러블슈팅

- 인자가 없으면 사용법이 출력되고 종료됩니다.
- 잘못된 레이어 값이면 허용 가능한 레이어 목록을 출력하고 종료됩니다.
- `widgets|features|entities|pages|views`는 슬라이스 이름이 필수입니다.
