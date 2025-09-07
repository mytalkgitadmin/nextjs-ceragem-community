import { NextRequest, NextResponse } from "next/server";

async function proxy(req: NextRequest, params: { path: string[] }) {
  const base = process.env.FAMILYTOWN_API_BASE_URL;
  if (!base) {
    return NextResponse.json(
      { message: "FAMILYTOWN_API_BASE_URL is not set" },
      { status: 500 }
    );
  }

  const targetBase = base.replace(/\/$/, "");
  const suffix = `/${(params.path || []).join("/")}`;
  const search = req.nextUrl.search || "";
  const url = `${targetBase}${suffix}${search}`;
  const accessToken = req.cookies.get("familytown_at")?.value || "";

  const headers = new Headers(req.headers);
  headers.delete("host"); // 프록시 대상 서버(FAMILYTOWN_API_BASE_URL)로 보낼 때 Host 헤더는 대상 서버의 호스트로 자동 설정돼야함
  headers.delete("content-length"); //프록시가 요청 바디를 다시 구성(init.body = Buffer.from(buf))하므로 원본 Content-Length 값이 실제 바디 길이와 달라질 수 있음
  headers.set("Authorization", `Bearer ${accessToken}`);

  const init: RequestInit = {
    method: req.method,
    headers,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    // 요청 바디는 1회성 스트림이므로 그대로 전달하면 문제가 생김 따라서 바디를 버퍼로 변환하여 전달
    // 이 방식이 프록시에서 가장 안정하고 호환성이 좋음 (duplex: "half" 대신)
    const buf = await req.arrayBuffer();
    init.body = Buffer.from(buf);
  }

  const upstream = await fetch(url, init);

  const contentType = upstream.headers.get("content-type") || undefined;

  if (contentType?.includes("application/json")) {
    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, {
      status: upstream.status,
      headers: contentType ? { "content-type": contentType } : undefined,
    });
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: contentType ? { "content-type": contentType } : undefined,
  });
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return proxy(req, { path });
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return proxy(req, { path });
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return proxy(req, { path });
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return proxy(req, { path });
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return proxy(req, { path });
}
