"use client";

import { identityServerUrl } from "@/utils/api-links";
import { useState } from "react";
import { useRouter } from "next/navigation"; // <--- import useRouter

export default function RegisterPage() {
  const router = useRouter(); // <--- hook router
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    enableTwoFactor: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (form.password !== form.confirmPassword) {
      setMessage("❌ Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${identityServerUrl}/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          enableTwoFactor: form.enableTwoFactor,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || "Register failed");
      }

      const data = await res.json();
      setMessage("✅ Register success!");
      console.log("Register response:", data);
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
        <h1 className="text-xl font-semibold text-gray-800">Register</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2"
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="enableTwoFactor"
            checked={form.enableTwoFactor}
            onChange={handleChange}
          />
          Enable Two-Factor Authentication
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700">{message}</p>
        )}

        {/* Link back to login */}
        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/identity/login")}
            className="text-blue-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}
