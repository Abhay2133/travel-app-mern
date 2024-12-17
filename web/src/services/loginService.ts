import { POST_ADMIN_CRED } from "@/lib/api";

export const _doAdminLogin = (username: string, password: string) =>
  fetch((process.env.NEXT_PUBLIC_BASE_URL||"") + POST_ADMIN_CRED, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "content-type": "application/json" },
  });
