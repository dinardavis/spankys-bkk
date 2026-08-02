import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LanguageSwitcher from "./LanguageSwitcher";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { usePageMeta } from "../hooks/usePageMeta";

function resetScrollInstant() {
  const { documentElement: html, body } = document;
  const htmlBehavior = html.style.scrollBehavior;
  const bodyBehavior = body.style.scrollBehavior;

  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  html.scrollTop = 0;
  body.scrollTop = 0;
  window.scrollTo(0, 0);

  html.style.scrollBehavior = htmlBehavior;
  body.style.scrollBehavior = bodyBehavior;
}

function Layout() {
  const location = useLocation();
  const pageRef = useScrollReveal(location.pathname);
  usePageMeta();

  useLayoutEffect(() => {
    if (!location.hash) {
      resetScrollInstant();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) return undefined;

    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return undefined;
  }, [location.pathname, location.hash]);

  return (
    <>
      <Navbar />
      <LanguageSwitcher className="lang-switcher--fixed" />
      <div ref={pageRef}>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
