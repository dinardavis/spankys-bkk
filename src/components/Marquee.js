import { useI18n } from "../i18n/I18nContext";
import "./Marquee.css";

function Marquee() {
  const { t } = useI18n();
  const text = t.marqueeText.repeat(4);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default Marquee;
