import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import type { Locale } from "@/types";

const STORAGE_KEY = "lang";

export function useLanguage() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<Locale>("es");

  useEffect(() => {
    setLang(i18n.language?.startsWith("en") ? "en" : "es");
  }, [i18n.language]);

  const switchTo = (l: Locale) => {
    i18n.changeLanguage(l);
    setLang(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  return { lang, switchTo };
}

/** Restore the persisted language on first render. */
export function restoreStoredLanguage(i18n: { language?: string; changeLanguage: (l: string) => void }) {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && saved !== i18n.language) i18n.changeLanguage(saved);
}
