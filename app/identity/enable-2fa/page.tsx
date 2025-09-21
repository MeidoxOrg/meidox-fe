"use client";

import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { identityServerUrl } from "@/utils/api-links";

export default function Enable2FAPage() {
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    const enable2FA = async () => {
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

        setMessage(
          "Two-Factor Authentication is enabled! Scan the QR code below with your authenticator app."
        );
        setQrCodeUrl(data.qrCodeUrl);
      } catch (err: any) {
        setMessage("❌ " + err.message);
      } finally {
        setLoading(false);
      }
    };

    enable2FA();
  }, []);

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

      await signIn("identity", { callbackUrl: "/identity/home" });
    } catch (err: any) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Set up Two-Factor Authentication
        </h1>

        <p className="text-gray-600 text-center text-sm">
          Scan the QR code with your authenticator app to continue.
        </p>

        {loading && (
          <p className="text-center text-gray-500">Loading QR code…</p>
        )}

        {message && !loading && (
          <p className="text-center text-gray-700 text-sm">{message}</p>
        )}

        {qrCodeUrl && (
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-gray-50 border rounded-lg">
              <QRCodeCanvas value={qrCodeUrl} size={200} />
            </div>

            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
            />

            <button
              onClick={handleVerify}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
            >
              Verify
            </button>
          </div>
        )}

        <p className="text-center text-sm text-gray-500">
          <button
            type="button"
            onClick={() => router.push("/identity/login")}
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
}
