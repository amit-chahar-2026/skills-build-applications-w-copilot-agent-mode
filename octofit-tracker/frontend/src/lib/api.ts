export const VITE_CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME ?? '';
export const API_BASE_URL = VITE_CODESPACE_NAME
  ? `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function extractItems(response: unknown, key: string): unknown[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (response && typeof response === 'object') {
    const payload = response as Record<string, unknown>;

    if (Array.isArray(payload.data)) {
      return payload.data;
    }

    if (Array.isArray(payload[key])) {
      return payload[key] as unknown[];
    }

    if (Array.isArray(payload.items)) {
      return payload.items;
    }

    if (Array.isArray(payload.results)) {
      return payload.results;
    }
  }

  return [];
}
