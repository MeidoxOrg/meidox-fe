"use client";
import ja from "@/locales/ja/common.json";
import en from "@/locales/en/common.json";

type Locale = "ja" | "en";
const DEFAULT_LOCALE: Locale = "ja";

export function useLanguage(locale: Locale = DEFAULT_LOCALE) {
  const dict = locale === "ja" ? ja : en;

  const t = (key: keyof typeof dict) => dict[key] ?? key;

  return { locale, t };
}
