import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  contactContent,
  eventsContent,
  footer,
  galleryContent,
  homeContent,
  marqueeText,
  menuContent,
  navCta,
  navLinks,
  privacyContent,
  siteInfo,
} from "../data/content";
import jaOverrides from "../locales/ja.json";
import zhOverrides from "../locales/zh.json";

const STORAGE_KEY = "spankys-lang";
const EMPTY_OVERRIDES = Object.freeze({});

const localeOverrides = {
  en: EMPTY_OVERRIDES,
  ja: jaOverrides,
  zh: zhOverrides,
};

const defaultLocale = {
  siteInfo,
  navLinks,
  navCta,
  homeContent,
  galleryContent,
  eventsContent,
  menuContent,
  contactContent,
  privacyContent,
  footer,
  marqueeText,
};

const mergedCache = new Map([["en", defaultLocale]]);

const languageLabels = {
  en: "English",
  ja: "Japanese",
  zh: "Chinese",
};

const I18nContext = createContext(null);

function mergeArrays(base, override) {
  if (!Array.isArray(override)) return base;
  if (!Array.isArray(base)) return override;

  const mergeKey = base.every((item) => item && typeof item === "object" && "id" in item)
    ? "id"
    : base.every((item) => item && typeof item === "object" && "key" in item)
      ? "key"
      : null;

  if (
    mergeKey &&
    override.every((item) => item && typeof item === "object" && mergeKey in item)
  ) {
    const overrideMap = new Map(
      override.map((entry) => [entry[mergeKey], entry])
    );
    return base.map((item) => {
      const match = overrideMap.get(item[mergeKey]);
      return match ? deepMerge(item, match) : item;
    });
  }

  return override;
}

function deepMerge(base, override) {
  if (Array.isArray(base)) return mergeArrays(base, override);
  if (typeof base !== "object" || base === null) {
    return override === undefined ? base : override;
  }

  const merged = { ...base };
  Object.keys(base).forEach((key) => {
    merged[key] = deepMerge(base[key], override?.[key]);
  });
  if (override && typeof override === "object") {
    Object.keys(override).forEach((key) => {
      if (!(key in base)) {
        merged[key] = override[key];
      }
    });
  }
  return merged;
}

function getMergedLocale(language) {
  if (mergedCache.has(language)) return mergedCache.get(language);

  const overrides = localeOverrides[language] ?? EMPTY_OVERRIDES;
  const merged = deepMerge(defaultLocale, overrides);
  mergedCache.set(language, merged);
  return merged;
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(
    () => window.localStorage.getItem(STORAGE_KEY) || "en"
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  }, [language]);

  const t = useMemo(() => getMergedLocale(language), [language]);
  const value = useMemo(
    () => ({ language, setLanguage, t, languageLabels }),
    [language, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
