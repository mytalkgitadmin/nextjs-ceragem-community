import dayjs from "@/shared/lib/dayjs";

export function isUpdatedProfile(timeStamp: number | string): boolean {
  const now = new Date();
  return dayjs(now).diff(timeStamp, "hour") < 24;
}
