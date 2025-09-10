type ComputeArgs = { jwt: string; fallbackSeconds: number };

// 매우 단순화된 maxAge 계산: JWT exp가 있으면 그까지의 초, 없으면 fallback
export function computeMaxAgeSeconds({
  jwt,
  fallbackSeconds,
}: ComputeArgs): number {
  try {
    const [, payloadBase64] = jwt.split(".");
    if (!payloadBase64) return fallbackSeconds;
    const payloadJson = Buffer.from(payloadBase64, "base64").toString("utf8");
    const payload = JSON.parse(payloadJson) as { exp?: number };
    if (!payload.exp) return fallbackSeconds;
    const nowSeconds = Math.floor(Date.now() / 1000);
    const remaining = payload.exp - nowSeconds;
    return remaining > 0 ? remaining : 0;
  } catch {
    return fallbackSeconds;
  }
}
