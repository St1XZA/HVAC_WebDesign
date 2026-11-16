import { useRef, type PointerEvent, type ReactNode } from 'react';

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = 0.22, className = '' }: MagneticProps) {
  const outer = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  const handleMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const outerEl = outer.current;
    const innerEl = inner.current;
    if (!outerEl || !innerEl) return;
    const rect = outerEl.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    innerEl.style.transform = `translate3d(${(x * strength).toFixed(2)}px, ${(y * strength).toFixed(2)}px, 0)`;
  };

  const handleLeave = () => {
    if (inner.current) inner.current.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <span ref={outer} className={`magnetic ${className}`.trim()} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <span ref={inner} className="magnetic__inner">
        {children}
      </span>
    </span>
  );
}
