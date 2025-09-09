import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ONE_YEAR_S = 60 * 60 * 24 * 365; // 1 year

export async function middleware(req: NextRequest) {
  const token = req.headers.get("x-auth-token") || "test";
  const { pathname } = req.nextUrl;
  const method = req.method;
  const accept = req.headers.get("accept") || "";
  const isHtml = accept.includes("text/html");
  const tokenCookie = req.cookies.get("token_hdr")?.value || "";
  const hasRefresh = Boolean(req.cookies.get("familytown_rt")?.value);
  const hasAccessToken = Boolean(req.cookies.get("familytown_at")?.value);

  console.log("[MW] pathname:", pathname);

  // HTML 문서가 아닌 요청(fetch JSON 등)은 통과 (오버헤드 최소화)
  if (method !== "GET" || !isHtml) return NextResponse.next();

  // 토큰이 없으면 로그인 요구 페이지로 보냄
  if (!token && !tokenCookie) {
    return NextResponse.rewrite(new URL("/login-required", req.url));
  }

  // 토큰이 있지만 기존 쿠키와 다르거나 JWT 토큰이 없으면 JWT 재발급 요청
  const notSameToken = token && token !== tokenCookie;
  if (notSameToken || !hasRefresh || !hasAccessToken) {
    const url = new URL("/signing-in", req.url);
    url.searchParams.set("to", req.nextUrl.toString());
    const res = NextResponse.rewrite(url);
    if (notSameToken) {
      // 토큰이 다르면 기존 쿠키 업데이트
      res.cookies.set("token_hdr", token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: ONE_YEAR_S,
        // secure: process.env.NODE_ENV === "production", //TODO: 추후 확인
      });
    }
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|assets|fonts|animations|favicon.ico|robots.txt|sitemap.xml|login-required|signing-in|invalid-state|not-found).*)",
  ],
};
