import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import {
  galleryImages,
  HOME_EXPERIENCE_INDICES,
  HOME_HERO_COUNT,
  HOME_PREVIEW_COUNT,
} from "../data/galleryImages";
import { useInViewOnce } from "../hooks/useInViewOnce";
import ContactInfoList from "../components/ContactInfoList";
import MapEmbed from "../components/MapEmbed";
import Marquee from "../components/Marquee";
import "./Home.css";

const heroBars = galleryImages.slice(0, HOME_HERO_COUNT);
const STAT_ANIMATION_MS = 4800;
const LONG_STAT_DELAY_MS = 300;

const SPANKINGS_STEPS = [
  "2+", "6+", "11+", "19+", "27+", "38+", "52+", "67+", "84+", "101+",
  "119+", "138+", "159+", "183+", "211+", "246+", "284+", "327+", "376+", "431+",
  "493+", "562+", "638+", "721+", "812+", "934+", "1.1K+", "1.3K+", "1.6K+", "1.9K+",
  "2.4K+", "2.9K+", "3.6K+", "4.3K+", "5.2K+", "6.4K+", "7.8K+", "9.6K+", "12K+", "15K+",
  "19K+", "23K+", "28K+", "34K+", "41K+", "49K+", "58K+", "69K+", "81K+", "94K+",
  "108K+", "127K+", "149K+", "173K+", "201K+", "236K+", "274K+", "318K+", "367K+", "421K+",
  "487K+", "563K+", "641K+", "728K+", "819K+", "912K+", "1.1M+", "1.4M+", "1.8M+", "2.3M+",
  "2.9M+", "3.7M+", "4.6M+", "5.8M+", "7.1M+", "8.9M+", "11M+", "13M+", "16M+", "19M+",
];

function getStatDelay(value, index) {
  if (value === "100K+" || value === "∞") return LONG_STAT_DELAY_MS;
  return index * 250;
}

function getInitialStatDisplay(value) {
  if (value === "∞") return "1+";
  const match = /^(\d+(?:\.\d+)?)(K\+|\+|★)?$/.exec(value);
  if (!match) return value;
  const suffix = match[2] || "";
  if (suffix === "K+") return "1K+";
  if (suffix === "★") return "0.0★";
  if (suffix === "+") return "0+";
  return "0";
}

function AnimatedStatValue({ value, active, delay = 0 }) {
  const [display, setDisplay] = useState(() => getInitialStatDisplay(value));

  useEffect(() => {
    if (!active) {
      setDisplay(getInitialStatDisplay(value));
      return undefined;
    }

    let frameId;
    let timeoutId;

    const runAnimation = () => {
      const startTime = performance.now();

      if (value === "∞") {
        const runInfinityAnimation = (now) => {
          const progress = Math.min((now - startTime) / STAT_ANIMATION_MS, 1);
          if (progress >= 1) {
            setDisplay("∞");
            return;
          }
          const eased = 1 - (1 - progress) ** 2.4;
          const index = Math.min(
            SPANKINGS_STEPS.length - 1,
            Math.floor(eased * SPANKINGS_STEPS.length)
          );
          setDisplay(SPANKINGS_STEPS[index]);
          frameId = requestAnimationFrame(runInfinityAnimation);
        };

        frameId = requestAnimationFrame(runInfinityAnimation);
        return;
      }

      const match = /^(\d+(?:\.\d+)?)(K\+|\+|★)?$/.exec(value);
      if (!match) {
        setDisplay(value);
        return;
      }

      const target = Number(match[1]);
      const suffix = match[2] || "";
      const isDecimal = Number.isInteger(target) === false;

      const runNumberAnimation = (now) => {
        const progress = Math.min((now - startTime) / STAT_ANIMATION_MS, 1);
        const eased = 1 - (1 - progress) ** 3;
        const current = target * eased;

        if (suffix === "K+" && value === "100K+") {
          const linearFromOneK = 1 + Math.floor(progress * 99);
          setDisplay(`${Math.min(100, linearFromOneK)}K+`);
        } else if (suffix === "K+") {
          setDisplay(`${Math.max(0, Math.floor(current))}K+`);
        } else if (suffix === "★" || isDecimal) {
          setDisplay(`${current.toFixed(1)}${suffix}`);
        } else if (suffix === "+") {
          setDisplay(`${Math.max(0, Math.floor(current))}+`);
        } else {
          setDisplay(String(Math.max(0, Math.floor(current))));
        }

        if (progress < 1) {
          frameId = requestAnimationFrame(runNumberAnimation);
        } else {
          setDisplay(value);
        }
      };

      frameId = requestAnimationFrame(runNumberAnimation);
    };

    timeoutId = window.setTimeout(runAnimation, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [value, active, delay]);

  return (
    <span
      className={`stats__value ${display === "∞" ? "stats__value--infinity" : ""}`}
    >
      {display}
    </span>
  );
}

function StatsSection({ title, items }) {
  const [sectionRef, animate] = useInViewOnce(0.35);

  return (
    <section className="section stats" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title reveal">{title}</h2>
        <div className="stats__grid">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`stats__card reveal reveal-delay-${i + 1}${
                item.value === "∞" ? " stats__card--featured" : ""
              }`}
            >
              <AnimatedStatValue
                value={item.value}
                active={animate}
                delay={getStatDelay(item.value, i)}
              />
              <span className="stats__label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  const { t } = useI18n();
  const { homeContent, siteInfo } = t;

  return (
    <div className="page home">
      <section className="hero">
        <div className="hero__glow hero__glow--left" aria-hidden="true" />
        <div className="hero__glow hero__glow--right" aria-hidden="true" />

        <div className="container hero__content">
          <div className="hero__text reveal">
            <h1 className="hero__title">{homeContent.hero.title}</h1>
            <p className="hero__subtitle">{homeContent.hero.subtitle}</p>
            <p className="hero__body">{homeContent.hero.body}</p>
            <div className="hero__buttons">
              {homeContent.hero.buttons.map((btn) => (
                <Link
                  key={btn.label}
                  to={btn.path}
                  className={`btn ${btn.primary ? "btn-primary" : "btn-outline"}`}
                >
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hero__visual reveal reveal-delay-2">
            <div className="hero__bars" aria-hidden="true">
              {heroBars.map((img, i) => (
                <div
                  key={img.name}
                  className="hero__bar"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <img
                    src={img.src}
                    alt=""
                    loading={i < 2 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <StatsSection title={homeContent.stats.title} items={homeContent.stats.items} />

      <section className="section experience">
        <div className="container experience__grid">
          <div className="experience__images reveal">
            <img
              src={galleryImages[HOME_EXPERIENCE_INDICES[0]]?.src}
              alt=""
              className="experience__img experience__img--main"
              loading="lazy"
              decoding="async"
            />
            <img
              src={galleryImages[HOME_EXPERIENCE_INDICES[1]]?.src}
              alt=""
              className="experience__img experience__img--accent"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="experience__content reveal reveal-delay-2">
            <span className="eyebrow">{homeContent.experience.eyebrow}</span>
            <h2 className="section-title">{homeContent.experience.title}</h2>
            {homeContent.experience.body.map((paragraph) => (
              <p key={paragraph.slice(0, 30)} className="experience__paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section celebrate">
        <div className="container">
          <div className="celebrate__inner reveal">
            <div className="celebrate__glow" aria-hidden="true" />
            <span className="eyebrow">{homeContent.celebrate.eyebrow}</span>
            <h2 className="section-title">{homeContent.celebrate.title}</h2>
            <p className="celebrate__body">{homeContent.celebrate.body}</p>
            <Link to={homeContent.celebrate.button.path} className="btn btn-outline">
              {homeContent.celebrate.button.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-gallery-preview">
        <div className="container">
          <div className="home-gallery-preview__header reveal">
            <div className="home-gallery-preview__title-group">
              <span className="eyebrow">{homeContent.galleryPreview.eyebrow}</span>
              <h2 className="section-title">{homeContent.galleryPreview.title}</h2>
            </div>
            <Link to="/gallery" className="btn btn-primary">
              {homeContent.galleryPreview.button}
            </Link>
          </div>
          <div className="home-gallery-preview__grid">
            {galleryImages.slice(0, HOME_PREVIEW_COUNT).map((img, i) => (
              <div
                key={img.name}
                className={`home-gallery-preview__item reveal reveal-delay-${(i % 4) + 1}`}
              >
                <img
                  src={img.src}
                  alt=""
                  className="img-cover-portrait"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-contact">
        <div className="container">
          <div className="home-contact__card reveal">
            <div className="home-contact__info">
              <span className="eyebrow">{homeContent.contact.eyebrow}</span>
              <h2 className="section-title">{homeContent.contact.title}</h2>
              <ContactInfoList labels={homeContent.contact.labels} siteInfo={siteInfo} />
            </div>
            <MapEmbed title={siteInfo.name} className="home-contact__map map-embed" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
