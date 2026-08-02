import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import { getGalleryImage } from "../data/galleryImages";
import { useForm } from "../hooks/useForm";
import PageHero from "../components/PageHero";
import FormSuccessModal from "../components/FormSuccessModal";
import "./Events.css";

const EVENTS_ROW_SIZE = 3;
const EVENT_INQUIRY_ID = "event-inquiry";

const INITIAL_EVENT_FORM = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  preferredDate: "",
  groupSize: "",
  details: "",
};

function getEventTimestamp(dateStr) {
  const cjkMatch = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/.exec(dateStr);
  if (cjkMatch) {
    return new Date(
      Number(cjkMatch[1]),
      Number(cjkMatch[2]) - 1,
      Number(cjkMatch[3])
    ).getTime();
  }

  const parsed = Date.parse(dateStr);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function sortEventsByDate(events) {
  return [...events].sort(
    (a, b) => getEventTimestamp(a.date) - getEventTimestamp(b.date)
  );
}

function chunkEvents(events, size) {
  const rows = [];
  for (let i = 0; i < events.length; i += size) {
    rows.push(events.slice(i, i + size));
  }
  return rows;
}

function EventInquirySection({
  eventsContent,
  siteInfo,
  formData,
  showSuccessModal,
  onChange,
  onSubmit,
  onCloseSuccess,
}) {
  const { form, host, contactAlt } = eventsContent;

  return (
    <section id={EVENT_INQUIRY_ID} className="event-inquiry reveal">
      <div className="event-inquiry__intro">
        <span className="eyebrow">{host.eyebrow}</span>
        <h2 className="section-title">{host.title}</h2>
        <p>{host.body}</p>
      </div>

      <div className="event-inquiry__form-card">
        <h3>{form.title}</h3>
        <form className="site-form" onSubmit={onSubmit}>
          <div className="form-row">
            <label>
              {form.name}
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={onChange}
                placeholder={form.placeholders.name}
              />
            </label>
            <label>
              {form.email}
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={onChange}
                placeholder={form.placeholders.email}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              {form.phone}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder={form.placeholders.phone}
              />
            </label>
            <label>
              {form.eventType}
              <input
                type="text"
                name="eventType"
                value={formData.eventType}
                onChange={onChange}
                placeholder={form.placeholders.eventType}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              {form.preferredDate}
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={onChange}
                className={formData.preferredDate ? "site-form__date--filled" : undefined}
              />
            </label>
            <label>
              {form.groupSize}
              <input
                type="number"
                name="groupSize"
                min="1"
                value={formData.groupSize}
                onChange={onChange}
                placeholder={form.placeholders.groupSize}
              />
            </label>
          </div>
          <label>
            {form.details}
            <textarea
              name="details"
              rows="4"
              value={formData.details}
              onChange={onChange}
              placeholder={form.placeholders.details}
            />
          </label>
          <button type="submit" className="btn btn-primary">
            {form.submit}
          </button>
        </form>
        {showSuccessModal && (
          <FormSuccessModal
            message={form.success}
            buttonLabel={form.submitAnother}
            onClose={onCloseSuccess}
          />
        )}
      </div>

      <div className="event-inquiry__contact">
        <h3>{contactAlt.title}</h3>
        <div className="event-inquiry__links">
          <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
          <a href={`tel:${siteInfo.phone.replace(/\s/g, "")}`}>{siteInfo.phone}</a>
        </div>
        <Link to="/contact" className="btn btn-outline">
          {contactAlt.button}
        </Link>
      </div>
    </section>
  );
}

function Events() {
  const { t } = useI18n();
  const { eventsContent, siteInfo } = t;
  const [rowSize, setRowSize] = useState(() =>
    window.matchMedia("(max-width: 1024px)").matches ? 1 : EVENTS_ROW_SIZE
  );
  const {
    values: formData,
    handleChange,
    handleSubmit,
    showSuccess,
    closeSuccess,
  } = useForm(INITIAL_EVENT_FORM);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const updateRowSize = () => {
      setRowSize(mediaQuery.matches ? 1 : EVENTS_ROW_SIZE);
    };

    updateRowSize();
    mediaQuery.addEventListener("change", updateRowSize);
    return () => mediaQuery.removeEventListener("change", updateRowSize);
  }, []);

  const eventRows = useMemo(() => {
    const sortedEvents = sortEventsByDate(eventsContent.events);
    return chunkEvents(sortedEvents, rowSize);
  }, [eventsContent.events, rowSize]);

  const [firstRow, ...remainingRows] = eventRows;

  return (
    <div className="page events-page">
      <PageHero
        eyebrow={eventsContent.eyebrow}
        title={eventsContent.title}
        subtitle={eventsContent.subtitle}
      />

      <section className="section">
        <div className="container events-page__content">
          {firstRow && (
            <div className="events-grid">
              <div className="events-grid__row">
                {firstRow.map((event, i) => (
                  <article
                    key={event.id}
                    className={`event-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
                  >
                    <div className="event-card__image">
                      <img
                        src={getGalleryImage(event.image)}
                        alt=""
                        className="img-cover-portrait"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="event-card__date">{event.date}</span>
                    </div>
                    <div className="event-card__body">
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <EventInquirySection
            eventsContent={eventsContent}
            siteInfo={siteInfo}
            formData={formData}
            showSuccessModal={showSuccess}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCloseSuccess={closeSuccess}
          />

          {remainingRows.length > 0 && (
            <div className="events-grid">
              {remainingRows.map((row) => (
                <div key={row[0].id} className="events-grid__row">
                  {row.map((event, i) => (
                    <article
                      key={event.id}
                      className={`event-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
                    >
                      <div className="event-card__image">
                        <img
                          src={getGalleryImage(event.image)}
                          alt=""
                          className="img-cover-portrait"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="event-card__date">{event.date}</span>
                      </div>
                      <div className="event-card__body">
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Events;
