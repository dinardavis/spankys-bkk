import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMeta } from "../seo/pageMeta";

function setMetaTag(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);
    document.title = meta.title;
    setMetaTag("description", meta.description);
  }, [pathname]);
}
