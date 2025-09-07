export function createTestJwt(expiresInSeconds: number): string {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { sub: "test_user", iat: now, exp: now + expiresInSeconds };
  const toB64Url = (obj: unknown) =>
    Buffer.from(JSON.stringify(obj))
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  return `${toB64Url(header)}.${toB64Url(payload)}.signature`;
}
