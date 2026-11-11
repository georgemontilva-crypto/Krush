import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, BadgeCheck, FlaskConical, Hand, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { ALL_FLAVORS, BRAND, LINES, type Flavor, type Line } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { FlavorLab } from "@/components/FlavorLab";
import { Goo } from "@/components/Goo";
import { Logo } from "@/components/Logo";
import { Marquee } from "@/components/Marquee";
import { PopWords, Reveal } from "@/components/Reveal";
import { SplashZone } from "@/components/Splash";
import { Tilt } from "@/components/Tilt";

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yLogo = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yA = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref}>
      <SplashZone className="relative isolate min-h-[100svh] overflow-hidden">
        <Goo colors={BRAND} className="absolute inset-0 -z-10 opacity-[0.55]" count={8} size={0.15} />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_45%,transparent,#0b0b10_85%)]" />
        <div className="grain absolute inset-0 -z-10" />

        <motion.div style={{ opacity: fade }} className="mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-5 pb-16 pt-28 text-center sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-cream/80 backdrop-blur"
          >
            Premium Hemp · Est. for 21+
          </motion.p>

          <div className="relative mt-6 w-full max-w-5xl">
            {/* floating products */}
            <motion.img
              style={{ y: yA }}
              src="/products/bitez/display-blue-razz.webp"
              alt="Krush Bitez 60CT display"
              className="float-y drop-glow absolute -left-2 top-[8%] hidden w-[17%] -rotate-12 md:block"
              initial={{ opacity: 0, x: -80, rotate: -30 }}
              animate={{ opacity: 1, x: 0, rotate: -12 }}
              transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.5 }}
            />
            <motion.img
              style={{ y: yB }}
              src="/products/flower/rainbow-gelato.webp"
              alt="Krush Premium Flower jar"
              className="drop-glow absolute -right-4 top-[2%] hidden w-[22%] rotate-[10deg] md:block"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.65 }}
            />
            <motion.img
              style={{ y: yC }}
              src="/products/sauce/rainbow-z.webp"
              alt="Krush Diamond Sauce syringe"
              className="float-y drop-glow absolute bottom-[-14%] left-[16%] hidden w-[7%] rotate-[16deg] [animation-delay:-2s] md:block"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.8 }}
            />

            <motion.div style={{ y: yLogo }}>
              <motion.div
                initial={{ scale: 0.2, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 11, delay: 0.1 }}
                whileHover={{ scale: 1.06, rotate: -2 }}
                whileTap={{ scale: 0.88 }}
                className="mx-auto w-[min(86vw,520px)] cursor-pointer"
              >
                <Logo eager className="wobble w-full drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]" />
              </motion.div>
            </motion.div>
          </div>

          <h1 className="font-display mt-6 text-[clamp(2.4rem,7vw,5.6rem)] leading-[0.92]">
            <PopWords text="Flavor that hits" className="block" />
            <PopWords text="like a splash." className="rainbow-text block" />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-5 max-w-xl text-lg text-cream/75 sm:text-xl"
          >
            Bitez gummies, premium hemp flower and diamond sauce. Thirty loud flavors, one name to remember.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/products"
              className="font-display inline-flex items-center gap-2 rounded-2xl border-[3px] border-ink bg-sun px-7 py-4 text-xl text-ink shadow-[5px_5px_0_#ff2d95] transition-transform hover:-translate-y-1 hover:rotate-[-1.5deg]"
            >
              Explore products <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/about"
              className="font-display inline-flex items-center gap-2 rounded-2xl border-[3px] border-cream/80 px-7 py-4 text-xl text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Our story
            </Link>
          </motion.div>

          {/* mobile product row */}
          <div className="mt-10 flex items-end justify-center gap-3 md:hidden">
            <img src="/products/bitez/display-peach-mango.webp" alt="" className="drop-glow h-40 w-auto -rotate-6" />
            <img src="/products/flower/midnight-runtz.webp" alt="" className="drop-glow h-36 w-auto" />
            <img src="/products/sauce/candyland.webp" alt="" className="drop-glow h-40 w-auto rotate-6" />
          </div>

          <p className="mt-8 hidden text-xs font-semibold uppercase tracking-[0.3em] text-cream/40 sm:block">
            Tap anywhere to get Krushed
          </p>
        </motion.div>
      </SplashZone>
    </div>
  );
}

function CrossBands() {
  const names = ALL_FLAVORS.map(f => f.name);
  return (
    <div className="relative z-10 -my-6 py-12">
      <Marquee
        items={names.slice(0, 15)}
        className="font-display -rotate-3 scale-105 border-y-4 border-ink bg-pink py-3 text-2xl text-white sm:text-4xl"
        speed={55}
      />
      <Marquee
        items={names.slice(15)}
        reverse
        className="font-display -mt-4 rotate-2 scale-105 border-y-4 border-ink bg-sun py-3 text-2xl text-ink sm:text-4xl"
        speed={60}
      />
    </div>
  );
}

function LineCard({ line, i }: { line: Line; i: number }) {
  const picks = line.flavors.slice(1, 3);
  return (
    <div className="lg:sticky" style={{ top: `${96 + i * 22}px` }}>
      <div
        className="grain relative overflow-hidden rounded-[2rem] border-4 border-ink shadow-[0_-20px_60px_rgba(0,0,0,0.45)] sm:rounded-[2.5rem]"
        style={{ background: `linear-gradient(135deg, ${line.color}, ${line.accent})` }}
      >
        <div className="halftone pointer-events-none absolute -bottom-10 -left-10 size-72 rounded-full text-black/15 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
        <div className="grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div className="text-ink">
            <p className="font-display text-lg text-ink/70">0{i + 1} · {line.kicker}</p>
            <h3 className="font-display sticker mt-1 text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.88] text-white">{line.short}</h3>
            <p className="mt-4 max-w-md text-lg font-semibold sm:text-xl">{line.tagline}</p>
            <div className="mt-6 grid max-w-md grid-cols-3 gap-2">
              {line.stats.map(s => (
                <div key={s.label} className="rounded-2xl border-[3px] border-ink bg-cream p-3 text-center">
                  <p className="font-display text-3xl leading-none sm:text-4xl">{s.value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase leading-tight text-ink/60">{s.label}</p>
                </div>
              ))}
            </div>
            <Link
              href={`/products/${line.slug}`}
              className="font-display mt-7 inline-flex items-center gap-2 rounded-2xl border-[3px] border-ink bg-ink px-6 py-3.5 text-xl text-cream transition-transform hover:-translate-y-1"
            >
              Explore {line.short} <ArrowUpRight className="size-5" />
            </Link>
          </div>
          <Tilt className="relative h-[300px] sm:h-[420px]">
            <div className="relative flex h-full items-end justify-center">
              <img src={picks[0].image} alt="" loading="lazy" className={cn("drop-glow absolute bottom-2 left-[6%] h-[62%] w-auto -rotate-12 object-contain", line.slug === "bitez" && "!h-[34%] rounded-xl border-[3px] border-ink")} />
              <img src={line.hero} alt={line.name} loading="lazy" className="drop-glow relative z-10 h-full w-auto object-contain" />
              <img src={picks[1].image} alt="" loading="lazy" className={cn("drop-glow absolute bottom-2 right-[6%] h-[62%] w-auto rotate-12 object-contain", line.slug === "bitez" && "!h-[34%] rounded-xl border-[3px] border-ink")} />
            </div>
          </Tilt>
        </div>
      </div>
    </div>
  );
}

function Lines() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-8">
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-pink">The lineup</p>
        <h2 className="font-display mt-2 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.9]">
          Three ways <span className="rainbow-text">to Krush.</span>
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-8 pb-10">
        {LINES.map((l, i) => (
          <LineCard key={l.slug} line={l} i={i} />
        ))}
      </div>
    </section>
  );
}

function Lab() {
  const [lineSlug, setLineSlug] = useState(LINES[0].slug);
  const line = LINES.find(l => l.slug === lineSlug)!;
  const [picked, setPicked] = useState<Record<string, Flavor>>({});
  const flavor = picked[line.slug] ?? line.flavors[0];

  return (
    <div className="mt-16 px-3 sm:px-5">
      <FlavorLab
        line={line}
        flavor={flavor}
        onSelect={f => setPicked(p => ({ ...p, [line.slug]: f }))}
        className="rounded-[2rem] border-4 border-ink sm:rounded-[2.75rem]"
        header={
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-ink/70">
                <Sparkles className="size-4" /> Flavor lab
              </p>
              <h2 className="font-display sticker mt-1 text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.9] text-white">Pick your Krush</h2>
            </div>
            <div className="flex w-full rounded-2xl border-[3px] border-ink bg-cream p-1 sm:w-auto" role="tablist">
              {LINES.map(l => (
                <button
                  key={l.slug}
                  type="button"
                  role="tab"
                  aria-selected={l.slug === lineSlug}
                  onClick={() => setLineSlug(l.slug)}
                  className={cn(
                    "relative flex-1 rounded-xl px-3 py-2.5 text-sm font-bold sm:flex-none sm:px-5 sm:text-base",
                    l.slug === lineSlug ? "text-cream" : "text-ink",
                  )}
                >
                  {l.slug === lineSlug && (
                    <motion.span layoutId="lab-tab" className="absolute inset-0 rounded-xl bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative whitespace-nowrap">{l.short}</span>
                </button>
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
}

const PROMISES = [
  { icon: FlaskConical, title: "Lab tested", text: "Every pack carries a QR code that links to its batch lab report.", color: "#3d8bff" },
  { icon: Hand, title: "Hand trimmed", text: "Our flower is hand trimmed and cured in small batches.", color: "#2bd96b" },
  { icon: ShieldCheck, title: "Child resistant", text: "Resealable, child-resistant packaging on every product.", color: "#ff8a1f" },
  { icon: Leaf, title: "100% hemp", text: "Premium hemp, no pesticides, Farm Bill compliant.", color: "#8b3dff" },
];

function Promises() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-sun">Loud outside, clean inside</p>
          <h2 className="font-display mt-2 text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.9]">Big flavor. No shortcuts.</h2>
          <p className="mt-5 max-w-md text-lg text-cream/70">
            The packaging is a party. What goes in it is serious: tested, measured and sealed so every serving matches
            the label.
          </p>
          <div className="mt-8 flex items-baseline gap-4">
            <span className="font-display rainbow-text text-8xl leading-none sm:text-9xl">30</span>
            <span className="font-display text-2xl leading-tight text-cream/80">flavors across<br />three lines</span>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ rotate: i % 2 ? 2 : -2, y: -6 }}
                className="h-full rounded-[1.75rem] border-[3px] border-ink bg-cream p-6 text-ink shadow-[6px_6px_0_var(--c)]"
                style={{ ["--c" as string]: p.color }}
              >
                <span className="grid size-14 place-items-center rounded-2xl border-[3px] border-ink" style={{ background: p.color }}>
                  <p.icon className="size-7 text-white" strokeWidth={2.5} />
                </span>
                <h3 className="font-display mt-5 text-3xl">{p.title}</h3>
                <p className="mt-2 text-ink/70">{p.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Wall() {
  const row = (items: typeof ALL_FLAVORS) =>
    items.map(f => (
      <Link
        key={`${f.line.slug}-${f.slug}`}
        href={`/products/${f.line.slug}?flavor=${f.slug}`}
        className="group relative mx-2 flex h-56 w-44 shrink-0 flex-col items-center justify-end overflow-hidden rounded-[1.5rem] border-[3px] border-ink p-3 sm:h-64 sm:w-52"
        style={{ background: `linear-gradient(160deg, ${f.accent}, ${f.color})` }}
      >
        <img
          src={f.image}
          alt={`${f.line.short} ${f.name}`}
          loading="lazy"
          className={cn(
            "drop-glow absolute top-4 h-[62%] w-auto object-contain transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:rotate-[-4deg]",
            f.line.slug === "bitez" && "h-[52%] rounded-lg border-2 border-ink",
          )}
        />
        <span className="relative w-full rounded-xl bg-ink/85 px-2 py-1.5 text-center text-xs font-bold text-cream backdrop-blur">
          {f.name}
          <span className="block text-[10px] font-semibold uppercase tracking-widest text-cream/55">{f.line.short}</span>
        </span>
      </Link>
    ));
  const a = ALL_FLAVORS.filter((_, i) => i % 2 === 0);
  const b = ALL_FLAVORS.filter((_, i) => i % 2 === 1);
  return (
    <section className="pt-28">
      <Reveal className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.9]">
          The wall <span className="outline-text [-webkit-text-stroke-color:var(--color-sun)]">of flavor</span>
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="overflow-hidden">
          <div className="marquee flex w-max hover:[animation-play-state:paused]" style={{ ["--speed" as string]: "70s" }}>
            {row(a)}
            {row(a)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee marquee-rev flex w-max hover:[animation-play-state:paused]" style={{ ["--speed" as string]: "80s" }}>
            {row(b)}
            {row(b)}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-3 pt-28 sm:px-5">
      <SplashZone className="relative isolate overflow-hidden rounded-[2rem] border-4 border-ink bg-sun sm:rounded-[2.75rem]">
        <Goo colors={["#ff2d95", "#ff8a1f", "#3d8bff", "#8b3dff"]} className="absolute inset-0 -z-10 opacity-80" count={6} size={0.2} />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center sm:py-28">
          <BadgeCheck className="size-12 text-ink" strokeWidth={2.5} />
          <h2 className="font-display sticker mt-4 text-[clamp(3rem,9vw,7rem)] leading-[0.85] text-white">Ready to get Krushed?</h2>
          <p className="mt-5 max-w-lg text-lg font-semibold text-ink">Dive into every line, flavor and spec.</p>
          <Link
            href="/products"
            className="font-display mt-8 inline-flex items-center gap-2 rounded-2xl border-[3px] border-ink bg-ink px-8 py-4 text-2xl text-cream shadow-[6px_6px_0_#fff7ee] transition-transform hover:-translate-y-1 hover:rotate-[-1deg]"
          >
            See all products <ArrowRight className="size-6" />
          </Link>
        </div>
      </SplashZone>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <CrossBands />
      <Lines />
      <Lab />
      <Promises />
      <Wall />
      <FinalCta />
    </>
  );
}
