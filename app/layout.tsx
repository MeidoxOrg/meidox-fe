import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import Providers from "./providers";
import "./globals.css";
import { Toaster } from "sonner";
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
  title: "Manufacturing Management System",
  description: "Production management application",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AntdRegistry>
          <Providers>
            <Suspense fallback={null}>{children}</Suspense>
          </Providers>
        </AntdRegistry>
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
