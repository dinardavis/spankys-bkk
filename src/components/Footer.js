import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import { LOGO_SRC } from "../constants/site";
import SocialIcons from "./SocialIcons";
import "./Footer.css";

function Footer() {
  const { t } = useI18n();
  const { siteInfo, footer, navLinks } = t;
  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container footer__inner">
        <div className="footer__brand reveal">
          <img src={LOGO_SRC} alt="" className="footer__logo" />
          <p className="footer__tagline">{siteInfo.tagline}</p>
        </div>

        <div className="footer__columns">
          <div className="footer__col reveal reveal-delay-1">
            <h4>{footer.navigate}</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col reveal reveal-delay-2">
            <h4>{footer.visitUs}</h4>
            <ul>
              <li>{siteInfo.address}</li>
              <li>
                <a href={`tel:${siteInfo.phone.replace(/\s/g, "")}`}>
                  {siteInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
              </li>
              <li>{siteInfo.hours}</li>
            </ul>
          </div>

          <div className="footer__col footer__newsletter reveal reveal-delay-3">
            <h4>{footer.newsletter}</h4>
            <p>{footer.newsletterText}</p>
            <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={footer.emailPlaceholder}
                aria-label={footer.emailPlaceholder}
              />
              <button type="submit" className="footer__submit" aria-label={footer.subscribe}>
                →
              </button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <p>Copyright © {new Date().getFullYear()} {footer.copyright}</p>
          <SocialIcons className="footer__social" />
        </div>
      </div>
      <div className="footer__accent-line" aria-hidden="true" />
    </footer>
  );
}

export default Footer;
