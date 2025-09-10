import { NextRequest, NextResponse } from "next/server";
import { computeMaxAgeSeconds } from "@/shared/lib/jwt";
import type { AccountProfile } from "@/features/chat/model";

const SEVEN_DAYS_S = 60 * 60 * 24 * 7;
const NINETY_DAYS_S = 60 * 60 * 24 * 90;

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accountProfile: AccountProfile;
  sendBirdId: string;
  sessionToken: string;
}

async function exchangeTokens(
  token: string
): Promise<{ data: LoginResponse } | { error: string; status: number }> {
  // 테스트 전용 분기. 실제 교환 로직으로 교체 예정
  if (true) {
    const res = await fetch(
      "https://api-dev.fe-ta.com/account/web/login/phone-number",
      {
        method: "POST",
        body: JSON.stringify({
          nationalNumber: "82",
          password: "test1234!",
          phoneNumber: "01025074232",
        }),
        headers: {
          Authorization: "",
          "Content-Type": "application/json;charset=UTF-8",
          "Accept-Language": "ko-KR,ko;",
          "X-DOMAIN-SERVICE": "FETA",
        },
      }
    );

    const json = await res.json();

    return {
      data: json.resultData,
    };
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token_hdr")?.value || "";

  if (!token) {
    return NextResponse.json({ ok: false, error: "no_token" }, { status: 401 });
  }

  const result = await exchangeTokens(token);
  if ("error" in result) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: result.status }
    );
  }

  const { accessToken: accessTokenRaw, refreshToken: refreshTokenRaw } =
    result.data;
  let accessToken = accessTokenRaw;
  let refreshToken = refreshTokenRaw;
  const { accountProfile, sendBirdId, sessionToken } = result.data;
  accessToken = accessToken.replace("Bearer ", ""); // Bearer이 같이 넘어오고 있음
  refreshToken = refreshToken.replace("Bearer ", ""); // Bearer이 같이 넘어오고 있음

  const accessMaxAge = computeMaxAgeSeconds({
    jwt: accessToken,
    fallbackSeconds: SEVEN_DAYS_S,
  });
  const refreshMaxAge = computeMaxAgeSeconds({
    jwt: refreshToken,
    fallbackSeconds: NINETY_DAYS_S,
  });

  const res = NextResponse.json({
    ok: true,
    data: { accountProfile, sendBirdId, sessionToken },
  });
  res.cookies.set("familytown_rt", refreshToken, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: refreshMaxAge,
    // secure: process.env.NODE_ENV === "production",
  });
  res.cookies.set("familytown_at", accessToken, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: accessMaxAge,
    // secure: process.env.NODE_ENV === "production",
  });
  return res;
}
