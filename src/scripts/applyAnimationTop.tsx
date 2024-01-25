export const applyAnimationTop = (ref: React.RefObject<HTMLDivElement>) => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const callback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && ref.current) {
        ref.current.classList.add("runner-div-top");
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  if (ref.current) {
    observer.observe(ref.current);
  }

  return () => {
    if (ref.current) {
      observer.unobserve(ref.current);
    }
  };
};

export const applyAnimationTopDuration = (
  ref: React.RefObject<HTMLDivElement>
) => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const callback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && ref.current) {
        ref.current.classList.add("runner-div-top-duration");
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  if (ref.current) {
    observer.observe(ref.current);
  }

  return () => {
    if (ref.current) {
      observer.unobserve(ref.current);
    }
  };
};
