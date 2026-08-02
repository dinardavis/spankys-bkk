import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import PageHero from "../components/PageHero";
import "./Menu.css";

function Menu() {
  const { t } = useI18n();
  const { menuContent } = t;
  const [activeCategory, setActiveCategory] = useState(0);

  const category = menuContent.categories[activeCategory];

  return (
    <div className="page menu-page">
      <PageHero
        eyebrow={menuContent.eyebrow}
        title={menuContent.title}
        subtitle={menuContent.intro}
      />

      <section className="section">
        <div className="container menu-layout">
          <aside className="menu-sidebar reveal">
            <nav className="menu-categories" aria-label="Drink categories">
              {menuContent.categories.map((cat, i) => (
                <button
                  key={cat.key}
                  type="button"
                  className={`menu-category-btn ${
                    activeCategory === i ? "menu-category-btn--active" : ""
                  }`}
                  onClick={() => setActiveCategory(i)}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </aside>

          <div className="menu-content reveal reveal-delay-2">
            <h2 className="menu-content__title">{category.name}</h2>
            <ul className="menu-items">
              {category.items.map((item) => (
                <li key={item.name} className="menu-item">
                  <span className="menu-item__name">{item.name}</span>
                  <span className="menu-item__dots" aria-hidden="true" />
                  <span className="menu-item__price">{item.price}</span>
                </li>
              ))}
            </ul>
            <p className="menu-note">* {menuContent.note}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Menu;
