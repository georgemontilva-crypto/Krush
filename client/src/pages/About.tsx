import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Candy, FlaskConical, PackageCheck, Sprout } from "lucide-react";
import { useRef } from "react";
import { Link } from "wouter";
import { BRAND, LINES } from "@/lib/catalog";
import { Goo } from "@/components/Goo";
import { Logo } from "@/components/Logo";
import { Marquee } from "@/components/Marquee";
import { PopWords, Reveal } from "@/components/Reveal";

const VALUES = [
  { n: "01", title: "Flavor first", text: "If it doesn't taste incredible, it doesn't ship. Every Krush flavor is built to be loud from the first bite or the first pull.", color: "#ff2d95", rot: -3 },
  { n: "02", title: "Tested, always", text: "Every batch is lab tested, and the report is a QR scan away on the pack. No guessing, no fine print.", color: "#3d8bff", rot: 2 },
  { n: "03", title: "Small-batch craft", text: "Hand-trimmed flower, measured gummies, precise syringes. Small batches keep the quality where we want it.", color: "#2bd96b", rot: -2 },
  { n: "04", title: "Adults only, done right", text: "Child-resistant packaging, clear labeling and 21+ only. Fun brand, responsible product.", color: "#ff8a1f", rot: 3 },
];

const STEPS = [
  { icon: Sprout, title: "Source", text: "Premium hemp, grown without pesticides and compliant with the 2018 Farm Bill." },
  { icon: Candy, title: "Craft", text: "Gummies dosed by the milligram, flower hand trimmed, sauce packed into precise 3ML syringes." },
  { icon: FlaskConical, title: "Test", text: "Each batch is lab tested and gets its own batch number, so you can trace what you hold." },
  { icon: PackageCheck, title: "Seal", text: "Child-resistant, tamper-evident packaging with the lab report one scan away." },
];

function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const words =
    "KRUSH was born from a simple idea: hemp should be as fun to look at as it is to enjoy. So we packed bold flavor into every gummy, every jar and every syringe, and wrapped it in color you can't miss.".split(
      " ",
    );
  return (
    <section ref={ref} className="mx-auto max-w-5xl px-5 py-28 sm:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-pink">Our story</p>
      <p className="font-display mt-4 text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.05]">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </p>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const hot = /color|fun|flavor|KRUSH/i.test(children);
  return (
    <motion.span style={{ opacity }} className={hot ? "rainbow-text" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

export default function About() {
  return (
    <>
      <div className="relative isolate overflow-hidden">
        <Goo colors={BRAND} className="absolute inset-0 -z-10 opacity-50" count={7} size={0.17} />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_40%,transparent,#0b0b10_85%)]" />
        <div className="mx-auto flex min-h-[86svh] max-w-6xl flex-col items-center justify-center px-5 pb-16 pt-32 text-center sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold uppercase tracking-[0.25em] text-sun"
          >
            About us
          </motion.p>
          <h1 className="font-display mt-4 text-[clamp(3.2rem,11vw,9rem)] leading-[0.85]">
            <PopWords text="We don't" className="block" />
            <PopWords text="do quiet." className="rainbow-text block" />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-7 max-w-2xl text-lg text-cream/75 sm:text-xl"
          >
            KRUSH is a premium hemp brand built around flavor, color and quality you can verify. Three product lines,
            thirty flavors, and zero boring days.
          </motion.p>
        </div>
      </div>

      <Marquee
        items={["Flavor first", "Lab tested", "Small batch", "21+ only", "Hand trimmed", "Child resistant"]}
        className="font-display -rotate-2 border-y-4 border-ink bg-grape py-3 text-2xl text-white sm:text-4xl"
        speed={45}
      />

      <Story />

      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.9]">What we stand for</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.n} delay={i * 0.08}>
              <motion.div
                initial={{ rotate: 0 }}
                whileInView={{ rotate: v.rot }}
                whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                className="flex h-full flex-col rounded-[1.75rem] border-[3px] border-ink p-6 text-ink shadow-[6px_6px_0_#fff7ee]"
                style={{ background: v.color }}
              >
                <span className="font-display text-6xl leading-none text-white/90 sticker">{v.n}</span>
                <h3 className="font-display mt-6 text-3xl leading-none">{v.title}</h3>
                <p className="mt-3 font-medium text-ink/80">{v.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-lime">How it's made</p>
            <h2 className="font-display mt-2 text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9]">From hemp to your hand.</h2>
            <Logo className="mt-8 hidden w-56 -rotate-6 lg:block" />
          </Reveal>
          <ol className="relative grid gap-5 border-l-4 border-dashed border-white/15 pl-6 sm:pl-10">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={0.05}>
                <li className="relative rounded-[1.75rem] border border-white/10 bg-ink-2 p-6 sm:p-8">
                  <span
                    className="absolute -left-[46px] top-8 grid size-10 place-items-center rounded-full border-[3px] border-ink font-display text-lg text-ink sm:-left-[62px] sm:size-12"
                    style={{ background: BRAND[i] }}
                  >
                    {i + 1}
                  </span>
                  <s.icon className="size-9" style={{ color: BRAND[i] }} strokeWidth={2.2} />
                  <h3 className="font-display mt-4 text-4xl">{s.title}</h3>
                  <p className="mt-2 max-w-lg text-lg text-cream/70">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-8">
        <Reveal>
          <h2 className="font-display text-center text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.9]">Meet the family</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {LINES.map((l, i) => (
            <Reveal key={l.slug} delay={i * 0.08}>
              <Link
                href={`/products/${l.slug}`}
                className="group relative flex h-[420px] flex-col justify-between overflow-hidden rounded-[2rem] border-4 border-ink p-6"
                style={{ background: `linear-gradient(160deg, ${l.accent}, ${l.color})` }}
              >
                <div className="relative z-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/70">{l.kicker}</p>
                  <h3 className="font-display sticker mt-1 text-5xl text-white">{l.short}</h3>
                </div>
                <img
                  src={l.hero}
                  alt={l.name}
                  loading="lazy"
                  className="drop-glow absolute bottom-6 left-1/2 h-[66%] w-auto -translate-x-1/2 object-contain transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-[-5deg] group-hover:scale-110"
                />
                <span className="relative z-10 ml-auto grid size-12 place-items-center rounded-full border-[3px] border-ink bg-cream text-ink transition-transform group-hover:rotate-[-45deg]">
                  <ArrowRight className="size-5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
