import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import PageHero from "../components/PageHero";
import "./Privacy.css";

function Privacy() {
  const { t } = useI18n();
  const { privacyContent, siteInfo } = t;

  return (
    <div className="page privacy-page">
      <PageHero title={privacyContent.title}>
        <p className="privacy-page__updated">
          <strong>{privacyContent.lastUpdatedLabel}</strong> {privacyContent.lastUpdated}
        </p>
      </PageHero>

      <section className="section">
        <div className="container privacy-page__content reveal">
          <p className="privacy-page__intro">{privacyContent.intro}</p>

          {privacyContent.sections.map((section) => (
            <article key={section.heading} className="privacy-section">
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.closing && <p>{section.closing}</p>}
            </article>
          ))}

          <article className="privacy-section">
            <h2>{privacyContent.contactHeading}</h2>
            <p>{privacyContent.contactIntro}</p>
            <ul className="privacy-page__contact">
              <li>
                <strong>{privacyContent.contactLabels.email}:</strong>{" "}
                <a href={`mailto:${siteInfo.email}`} className="link-accent">
                  {siteInfo.email}
                </a>
              </li>
              <li>
                <strong>{privacyContent.contactLabels.phone}:</strong>{" "}
                <a href={`tel:${siteInfo.phone.replace(/\s/g, "")}`} className="link-accent">
                  {siteInfo.phone}
                </a>
              </li>
              <li>
                <strong>{privacyContent.contactLabels.address}:</strong> {siteInfo.address}
              </li>
            </ul>
          </article>

          <hr className="privacy-page__divider" />
          <p className="privacy-page__acknowledgement">{privacyContent.acknowledgement}</p>

          <Link to="/contact" className="btn btn-outline privacy-page__back">
            {privacyContent.backLink}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Privacy;
