import { useEffect, type RefObject } from 'react';

/**
 * Writes the element's viewport progress (0 → 1) into a CSS custom property.
 * Read it in CSS with calc() for depth, stacking and timeline effects.
 */
export function useScrollVar(ref: RefObject<HTMLElement | null>, name = '--p'): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const progress = total > 0 ? (vh - rect.top) / total : 0;
      el.style.setProperty(name, Math.min(1, Math.max(0, progress)).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, name]);
}
