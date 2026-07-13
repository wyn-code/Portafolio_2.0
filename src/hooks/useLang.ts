import { useTranslation } from "react-i18next";

import type { Locale } from "@/types";

export function useLang(): Locale {
  const { i18n } = useTranslation();
  return i18n.language?.startsWith("en") ? "en" : "es";
}
