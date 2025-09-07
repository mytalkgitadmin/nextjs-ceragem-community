// Message-related utilities moved from shared/lib/chat

export function encryptData(text: string): string {
  try {
    return typeof window !== "undefined"
      ? btoa(unescape(encodeURIComponent(text)))
      : Buffer.from(text, "utf-8").toString("base64");
  } catch (e) {
    return text;
  }
}

export function decryptData(text: string): string {
  try {
    return typeof window !== "undefined"
      ? decodeURIComponent(escape(atob(text)))
      : Buffer.from(text, "base64").toString("utf-8");
  } catch (e) {
    return text;
  }
}

export function parseData(raw: unknown): any {
  if (typeof raw !== "string") return { type: undefined, payload: raw };
  try {
    const parsed = JSON.parse(raw);
    return { type: (parsed && parsed.type) || undefined, ...parsed };
  } catch (e) {
    return { type: undefined, payload: raw };
  }
}

export function convertEditMessage(message: string): string {
  return message;
}
export function checkEditMessage(_: unknown): boolean {
  return true;
}
export function isAdminMessage(message: any): boolean {
  const customType = message?.customType;
  return (
    customType === "SENDBIRD:AUTO_EVENT_MESSAGE" ||
    customType === "BEFAMILY:AUTO_EVENT_MESSAGE"
  );
}

export * from "./message-validators";
