export function decodeJwtExp(token: string): number | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(Buffer.from(base64, "base64").toString("utf8"));
    return typeof payload.exp === "number" ? payload.exp : null;
  } catch {
    return null;
  }
}

export function computeMaxAgeSeconds(options: {
  jwt?: string | null;
  fallbackSeconds: number;
}): number {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const { jwt, fallbackSeconds } = options;
  const jwtExp = jwt ? decodeJwtExp(jwt) : null;
  if (typeof jwtExp === "number") {
    return Math.max(0, jwtExp - nowSeconds);
  }
  return fallbackSeconds;
}
