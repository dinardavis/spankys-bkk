import { useI18n } from "../i18n/I18nContext";
import "./LanguageSwitcher.css";

const base = process.env.PUBLIC_URL || "";
const languages = [
  { code: "en", flag: `${base}/flags/en.webp` },
  { code: "ja", flag: `${base}/flags/jp.webp` },
  { code: "zh", flag: `${base}/flags/zh.webp` },
];

function LanguageSwitcher({ className = "" }) {
  const { language, setLanguage, languageLabels } = useI18n();

  return (
    <div
      className={`lang-switcher ${className}`.trim()}
      role="group"
      aria-label="Language switcher"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          className={`lang-switcher__btn ${
            language === lang.code ? "lang-switcher__btn--active" : ""
          }`}
          onClick={() => setLanguage(lang.code)}
          aria-label={languageLabels[lang.code]}
          title={languageLabels[lang.code]}
        >
          <img src={lang.flag} alt="" className="lang-switcher__flag" />
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
