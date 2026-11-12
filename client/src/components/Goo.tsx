import { useEffect, useId, useRef, useState } from "react";
import { isLite, prefersReducedMotion } from "@/lib/utils";

type Props = {
  colors: string[];
  /** One extra blob chases the pointer. */
  follow?: boolean;
  className?: string;
  count?: number;
  /** Blob radius relative to the shorter side. */
  size?: number;
};

/**
 * Liquid "paint" field: drifting circles merged with an SVG goo filter, so
 * they melt into each other like the splash in the logo. Animation pauses
 * while off screen.
 */
function GooSvg({ colors, follow = true, className, count = 7, size = 0.16 }: Props) {
  const id = useId().replace(/:/g, "");
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const s = svg.current;
    if (!el || !s) return;
    const circles = Array.from(s.querySelectorAll<SVGCircleElement>("circle[data-b]"));
    const cursor = s.querySelector<SVGCircleElement>("circle[data-c]");
    let w = el.clientWidth;
    let h = el.clientHeight;
    const seeds = circles.map((_, i) => ({
      ax: 0.15 + ((i * 0.37) % 0.7),
      ay: 0.2 + ((i * 0.53) % 0.6),
      rx: 0.12 + ((i * 0.13) % 0.18),
      ry: 0.1 + ((i * 0.17) % 0.16),
      sp: 0.00012 + ((i * 7) % 5) * 0.00004,
      ph: i * 1.7,
      r: 0.7 + ((i * 0.29) % 0.6),
    }));
    let px = w * 0.5;
    let py = h * 0.5;
    let cx = px;
    let cy = py;
    let raf = 0;
    let visible = true;
    const still = prefersReducedMotion();

    const frame = (t: number) => {
      const m = Math.min(w, h);
      seeds.forEach((sd, i) => {
        const c = circles[i];
        const x = w * (sd.ax + Math.sin(t * sd.sp + sd.ph) * sd.rx);
        const y = h * (sd.ay + Math.cos(t * sd.sp * 1.3 + sd.ph) * sd.ry);
        c.setAttribute("cx", x.toFixed(1));
        c.setAttribute("cy", y.toFixed(1));
        c.setAttribute("r", (m * size * sd.r * (1 + Math.sin(t * 0.001 + i) * 0.08)).toFixed(1));
      });
      if (cursor) {
        cx += (px - cx) * 0.08;
        cy += (py - cy) * 0.08;
        cursor.setAttribute("cx", cx.toFixed(1));
        cursor.setAttribute("cy", cy.toFixed(1));
        cursor.setAttribute("r", (m * size * 0.7).toFixed(1));
      }
      if (visible && !still) raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => {
      w = el.clientWidth;
      h = el.clientHeight;
      s.setAttribute("viewBox", `0 0 ${w} ${h}`);
      if (still) frame(0);
    });
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(el);

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
    };
    if (follow) window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, [follow, size]);

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      {/* Drawn at half resolution and scaled up: the blur filter costs 4x less. */}
      <svg
        ref={svg}
        className="h-1/2 w-1/2 origin-top-left scale-[2] will-change-transform"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id={`goo-${id}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="b" />
            <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -11" />
          </filter>
        </defs>
        <g filter={`url(#goo-${id})`}>
          {Array.from({ length: count }, (_, i) => (
            <circle key={i} data-b="" cx="-999" cy="-999" r="0" fill={colors[i % colors.length]} />
          ))}
          {follow && <circle data-c="" cx="-999" cy="-999" r="0" fill={colors[count % colors.length]} />}
        </g>
      </svg>
    </div>
  );
}

/**
 * Phone version: plain blurred blobs moved with CSS transforms only, which the
 * GPU animates without repainting anything.
 */
function GooLite({ colors, className, count = 7 }: Props) {
  const n = Math.min(count, 5);
  return (
    <div className={className} aria-hidden="true">
      <div className="relative h-full w-full overflow-hidden">
        {Array.from({ length: n }, (_, i) => (
          <span
            key={i}
            className="goo-lite absolute rounded-full"
            style={{
              background: colors[i % colors.length],
              width: `${46 + ((i * 17) % 22)}vmin`,
              height: `${46 + ((i * 17) % 22)}vmin`,
              left: `${[-12, 52, 8, 60, 24][i]}%`,
              top: `${[4, 0, 48, 56, 26][i]}%`,
              animationDuration: `${14 + i * 3}s`,
              animationDelay: `${-i * 2.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Goo(props: Props) {
  const [lite, setLite] = useState(true);
  useEffect(() => setLite(isLite()), []);
  return lite ? <GooLite {...props} /> : <GooSvg {...props} />;
}
