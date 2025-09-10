import Client from "./Client";

export default async function SigningInPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
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
      <Client to={toParam || "/"} />
    </div>
  );
}
