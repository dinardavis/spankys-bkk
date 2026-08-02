import { useState, useEffect } from "react";
import { useI18n } from "../i18n/I18nContext";
import { galleryImages } from "../data/galleryImages";
import PageHero from "../components/PageHero";
import "./Gallery.css";

const INITIAL_COUNT = 16;
const LOAD_STEP = 16;

function Gallery() {
  const { t } = useI18n();
  const { galleryContent } = t;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [animatedFrom, setAnimatedFrom] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (img) => {
    const index = galleryImages.findIndex((item) => item.name === img.name);
    setLightboxIndex(index >= 0 ? index : 0);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const goToPrevious = () => {
    setLightboxIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setLightboxIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((current) =>
          current === 0 ? galleryImages.length - 1 : current - 1
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((current) =>
          current === galleryImages.length - 1 ? 0 : current + 1
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  const totalImages = galleryImages.length;
  const visibleImages = galleryImages.slice(0, visibleCount);
  const hasMore = visibleCount < totalImages;

  const handleLoadMore = () => {
    setAnimatedFrom(visibleCount);
    setVisibleCount((count) => Math.min(count + LOAD_STEP, totalImages));
  };

  return (
    <div className="page gallery-page">
      <PageHero
        eyebrow={galleryContent.eyebrow}
        title={galleryContent.title}
        subtitle={galleryContent.subtitle}
      />

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {visibleImages.map((img, index) => (
              <button
                key={img.name}
                type="button"
                className={`gallery-grid__item${
                  index >= animatedFrom ? " gallery-grid__item--enter" : ""
                }`}
                style={
                  index >= animatedFrom
                    ? { animationDelay: `${(index - animatedFrom) * 0.07}s` }
                    : undefined
                }
                onClick={() => openLightbox(img)}
                aria-label={`View ${img.name}`}
              >
                <img
                  src={img.src}
                  alt=""
                  className="img-cover-portrait"
                  loading="lazy"
                  decoding="async"
                />
                <span className="gallery-grid__overlay" aria-hidden="true" />
              </button>
            ))}
          </div>

          {hasMore && (
            <div className="gallery-load-more">
              <button type="button" className="btn btn-ghost" onClick={handleLoadMore}>
                {galleryContent.loadMore}
              </button>
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={closeLightbox}
            aria-label="Close preview"
          >
            ×
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <img
            src={galleryImages[lightboxIndex].src}
            alt=""
            className="lightbox__image"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default Gallery;
