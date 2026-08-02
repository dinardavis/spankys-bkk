import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import { LOGO_SRC } from "../constants/site";
import SocialIcons from "./SocialIcons";
import LanguageSwitcher from "./LanguageSwitcher";
import "./Navbar.css";

function Navbar() {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${
        menuOpen ? "navbar--menu-open" : ""
      }`}
    >
      <div className="navbar__inner container">
        <div className="navbar__left">
          <Link to="/" className="navbar__brand" onClick={() => setMenuOpen(false)}>
            <img src={LOGO_SRC} alt={t.siteInfo.name} className="navbar__logo" />
          </Link>
          <Link to="/contact" className="btn btn-primary navbar__cta navbar__cta--desktop">
            {t.navCta}
          </Link>
        </div>

        <nav className="navbar__nav navbar__nav--desktop" aria-label="Main navigation">
          <ul className="navbar__links">
            {t.navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? "navbar__link--active" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__right">
          <SocialIcons className="navbar__social" />
        </div>

        <button
          type="button"
          className={`navbar__toggle ${menuOpen ? "navbar__toggle--open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <LanguageSwitcher className="lang-switcher--mobile-header navbar__lang" />
      </div>

      <nav
        className={`navbar__nav navbar__nav--mobile ${menuOpen ? "navbar__nav--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul className="navbar__links">
          {t.navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="btn btn-primary navbar__cta"
          onClick={() => setMenuOpen(false)}
        >
          {t.navCta}
        </Link>
        <SocialIcons className="navbar__social navbar__social--mobile-menu" />
      </nav>
    </header>
  );
}

export default Navbar;
