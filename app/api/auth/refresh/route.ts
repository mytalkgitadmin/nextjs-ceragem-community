import { NextRequest, NextResponse } from "next/server";
import { computeMaxAgeSeconds } from "@/domains/auth/utils/jwt";

const SEVEN_DAYS_S = 60 * 60 * 24 * 7;
const NINETY_DAYS_S = 60 * 60 * 24 * 90;

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  sessionToken?: string;
}

async function refreshTokens(
  refreshToken: string
): Promise<{ data: RefreshResponse } | { error: string; status: number }> {
  const base = process.env.FAMILYTOWN_API_BASE_URL;
  if (!base) {
    return { error: "FAMILYTOWN_API_BASE_URL is not set", status: 500 };
  }

  try {
    const response = await fetch(`${base}/auth/token/regenerate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept-Language": "ko-KR,ko;",
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    if (!response.ok) {
      return {
        error: "Token refresh failed",
        status: response.status,
      };
    }

    const json = await response.json();

    return {
      data: {
        accessToken: json.accessToken || json.resultData?.accessToken,
        refreshToken: json.refreshToken || json.resultData?.refreshToken,
        sessionToken: json.sessionToken || json.resultData?.sessionToken,
      },
    };
  } catch (error) {
    console.error("Token refresh error:", error);
    return { error: "Token refresh failed", status: 500 };
  }
}

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("familytown_rt")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { ok: false, error: "no_refresh_token" },
      { status: 401 }
    );
  }

  const result = await refreshTokens(refreshToken);

  if ("error" in result) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: result.status }
    );
  }

  const {
    accessToken: accessTokenRaw,
    refreshToken: refreshTokenRaw,
    sessionToken,
  } = result.data;

  // Bearer 접두사 제거
  let accessToken = accessTokenRaw?.replace("Bearer ", "") || "";
  let newRefreshToken = refreshTokenRaw?.replace("Bearer ", "") || refreshToken;

  const accessMaxAge = computeMaxAgeSeconds({
    jwt: accessToken,
    fallbackSeconds: SEVEN_DAYS_S,
  });

  const refreshMaxAge = computeMaxAgeSeconds({
    jwt: newRefreshToken,
    fallbackSeconds: NINETY_DAYS_S,
  });

  const response = NextResponse.json({
    ok: true,
    data: { sessionToken },
  });

  // 새로운 토큰을 쿠키에 저장
  response.cookies.set("familytown_at", accessToken, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: accessMaxAge,
    // secure: process.env.NODE_ENV === "production",
  });

  response.cookies.set("familytown_rt", newRefreshToken, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: refreshMaxAge,
    // secure: process.env.NODE_ENV === "production",
  });

  return response;
}
