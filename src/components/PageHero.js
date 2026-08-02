function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner reveal">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

export default PageHero;
