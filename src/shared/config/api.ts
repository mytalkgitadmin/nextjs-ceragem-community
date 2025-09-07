export const API_BASE_URL = "/api/familytown" as const;

export const DEFAULT_SERVICE_HEADERS: Readonly<Record<string, string>> = {
  "X-DOMAIN-SERVICE": "FETA",
} as const;

export const getApiBaseUrl = (): string => API_BASE_URL;
