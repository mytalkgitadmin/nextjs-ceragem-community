# Ceragem Community Test

내부 문서

- 프로젝트 구조: [docs/Project_Structure.md](./docs/Project_Structure.md)
- 컨벤션: [docs/Conventions.md](./docs/Conventions.md)
- API: [docs/API.md](./docs/API.md)
- 스크립트: [scripts/README.md](./scripts/README.md)

## Getting Started

개발 서버 실행:

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 을 엽니다.

## Scripts

- FSD Slice 생성기:

```bash
npm run gen:fsd -- <layer> [slice] [--segments ui,model,lib,api,config] [--pages-alias views]
```

자세한 내용은 [scripts/README.md](./scripts/README.md) 참고.
