# FSD

## Layers

- **app/**

  - 앱 엔트리·전역 구성(Provider/스타일/메타)
  - Routing, Entrypoint, Global Styles, Provider 등 앱을 실행하는 모든 요소

- **views/**

  - FSD의 pages 레이어에 해당하며, 라우트 단위 화면을 담당

- **widgets/**

  - 페이지 안에서 독립적으로 동작할 수 있는 대형 UI 블록
  - 독립적으로 동작하는 대형 UI·기능 블록
  - 여러 feature·entity를 조합해 구성되며, 페이지 간 재사용 가능

- **features/**

  - 유스케이스·기능 단위
  - 제품 전반에서 재사용되는 비즈니스 기능

- **entities/**

  - 도메인 엔티티의 기본 모델·뷰
  - user, product 같은 핵심 도메인 Entity

- **shared/**
  - 전 레이어 공통 모듈
  - 프로젝트 전반에서 재사용되는 일반 유틸리티
  - 도메인이나 비즈니스 로직은 포함하지 않는다

## Segments

- `api/`: Backend 통신: Request Function, Data Type, Mapper 등
- `model/`: Data Model: Schema, Interface, Store, Business Logic
- `ui/`: UI 관련: Component, Date Formatter, Style 등
- `lib/`: Slice 내부 Library 코드
- `config/`: Configuration과 Feature Flag
