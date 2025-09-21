"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { identityServerUrl } from "@/utils/api-links";

export default function Enable2FAPage() {
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleEnable = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${identityServerUrl}/Auth/enable-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Enable 2FA failed");

      setMessage("✅ 2FA Enabled. Scan the QR Code below.");
      setQrCodeUrl(data.qrCodeUrl);
      setSecret(data.secret);
    } catch (err: any) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      const res = await fetch(`${identityServerUrl}/Auth/verify-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Verify 2FA failed");

      await signIn("identity", {
        callbackUrl: "/identity/home",
      });
    } catch (err: any) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow">
        <h1 className="text-xl font-semibold text-gray-800">Enable 2FA</h1>

        <button
          onClick={handleEnable}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Enabling..." : "Enable 2FA"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700">{message}</p>
        )}

        {qrCodeUrl && (
          <div className="flex flex-col items-center gap-2 pt-4">
            <QRCodeCanvas value={qrCodeUrl} size={180} />
            <input
              type="text"
              placeholder="Enter 2FA code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <button
              onClick={handleVerify}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Verify 2FA
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
