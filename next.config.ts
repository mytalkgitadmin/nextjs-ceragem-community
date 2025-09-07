import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */

  // 대상: Sass 컴파일러 (빌드 단계에서 SCSS → CSS 변환)
  // 역할: SCSS 내부의 @use / @import 경로를 찾을 때 어디서부터 탐색할지 알려줌.
  // 예: @use "styles/var.scss" → <root>/src/styles/var.scss 로 해석 가능
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src")],
  },

  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      // 대상: Webpack (번들러) → JS/TS 모듈 로딩 담당
      // TS는 tsconfig.json의 paths로 이미 인식 중
      // 런타임/빌드에서 @ → <root>/src로 변환시킴
      // Next.js + Sass는 Webpack 해석 경로를 Sass 로더에 넘겨줌 @/styles/var.scss 같은 경로를 SCSS에서도 쓸수 있게됨
      // 예: @use "@/styles/var.scss" → <root>/src/styles/var.scss 로 해석 가능

      ...(config.resolve.alias || {}),
      "@": path.join(process.cwd(), "src"),
    };
    
    return config;
  },
};

export default nextConfig;
