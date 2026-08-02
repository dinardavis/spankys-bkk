import { useEffect, useRef } from "react";

function getObserverOptions() {
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  return {
    threshold: isMobile ? 0.08 : 0.12,
    rootMargin: isMobile ? "0px 0px 0px 0px" : "0px 0px -5% 0px",
  };
}

function revealWhenPainted(target, observer) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.classList.add("is-visible");
      observer.unobserve(target);
    });
  });
}

export function useScrollReveal(resetKey) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const observed = new WeakSet();
    let observer;
    let isInitialScan = true;

    const observeTargets = () => {
      const targets = root.querySelectorAll(".reveal:not(.is-visible)");
      if (targets.length === 0) return;

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                revealWhenPainted(entry.target, observer);
                observed.delete(entry.target);
              }
            });
          },
          getObserverOptions()
        );
      }

      targets.forEach((target) => {
        if (!observed.has(target)) {
          observer.observe(target);
          observed.add(target);
        }
      });

      if (isInitialScan) {
        isInitialScan = false;
        targets.forEach((target) => {
          const rect = target.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            revealWhenPainted(target, observer);
            observed.delete(target);
          }
        });
      }
    };

    observeTargets();

    const mutationObserver = new MutationObserver(observeTargets);
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, [resetKey]);

  return ref;
}
