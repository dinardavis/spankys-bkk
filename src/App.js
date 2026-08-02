import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./i18n/I18nContext";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Events = lazy(() => import("./pages/Events"));
const Menu = lazy(() => import("./pages/Menu"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));

function App() {
  return (
    <I18nProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="events" element={<Events />} />
              <Route path="menu" element={<Menu />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
