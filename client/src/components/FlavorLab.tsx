import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Link } from "wouter";
import type { Flavor, Line } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { Tilt } from "./Tilt";

type Flood = { key: number; color: string; accent: string; x: number; y: number; r: number };

const TYPE_COLOR: Record<string, string> = { Sativa: "#ffe11a", Indica: "#8b3dff", Hybrid: "#2bd96b" };

export function TypeBadge({ type, className }: { type?: string; className?: string }) {
  if (!type) return null;
  return (
    <span
      className={cn(
        "font-display inline-flex items-center rounded-full border-2 border-ink px-3 py-0.5 text-sm leading-6",
        type === "Indica" ? "text-white" : "text-ink",
        className,
      )}
      style={{ background: TYPE_COLOR[type] }}
    >
      {type}
    </span>
  );
}

/**
 * Full-bleed flavor picker. Choosing a flavor floods the section with its
 * color from the chip that was tapped, and the product drops in.
 */
export function FlavorLab({
  line,
  flavor,
  onSelect,
  header,
  showLink = true,
  imageMode = "main",
  className,
}: {
  line: Line;
  flavor: Flavor;
  onSelect: (f: Flavor) => void;
  header?: ReactNode;
  showLink?: boolean;
  imageMode?: "main" | "alt";
  className?: string;
}) {
  const box = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [base, setBase] = useState({ color: flavor.color, accent: flavor.accent });
  const [flood, setFlood] = useState<Flood | null>(null);
  const n = useRef(0);
  const last = useRef(flavor.slug);

  // External changes (tab switch, URL) flood from the center.
  useEffect(() => {
    if (last.current === flavor.slug) return;
    last.current = flavor.slug;
    const r = box.current?.getBoundingClientRect();
    startFlood(flavor, r ? r.width / 2 : 0, r ? r.height / 2 : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flavor.slug]);

  // Keep the active chip visible inside the horizontal rail.
  useEffect(() => {
    const r = rail.current;
    const on = r?.querySelector<HTMLElement>('button[aria-pressed="true"]');
    if (!r || !on) return;
    const left = on.offsetLeft - (r.clientWidth - on.offsetWidth) / 2;
    r.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [flavor.slug, line.slug]);

  function startFlood(f: Flavor, x: number, y: number) {
    if (flood) setBase({ color: flood.color, accent: flood.accent });
    const el = box.current;
    const w = el?.clientWidth ?? 0;
    const h = el?.clientHeight ?? 0;
    // Radius that reaches the farthest corner.
    const r = Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) + 40;
    setFlood({ key: ++n.current, color: f.color, accent: f.accent, x, y, r });
  }

  const pick = (f: Flavor, e: MouseEvent<HTMLButtonElement>) => {
    if (f.slug === flavor.slug) return;
    const r = box.current!.getBoundingClientRect();
    const b = e.currentTarget.getBoundingClientRect();
    last.current = f.slug;
    startFlood(f, b.left + b.width / 2 - r.left, b.top + b.height / 2 - r.top);
    onSelect(f);
  };

  const img = imageMode === "alt" && flavor.alt ? flavor.alt : flavor.image;
  const tall = line.slug === "diamond-sauce" || (imageMode === "alt" && line.slug === "bitez");

  return (
    <section ref={box} className={cn("grain relative isolate overflow-hidden", className)}>
      {/* color layers: the base crossfades, the flood is a small circle scaled up (GPU only) */}
      <AnimatePresence initial={false}>
        <motion.div
          key={base.color + base.accent}
          className="absolute inset-0 -z-20"
          style={{ background: `radial-gradient(120% 90% at 70% 30%, ${base.accent}, ${base.color} 60%)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <AnimatePresence>
          {flood && (
            <motion.div
              key={flood.key}
              className="absolute size-[200px] rounded-full will-change-transform"
              style={{ left: flood.x - 100, top: flood.y - 100, background: flood.color }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: flood.r / 100 }}
              exit={{ opacity: 0, transition: { duration: 0.45 } }}
              transition={{ duration: 0.75, ease: [0.6, 0, 0.2, 1] }}
              onAnimationComplete={() => {
                setBase({ color: flood.color, accent: flood.accent });
                setFlood(f => (f && f.key === flood.key ? null : f));
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="halftone pointer-events-none absolute -right-20 -top-20 -z-10 size-[420px] rounded-full text-black/15 [mask-image:radial-gradient(circle,black,transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
        {header}

        <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* giant name behind the product */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-[1] -translate-y-1/2 overflow-hidden lg:left-[38%]">
            <AnimatePresence mode="popLayout">
              <motion.p
                key={flavor.slug}
                className="font-display whitespace-nowrap text-center text-[26vw] leading-none text-white/15 lg:text-[15vw]"
                initial={{ x: 120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -120, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {flavor.name.split(" ")[0]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={flavor.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-ink/70">{line.kicker}</p>
                <h3 className="font-display sticker mt-2 text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.9] text-white">
                  {flavor.name}
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <TypeBadge type={flavor.type} />
                  {line.stats.slice(0, 2).map(s => (
                    <span
                      key={s.label}
                      className="rounded-full border-2 border-ink bg-cream px-3 py-0.5 text-sm font-bold text-ink"
                    >
                      {s.value} <span className="font-medium text-ink/60">{s.label.toLowerCase()}</span>
                    </span>
                  ))}
                </div>
                {showLink && (
                  <Link
                    href={`/products/${line.slug}?flavor=${flavor.slug}`}
                    className="font-display mt-7 inline-flex items-center gap-2 rounded-2xl border-[3px] border-ink bg-ink px-6 py-3.5 text-xl text-cream shadow-[5px_5px_0_rgba(255,255,255,0.8)] transition-transform hover:-translate-y-1 hover:rotate-[-1deg]"
                  >
                    See {line.short} <ArrowUpRight className="size-5" />
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <Tilt className={cn("relative", tall ? "h-[min(56vh,520px)]" : "h-[min(48vh,460px)]")}>
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={img}
                  src={img}
                  alt={`${line.short} ${flavor.name}`}
                  className={cn(
                    "drop-glow mx-auto h-full w-auto object-contain",
                    line.slug === "bitez" && imageMode === "main" && "rounded-[18px] border-[3px] border-ink",
                  )}
                  initial={{ y: 120, rotate: -14, scale: 0.6, opacity: 0 }}
                  animate={{ y: 0, rotate: line.slug === "bitez" && imageMode === "main" ? -4 : 0, scale: 1, opacity: 1 }}
                  exit={{ y: -80, rotate: 12, scale: 0.7, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 170, damping: 16 }}
                  draggable={false}
                />
              </AnimatePresence>
            </Tilt>
          </div>
        </div>

        {/* chips */}
        <div ref={rail} className="no-scrollbar relative -mx-5 mt-8 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8">
          <div className="flex w-max gap-2.5">
            {line.flavors.map(f => {
              const on = f.slug === flavor.slug;
              return (
                <button
                  key={f.slug}
                  type="button"
                  onClick={e => pick(f, e)}
                  aria-pressed={on}
                  className={cn(
                    "flex items-center gap-2.5 rounded-2xl border-[3px] border-ink py-1.5 pl-1.5 pr-4 text-left transition-all",
                    on ? "bg-ink text-cream shadow-none" : "bg-cream text-ink shadow-[3px_3px_0_#0b0b10] hover:-translate-y-0.5",
                  )}
                >
                  <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl" style={{ background: f.color }}>
                    <img src={f.image} alt="" loading="lazy" className="h-10 w-auto object-contain" />
                  </span>
                  <span className="whitespace-nowrap text-sm font-bold leading-tight">
                    {f.name}
                    {f.type && <span className={cn("block text-xs font-semibold", on ? "text-cream/60" : "text-ink/55")}>{f.type}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
