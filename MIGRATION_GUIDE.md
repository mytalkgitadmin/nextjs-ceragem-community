# FSD 레이어 재구조화 마이그레이션 가이드

## 🔄 변경사항 요약

### 1. shared 레이어 개선

- **의존성 규칙 위반 해결**: `shared/api/axios.ts`에서 `features/auth` 의존성 제거
- **토큰 관리 개선**: Dependency Injection 패턴으로 TokenManager 구현
- **도메인별 enum 분리**: 파일 관련 enum을 해당 entities로 이동

### 2. entities 레이어 개선

- **도메인별 파일 타입 분리**: Chat, Profile 관련 파일 enum을 각 entity로 이동
- **타입 중복 해결**: Profile 관련 타입들의 중복 제거
- **API vs 도메인 모델 분리**: 더 명확한 책임 분리

### 3. features 레이어 개선

- **교차 의존성 해결**: features 간 직접 의존성 제거
- **비즈니스 로직 분리**: 내비게이션, 설정 관련 enum을 features로 이동
- **하위 호환성 유지**: 단계적 마이그레이션을 위한 re-export 구조

## 📂 새로운 파일 구조

### shared 레이어

```
shared/
├── model/
│   ├── core-file-types.ts      # 도메인 독립적 파일 타입
│   ├── file-validation-types.ts # 공통 파일 검증 타입
│   ├── file-types.ts           # DEPRECATED (하위 호환성)
│   └── ui-types.ts             # DEPRECATED (하위 호환성)
└── api/
    └── axios.ts                # 의존성 역전으로 개선
```

### entities 레이어

```
entities/
├── chat/
│   └── model/
│       └── file-enums.ts       # Chat 도메인 파일 타입
├── profile/
│   └── model/
│       └── file-enums.ts       # Profile 도메인 파일 타입
└── ...
```

### features 레이어

```
features/
├── navigation/
│   └── model/
│       └── enums.ts            # 내비게이션 비즈니스 로직
├── settings/
│   └── model/
│       └── enums.ts            # 설정 비즈니스 로직
└── ...
```

## 🚀 마이그레이션 방법

### 1. 새로운 import 경로 사용

```typescript
// ❌ 기존 (DEPRECATED)
import { MenuItem } from "@/shared/model";
import { ChatFileCategory } from "@/shared/model";

// ✅ 새로운 방법
import { MenuItem } from "@/features/navigation";
import { ChatFileCategory } from "@/entities/chat";
```

### 2. 토큰 관리 초기화 확인

TokenManager는 `features/auth/authStore.ts`에서 자동으로 주입됩니다. 별도 설정이 필요하지 않습니다.

### 3. 단계적 마이그레이션

모든 기존 import는 하위 호환성을 위해 계속 작동합니다. 시간이 날 때 새로운 경로로 점진적 변경을 권장합니다.

## ✅ FSD 원칙 준수 확인

- ✅ **의존성 방향**: shared → entities → features → widgets → app
- ✅ **레이어별 책임 분리**: 각 레이어가 명확한 역할 수행
- ✅ **도메인별 분리**: 비즈니스 로직이 적절한 feature/entity에 위치
- ✅ **Public API**: 슬라이스 루트의 index.ts를 통한 접근
- ✅ **순환 참조 방지**: 레이어 간 순환 의존성 제거

## 🔧 주의사항

1. **DEPRECATED 파일들**: 단계적으로 제거될 예정이니 새로운 경로 사용 권장
2. **하위 호환성**: 기존 코드는 계속 작동하지만, 새 개발 시 새로운 구조 사용
3. **Linter 설정**: Steiger와 ESLint 설정이 FSD 규칙을 자동 검증

이제 더욱 견고하고 확장 가능한 FSD 구조를 갖게 되었습니다! 🎉
