function ContactInfoList({ labels, siteInfo, linkClassName = "" }) {
  const fields = [
    {
      label: labels.email,
      value: siteInfo.email,
      href: `mailto:${siteInfo.email}`,
    },
    {
      label: labels.phone,
      value: siteInfo.phone,
      href: `tel:${siteInfo.phone.replace(/\s/g, "")}`,
    },
    {
      label: labels.address,
      value: siteInfo.address,
    },
    {
      label: labels.hours,
      value: siteInfo.hours,
    },
  ];

  return (
    <ul className="contact-details">
      {fields.map((field) => (
        <li key={field.label} className="contact-details__item">
          <span className="contact-details__label">{field.label}</span>
          {field.href ? (
            <a href={field.href} className={`contact-details__value ${linkClassName}`.trim()}>
              {field.value}
            </a>
          ) : (
            <p className="contact-details__value">{field.value}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ContactInfoList;
