export function isValidMessage(text?: string): boolean {
  if (!text) return false;
  const trimmed = text.trim();
  return trimmed.length > 0;
}

export function isAdminMessage(
  messageType?: string,
  customType?: string,
  inDataType?: string
): boolean {
  // BASIC heuristic based on provided types
  if (!messageType && !customType && !inDataType) return false;
  return (
    customType === "SENDBIRD:AUTO_EVENT_MESSAGE" ||
    customType === "BEFAMILY:AUTO_EVENT_MESSAGE"
  );
}

export function checkEditMessage(_message: any): boolean {
  return true;
}
