import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/scroll';
import type { ColdField } from '../lib/coldField';

type ColdFieldCanvasProps = { className?: string };

/**
 * Mounts the Three.js cold field into a container, loading it lazily after paint and
 * only animating while the container is on screen. Falls back to the CSS atmosphere
 * when WebGL is unavailable.
 */
export function ColdFieldCanvas({ className = '' }: ColdFieldCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    let cancelled = false;
    let field: ColdField | null = null;
    let io: IntersectionObserver | null = null;

    const reduced = prefersReducedMotion();

    import('../lib/coldField').then(({ createColdField }) => {
      if (cancelled) return;
      field = createColdField(container, reduced);
      if (!field) return;

      container.dataset.webgl = 'true';
      io = new IntersectionObserver(
        (entries) => field?.setActive(Boolean(entries[0]?.isIntersecting)),
        { threshold: 0 },
      );
      io.observe(container);
    });

    return () => {
      cancelled = true;
      io?.disconnect();
      field?.dispose();
    };
  }, []);

  return <div className={`cold-field ${className}`.trim()} ref={canvasRef} aria-hidden="true" />;
}
