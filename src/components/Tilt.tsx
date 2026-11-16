import { useRef, type PointerEvent, type ReactNode } from 'react';

type TiltProps = {
  children: ReactNode;
  className?: string;
  max?: number;
};

export function Tilt({ children, className = '', max = 4.5 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translate3d(0,-3px,0)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div ref={ref} className={`tilt ${className}`.trim()} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      {children}
    </div>
  );
}
