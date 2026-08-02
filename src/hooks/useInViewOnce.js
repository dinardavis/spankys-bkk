import { useEffect, useRef, useState } from "react";

export function useInViewOnce(threshold = 0.35) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return [ref, inView];
}
