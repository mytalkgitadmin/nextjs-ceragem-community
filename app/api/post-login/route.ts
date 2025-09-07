import { NextRequest, NextResponse } from "next/server";
import { computeMaxAgeSeconds } from "@/shared/lib/jwt";

const SEVEN_DAYS_S = 60 * 60 * 24 * 7;
const NINETY_DAYS_S = 60 * 60 * 24 * 90;

async function exchangeTokens(token: string): Promise<
  | {
      data: {
        accessToken: string;
        refreshToken: string;
        accountProfile: Record<string, unknown>;
      };
    }
  | { error: string; status: number }
> {
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
    let accessToken = json.resultData.accessToken as string;
    accessToken = accessToken.replace("Bearer ", "");
    let refreshToken = json.resultData.refreshToken as string;
    refreshToken = refreshToken.replace("Bearer ", "");
    const accountProfile = json.resultData.accountProfile as Record<
      string,
      unknown
    >;

    return {
      data: { accessToken, refreshToken, accountProfile },
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

  const { accessToken, refreshToken, accountProfile } = result.data;

  const accessMaxAge = computeMaxAgeSeconds({
    jwt: accessToken,
    fallbackSeconds: SEVEN_DAYS_S,
  });
  const refreshMaxAge = computeMaxAgeSeconds({
    jwt: refreshToken,
    fallbackSeconds: NINETY_DAYS_S,
  });

  const res = NextResponse.json({ ok: true, data: { accountProfile } });
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
