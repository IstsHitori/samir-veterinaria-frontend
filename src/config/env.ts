export const env = {
  apiUrl:
    (import.meta.env.VITE_BACKEND_URL as string | undefined) ??
    "http://localhost:3000",
} as const;
