"use client";
import { Button } from "@/components/ui/button";
import { POST_ADMIN_CRED } from "@/lib/api";
import { _doAdminLogin } from "@/services/loginService";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    username: "admin123",
    password: "root123",
  });
  const [logging, setLogging] = useState<boolean>(false);
  const router = useRouter();

  const _handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const { username, password } = formData;
      setLogging(true);
      const res = await _doAdminLogin(username, password);
      if (res.status < 400) {
        const data = await res.json();
        localStorage.setItem("jwtToken", data.token)
        router.replace("/admin");
      } else {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLogging(false);
    }
  };

  return (
    // <>
    <main className="px-3">
      <h1 className="text-center text-xl p-5">Admin Login</h1>
      <form
        onSubmit={_handleSubmit}
        className="mx-auto max-w-[400px] p-5 rounded-lg border shadow bg-primary-foreground "
      >
        <div className="flex flex-col gap-1">
          <label>Username</label>
          <input
            value={formData.username}
            onChange={(e: { target: { value: string } }) =>
              setFormData((old) => ({ ...old, username: e.target.value }))
            }
            className="p-2 rounded-md px-3 text-base border shadow focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1 mt-3">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e: { target: { value: string } }) =>
              setFormData((old) => ({ ...old, password: e.target.value }))
            }
            className="p-2 rounded-md px-3 text-base border shadow focus:ring-blue-400 outline-none"
          />
        </div>

        <Button className="mt-3" type="submit" disabled={logging}>
          {logging ? "Login ..." : "Login"}
        </Button>
      </form>
    </main>
    // </>
  );
}
