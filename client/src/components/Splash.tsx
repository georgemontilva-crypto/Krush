import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState, type ReactNode, type PointerEvent } from "react";
import { BRAND } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Splat = { id: number; x: number; y: number; color: string; seed: number };

/** Blob outline with a few random lobes, so no two splats look alike. */
function splatPath(seed: number) {
  const pts = 14;
  let d = "";
  for (let i = 0; i <= pts; i++) {
    const a = (i / pts) * Math.PI * 2;
    const r = 40 + ((Math.sin(seed * 9.1 + i * 2.3) + 1) / 2) * 22 + (i % 3 === 0 ? 14 : 0);
    const x = 100 + Math.cos(a) * r;
    const y = 100 + Math.sin(a) * r;
    d += i === 0 ? `M${x.toFixed(1)} ${y.toFixed(1)}` : ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + "Z";
}

/**
 * Wraps a block so a tap/click throws a paint splat where it landed.
 * Interactive children (links, buttons) still work normally.
 */
export function SplashZone({ children, className }: { children: ReactNode; className?: string }) {
  const [splats, setSplats] = useState<Splat[]>([]);
  const n = useRef(0);

  const onDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    const r = e.currentTarget.getBoundingClientRect();
    const id = ++n.current;
    const s: Splat = {
      id,
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      color: BRAND[id % BRAND.length],
      seed: Math.random() * 100,
    };
    setSplats(v => [...v.slice(-6), s]);
    window.setTimeout(() => setSplats(v => v.filter(x => x.id !== id)), 1600);
  }, []);

  return (
    <div className={cn("relative", className)} onPointerDown={onDown}>
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <AnimatePresence>
          {splats.map(s => (
            <motion.div
              key={s.id}
              className="absolute"
              style={{ left: s.x - 100, top: s.y - 100, width: 200, height: 200 }}
              initial={{ scale: 0, opacity: 1, rotate: s.seed * 3 }}
              animate={{ scale: 1.4, opacity: 0.95 }}
              exit={{ opacity: 0, scale: 1.7 }}
              transition={{ type: "spring", stiffness: 380, damping: 14 }}
            >
              <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
                <path d={splatPath(s.seed)} fill={s.color} />
                {Array.from({ length: 7 }, (_, i) => {
                  const a = (i / 7) * Math.PI * 2 + s.seed;
                  return (
                    <motion.circle
                      key={i}
                      r={5 + (i % 3) * 3}
                      fill={s.color}
                      initial={{ cx: 100, cy: 100 }}
                      animate={{ cx: 100 + Math.cos(a) * (90 + i * 6), cy: 100 + Math.sin(a) * (90 + i * 6) }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  );
                })}
                <ellipse cx="82" cy="78" rx="12" ry="6" fill="white" opacity="0.7" transform="rotate(-30 82 78)" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {children}
    </div>
  );
}
