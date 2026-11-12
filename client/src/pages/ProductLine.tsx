import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, QrCode } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useSearch } from "wouter";
import { LINES, lineBySlug, type Flavor, type Line } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { FlavorLab } from "@/components/FlavorLab";
import { Reveal } from "@/components/Reveal";
import NotFound from "./NotFound";

const NUTRITION: [string, string, string?][] = [
  ["Serving size", "1 chew (10g)"],
  ["Servings per bag", "2"],
  ["Calories", "90"],
  ["Total fat", "0g", "0%"],
  ["Sodium", "7.5mg"],
  ["Total carbohydrate", "12g", "9%"],
  ["Sugars", "6g (6g added)", "12%"],
  ["Protein", "1g"],
  ["Cannabinoids", "500MG D9 + CBD + CBN per chew"],
];

function Accordion({ title, children, open: start }: { title: string; children: ReactNode; open?: boolean }) {
  const [open, setOpen] = useState(!!start);
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-ink-2">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
      >
        <span className="font-display text-2xl sm:text-3xl">{title}</span>
        <ChevronDown className={cn("size-6 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-6 text-cream/75 sm:px-7">{children}</div>
      </motion.div>
    </div>
  );
}

function Details({ line }: { line: Line }) {
  if (line.slug === "bitez") {
    return (
      <>
        <Accordion title="Nutrition facts" open>
          <dl className="divide-y divide-white/10 rounded-2xl border border-white/10">
            {NUTRITION.map(([k, v, dv]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-2.5 text-sm sm:text-base">
                <dt className="font-semibold text-cream">{k}</dt>
                <dd className="text-right">
                  {v} {dv && <span className="ml-2 text-cream/45">{dv} DV</span>}
                </dd>
              </div>
            ))}
          </dl>
        </Accordion>
        <Accordion title="Ingredients">
          <p>Corn syrup, cane sugar, water, pectin, citric acid, natural and artificial flavors, sunflower oil.</p>
        </Accordion>
        <Accordion title="Responsible use">
          <ul className="grid gap-2">
            <li>Effects may take up to 2 hours to begin and can last 6–8 hours.</li>
            <li>Do not consume more than 2 gummies in 24 hours. Start low and go slow.</li>
            <li>May cause drowsiness. Do not drive or operate machinery.</li>
            <li>Not for minors, pregnant or nursing individuals, or anyone subject to drug testing.</li>
            <li>Store in the original child-resistant pouch, away from heat, light and humidity.</li>
          </ul>
        </Accordion>
      </>
    );
  }
  if (line.slug === "flower") {
    return (
      <>
        <Accordion title="The craft" open>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Premium flower", "Top shelf", "Hand trimmed", "Small batch"].map((t, i) => (
              <div key={t} className="flex items-center gap-3 rounded-2xl border border-white/10 p-4">
                <span className="grid size-9 place-items-center rounded-full text-ink" style={{ background: ["#ffe11a", "#ff2d95", "#2bd96b", "#3d8bff"][i] }}>
                  <Check className="size-5" strokeWidth={3} />
                </span>
                <span className="font-semibold text-cream">{t}</span>
              </div>
            ))}
          </div>
        </Accordion>
        <Accordion title="Responsible use">
          <ul className="grid gap-2">
            <li>Intended for inhalation only. Not for ingestion. Do not eat.</li>
            <li>Keep out of reach of children and pets.</li>
            <li>Not for use by pregnant or nursing individuals.</li>
            <li>Do not drive or operate machinery after use.</li>
          </ul>
        </Accordion>
      </>
    );
  }
  return (
    <>
      <Accordion title="Strain types" open>
        <div className="grid gap-3 sm:grid-cols-3">
          {(["Sativa", "Indica", "Hybrid"] as const).map(t => (
            <div key={t} className="rounded-2xl border border-white/10 p-4">
              <p className="font-display text-2xl text-cream">{t}</p>
              <p className="mt-1 text-sm">{line.flavors.filter(f => f.type === t).map(f => f.name).join(", ")}</p>
            </div>
          ))}
        </div>
      </Accordion>
      <Accordion title="Responsible use">
        <ul className="grid gap-2">
          <li>For adults 21+ only. Start with a small amount.</li>
          <li>Keep in the child-resistant package, out of reach of children and pets.</li>
          <li>Do not drive or operate machinery after use.</li>
          <li>Not for use by pregnant or nursing individuals.</li>
        </ul>
      </Accordion>
    </>
  );
}

export default function ProductLine({ slug }: { slug: string }) {
  const line = lineBySlug(slug);
  const search = useSearch();
  const wanted = useMemo(() => new URLSearchParams(search).get("flavor"), [search]);
  const [flavor, setFlavor] = useState<Flavor | undefined>(() =>
    line ? line.flavors.find(f => f.slug === wanted) ?? line.flavors[0] : undefined,
  );
  const [mode, setMode] = useState<"main" | "alt">("main");

  useEffect(() => {
    if (!line) return;
    setFlavor(line.flavors.find(f => f.slug === wanted) ?? line.flavors[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, wanted]);

  if (!line || !flavor) return <NotFound />;

  const select = (f: Flavor) => {
    setFlavor(f);
    window.history.replaceState(null, "", `/products/${line.slug}?flavor=${f.slug}`);
  };
  const others = LINES.filter(l => l.slug !== line.slug);

  return (
    <>
      <FlavorLab
        key={line.slug}
        line={line}
        flavor={flavor}
        onSelect={select}
        showLink={false}
        imageMode={mode}
        className="min-h-[100svh] pt-16"
        header={
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link href="/products" className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-4 py-2 text-sm font-bold text-ink transition-transform hover:-translate-x-1">
              <ArrowLeft className="size-4" /> All products
            </Link>
            {line.slug === "bitez" && (
              <div className="flex rounded-full border-2 border-ink bg-cream p-1 text-sm font-bold text-ink">
                {(["main", "alt"] as const).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    className={cn("rounded-full px-4 py-1.5 transition-colors", mode === m && "bg-ink text-cream")}
                  >
                    {m === "main" ? "2CT Pouch" : "60CT Display"}
                  </button>
                ))}
              </div>
            )}
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.25em]" style={{ color: line.color }}>{line.kicker}</p>
            <h1 className="font-display mt-2 text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.9]">{line.name}</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/75">{line.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {line.badges.map(b => (
                <span key={b} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm font-semibold text-cream/85">
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-8 flex items-start gap-4 rounded-[1.5rem] border-[3px] border-ink bg-sun p-5 text-ink">
              <QrCode className="size-10 shrink-0" strokeWidth={2.2} />
              <div>
                <p className="font-display text-2xl leading-none">Lab report on every pack</p>
                <p className="mt-1.5 font-medium text-ink/75">
                  Scan the QR code on your {line.short} packaging to open the lab report for that exact batch.
                </p>
                <Link href="/lab-reports" className="mt-3 inline-flex items-center gap-1 text-sm font-bold underline underline-offset-4">
                  Online lab reports: coming soon <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {line.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={cn("rounded-[1.4rem] border border-white/10 bg-ink-2 p-5", i === line.specs.length - 1 && line.specs.length % 2 === 1 && "col-span-2")}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cream/45">{s.label}</p>
                  <p className="font-display mt-2 text-2xl leading-tight sm:text-[1.7rem]">{s.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <Reveal>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.9]">Formats</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {line.formats.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.08}>
              <div
                className="relative flex h-72 items-center overflow-hidden rounded-[2rem] border-4 border-ink p-7 sm:h-80"
                style={{ background: `linear-gradient(135deg, ${i ? line.accent : line.color}, ${i ? line.color : line.accent})` }}
              >
                <div className="relative z-10 max-w-[55%] text-ink">
                  <h3 className="font-display sticker text-4xl leading-none text-white sm:text-5xl">{f.name}</h3>
                  <p className="mt-3 font-semibold">{f.detail}</p>
                </div>
                <img
                  src={f.image}
                  alt={f.name}
                  loading="lazy"
                  className={cn(
                    "drop-glow absolute w-auto object-contain",
                    line.slug === "bitez" && i === 0
                      ? "right-6 top-1/2 h-[58%] -translate-y-1/2 rotate-6 rounded-xl border-[3px] border-ink"
                      : "bottom-4 right-6 top-4 h-[calc(100%-2rem)]",
                  )}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-4 px-5 pt-24 sm:px-8">
        <Details line={line} />
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <Reveal>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.9]">Keep exploring</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {others.map(l => (
            <Link
              key={l.slug}
              href={`/products/${l.slug}`}
              className="group relative flex h-56 items-end overflow-hidden rounded-[2rem] border-4 border-ink p-6"
              style={{ background: `linear-gradient(135deg, ${l.color}, ${l.accent})` }}
            >
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/70">{l.kicker}</p>
                <p className="font-display sticker text-5xl text-white">{l.short}</p>
              </div>
              <img src={l.hero} alt="" loading="lazy" className="drop-glow absolute -bottom-4 right-4 h-[115%] w-auto object-contain transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-[-4deg]" />
              <ArrowUpRight className="absolute right-5 top-5 size-7 text-ink transition-transform group-hover:rotate-45" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
