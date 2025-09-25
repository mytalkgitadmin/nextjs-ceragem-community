import Client from "./Client";

export interface SigningInProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SigningIn({ searchParams }: SigningInProps) {
  const resolved = await searchParams;
  const toParam =
    typeof resolved.to === "string"
      ? resolved.to
      : Array.isArray(resolved.to)
        ? resolved.to[0]
        : "/";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div>SigningInPage</div>
      <Client to={toParam} />
    </div>
  );
}
