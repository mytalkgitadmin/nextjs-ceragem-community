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

- `api/`: request functions, data types, mappers 등 백엔드 통신 및 데이터 로직
- `model/`: schema, interfaces, store, business logic 등 애플리케이션 도메인 모델
- `ui/`: UI components, date formatter, styles 등 UI 표현과 직접 관련된 코드
- `lib/`: 해당 Slice에서 여러 모듈이 함께 사용하는 공통 library code
- `config/`: configuration files, feature flags 등 환경·기능 설정
