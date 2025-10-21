"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { identityServerUrl } from "@/utils/api-links";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${identityServerUrl}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.error === "two_factor_required") {
          setMessage("⚠️ Two-Factor Authentication required!");
          router.push("enable-2fa");
        } else {
          throw new Error(data?.error || "Login failed");
        }
        return;
      }

      setMessage("✅ Login success!");
      console.log("Login response:", data);
    } catch (err: any) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow"
      >
        <h1 className="text-xl font-semibold text-gray-800 text-center">{t('login')}</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700">{message}</p>
        )}

        {/* Link register */}
        <p className="mt-2 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/identity/register")}
            className="text-blue-600 hover:underline"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
}
