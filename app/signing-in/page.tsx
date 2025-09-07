import { LottiePlayer } from "@/shared/ui/media";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error Client component (no types needed)
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
      <LottiePlayer
        src="/animations/Splash_screen.json"
        width="100vw"
        height="100dvh"
        style={{ position: "fixed", inset: 0 }}
        preserveAspectRatio="xMidYMid slice"
      />
      <Client to={toParam || "/"} />
    </div>
  );
}
