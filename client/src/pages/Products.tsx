import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ALL_FLAVORS, BRAND, LINES } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { TypeBadge } from "@/components/FlavorLab";
import { Goo } from "@/components/Goo";
import { PopWords, Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Tilt";

const TYPES = ["All", "Sativa", "Indica", "Hybrid"] as const;

export default function Products() {
  const [line, setLine] = useState<string>("all");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");

  const list = useMemo(
    () =>
      ALL_FLAVORS.filter(f => (line === "all" || f.line.slug === line) && (type === "All" || f.type === type)),
    [line, type],
  );
  const typesOff = line === "bitez";

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Goo colors={BRAND} className="absolute inset-0 -z-10 opacity-40" count={6} size={0.18} />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_30%,transparent,#0b0b10_80%)]" />
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-36 sm:px-8 sm:pt-40">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-sun">Products</p>
          <h1 className="font-display mt-3 text-[clamp(3rem,10vw,8rem)] leading-[0.85]">
            <PopWords text="The Krush" className="block" />
            <PopWords text="lineup." className="rainbow-text block" />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream/70 sm:text-xl">
            Gummies, flower and sauce. Pick a line to dive into flavors, specs and formats.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-8 lg:grid-cols-3">
        {LINES.map((l, i) => (
          <Reveal key={l.slug} delay={i * 0.08}>
            <Link
              href={`/products/${l.slug}`}
              className="group relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-[2rem] border-4 border-ink p-6 text-ink sm:p-7"
              style={{ background: `linear-gradient(165deg, ${l.accent}, ${l.color} 70%)` }}
            >
              <div className="halftone pointer-events-none absolute -right-10 -top-10 size-60 rounded-full text-black/15 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
              <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-ink/70">{l.kicker}</p>
              <h2 className="font-display sticker relative mt-1 text-6xl leading-[0.9] text-white">{l.short}</h2>
              <p className="relative mt-3 font-semibold">{l.tagline}</p>
              <Tilt className="relative my-4 h-64 flex-1">
                <img
                  src={l.hero}
                  alt={l.name}
                  loading="lazy"
                  className="drop-glow mx-auto h-full max-h-80 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </Tilt>
              <div className="relative grid grid-cols-3 gap-2">
                {l.stats.map(s => (
                  <div key={s.label} className="flex flex-col justify-center rounded-xl border-[3px] border-ink bg-cream p-2 text-center">
                    <p className={cn("font-display leading-none", s.value.length > 6 ? "whitespace-pre-line text-base" : "text-2xl")}>{s.value}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase leading-tight text-ink/60">{s.label}</p>
                  </div>
                ))}
              </div>
              <span className="font-display relative mt-4 inline-flex items-center justify-between rounded-2xl border-[3px] border-ink bg-ink px-5 py-3 text-xl text-cream">
                Explore {l.short}
                <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
              </span>
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-8">
        <Reveal>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.9]">Every flavor</h2>
          <p className="mt-3 text-cream/65">{ALL_FLAVORS.length} flavors. Filter by line or strain type.</p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {[{ slug: "all", short: "All lines", color: "#fff7ee" }, ...LINES].map(l => (
              <button
                key={l.slug}
                type="button"
                onClick={() => {
                  setLine(l.slug);
                  if (l.slug === "bitez") setType("All");
                }}
                aria-pressed={line === l.slug}
                className={cn(
                  "whitespace-nowrap rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors",
                  line === l.slug ? "border-transparent text-ink" : "border-white/15 text-cream/80 hover:border-white/40",
                )}
                style={line === l.slug ? { background: l.color } : undefined}
              >
                {l.short}
              </button>
            ))}
          </div>
          <div className={cn("flex gap-2 transition-opacity", typesOff && "pointer-events-none opacity-30")}>
            {TYPES.map(t => (
              <button
                key={t}
                type="button"
                disabled={typesOff}
                onClick={() => setType(t)}
                aria-pressed={type === t}
                className={cn(
                  "rounded-full border-2 px-3.5 py-2 text-sm font-bold transition-colors",
                  type === t ? "border-cream bg-cream text-ink" : "border-white/15 text-cream/80 hover:border-white/40",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {list.map(f => (
              <motion.div
                key={`${f.line.slug}-${f.slug}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
              >
                <Link
                  href={`/products/${f.line.slug}?flavor=${f.slug}`}
                  className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[1.4rem] border-[3px] border-ink p-2.5"
                  style={{ background: `linear-gradient(160deg, ${f.accent}, ${f.color})` }}
                >
                  <img
                    src={f.image}
                    alt={`${f.line.short} ${f.name}`}
                    loading="lazy"
                    className={cn(
                      "drop-glow absolute left-1/2 top-[7%] h-[60%] w-auto -translate-x-1/2 object-contain transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110",
                      f.line.slug === "bitez" && "top-[10%] h-[50%] rounded-lg border-2 border-ink",
                    )}
                  />
                  <div className="relative rounded-xl bg-cream p-2 text-ink">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ink/55">{f.line.short}</p>
                    <p className="font-display text-lg leading-tight sm:text-xl">{f.name}</p>
                    {f.type && <TypeBadge type={f.type} className="mt-1 !border px-2 !text-xs !leading-5" />}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="mt-8 text-cream/60">No flavors match that filter.</p>}
      </section>
    </>
  );
}
