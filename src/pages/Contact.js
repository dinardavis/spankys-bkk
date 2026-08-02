import { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import { useForm } from "../hooks/useForm";
import { MAP_LINK_URL } from "../constants/site";
import PageHero from "../components/PageHero";
import ContactInfoList from "../components/ContactInfoList";
import MapEmbed from "../components/MapEmbed";
import FormSuccessModal from "../components/FormSuccessModal";
import "./Contact.css";

const INITIAL_CONTACT_FORM = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
  agreed: false,
};

function Contact() {
  const { t } = useI18n();
  const { contactContent, siteInfo } = t;
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const {
    values: formData,
    handleChange,
    handleSubmit,
    showSuccess,
    closeSuccess,
  } = useForm(INITIAL_CONTACT_FORM);

  const { form } = contactContent;

  return (
    <div className="page contact-page">
      <PageHero
        eyebrow={contactContent.eyebrow}
        title={contactContent.title}
        subtitle={contactContent.subtitle}
      />

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-info reveal">
            <h2>{contactContent.getInTouch}</h2>
            <ContactInfoList
              labels={contactContent.labels}
              siteInfo={siteInfo}
              linkClassName="link-accent"
            />

            <div className="contact-map">
              <h3>{contactContent.whereAreWe}</h3>
              <MapEmbed title={siteInfo.name} className="contact-map__embed map-embed" />
              <div className="contact-map__links">
                <a href={MAP_LINK_URL} target="_blank" rel="noopener noreferrer">
                  {contactContent.maps}
                </a>
                <a
                  href="https://www.grab.com/th/en/ride/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactContent.grab}
                </a>
                <a
                  href="https://bolt.eu/en/cities/bangkok/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactContent.bolt}
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-card reveal reveal-delay-2">
            <h2>{contactContent.sendMessage}</h2>
            <form className="site-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  {form.firstName}
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={form.placeholders.firstName}
                  />
                </label>
                <label>
                  {form.lastName}
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={form.placeholders.lastName}
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
                    onChange={handleChange}
                    placeholder={form.placeholders.phone}
                  />
                </label>
                <label>
                  {form.email}
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={form.placeholders.email}
                  />
                </label>
              </div>
              <label>
                {form.message}
                <textarea
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={form.placeholders.message}
                />
              </label>
              <label className="site-form__checkbox">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  required
                />
                <span>
                  {form.privacy}{" "}
                  <Link to="/privacy" className="link-accent">
                    {form.privacyLink}
                  </Link>
                  .
                </span>
              </label>
              <button type="submit" className="btn btn-primary">
                {form.submit}
              </button>
            </form>
            {showSuccess && (
              <FormSuccessModal
                message={form.success}
                buttonLabel={form.submitAnother}
                onClose={closeSuccess}
              />
            )}
          </div>
        </div>
      </section>

      <section className="section contact-faq">
        <div className="container">
          <h2 className="section-title contact-faq__title reveal">
            {contactContent.faqTitle}
          </h2>
          <div className="faq-list">
            {contactContent.faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                question={faq.q}
                answer={faq.a}
                open={openFaqIndex === i}
                onToggle={() =>
                  setOpenFaqIndex((current) => (current === i ? null : i))
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ question, answer, open, onToggle }) {
  return (
    <div className={`faq-item ${open ? "faq-item--open" : ""}`}>
      <button
        type="button"
        className="faq-item__trigger"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="faq-item__question">{question}</span>
        <span className="faq-item__icon" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <div className="faq-item__panel">
        <div className="faq-item__answer">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
