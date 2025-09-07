import { defineConfig } from "steiger";
import fsd from "@feature-sliced/steiger-plugin";

// NOTE: 절대 경로 ignore(예: "/Users/**")는 파일 시스템 전체를 스캔하게 만들어
// macOS의 보호 폴더(.Trash 등)에서 EPERM를 유발할 수 있습니다. 프로젝트 상대 경로만 사용하세요.
export default defineConfig([
  ...fsd.configs.recommended,
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/.git/**",
      "**/.DS_Store",
    ],
  },
  {
    files: ["./src/shared/**"],
    rules: {
      "fsd/public-api": "off",
    },
  },
  {
    // mock/테스트 파일 전역 무시 예시
    ignores: ["**/__mocks__/**", "**/*.spec.*", "**/*.test.*"],
  },
]);
