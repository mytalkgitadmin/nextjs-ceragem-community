import { CoachConnectPage } from "@/pages-ui/coach-connect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface ConsentProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function setCoachConnectedCookie(toUrl: string) {
  "use server";

  const cookieStore = await cookies();
  cookieStore.set("coach_connected", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1년
  });

  redirect(toUrl);
}

export default async function CoachConnect({ searchParams }: ConsentProps) {
  const resolved = await searchParams;
  const toParam =
    typeof resolved.to === "string"
      ? resolved.to
      : Array.isArray(resolved.to)
        ? resolved.to[0]
        : "/";

  const boundAction = setCoachConnectedCookie.bind(null, toParam);

  return <CoachConnectPage onConnect={boundAction} />;
}
