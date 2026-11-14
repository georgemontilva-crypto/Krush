import { motion } from "motion/react";
import { CheckCircle2, Download, FileText, FlaskConical, QrCode, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { useSearch } from "wouter";
import { BRAND, LINES, type Flavor, type Line } from "@/lib/catalog";
import { cn, formatDate } from "@/lib/utils";
import { TypeBadge } from "@/components/FlavorLab";
import { Goo } from "@/components/Goo";
import { PopWords, Reveal } from "@/components/Reveal";

function ReportCard({ line, flavor, highlight }: { line: Line; flavor: Flavor; highlight: boolean }) {
  const lab = flavor.lab!;
  return (
    <div
      id={`coa-${flavor.slug}`}
      className={cn(
        "flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[1.75rem] border-[3px] border-ink bg-cream text-ink transition-shadow",
        highlight ? "shadow-[6px_6px_0_#ffe11a] ring-4 ring-sun" : "shadow-[6px_6px_0_rgba(255,255,255,0.15)]",
      )}
    >
      <div
        className="relative flex h-44 items-end justify-between overflow-hidden border-b-[3px] border-ink p-4"
        style={{ background: `linear-gradient(150deg, ${flavor.accent}, ${flavor.color})` }}
      >
        <div className="relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/70">{line.short}</p>
          <h3 className="font-display sticker text-3xl leading-[0.95] text-white">{flavor.name}</h3>
          <TypeBadge type={flavor.type} className="mt-2 !text-xs !leading-5" />
        </div>
        <img
          src={flavor.image}
          alt=""
          loading="lazy"
          className="drop-glow absolute -bottom-3 right-3 h-[120%] w-auto rotate-12 object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-lime/20 px-3 py-1 text-sm font-bold text-[#11823f]">
          <CheckCircle2 className="size-4" /> All panels passed
        </span>
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Batch</dt>
            <dd className="font-bold">{lab.batch}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Tested</dt>
            <dd className="font-bold">{formatDate(lab.tested)}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Total cannabinoids</dt>
            <dd className="font-bold">{lab.totalCannabinoids}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Lab</dt>
            <dd className="font-bold">{lab.lab}</dd>
          </div>
        </dl>
        <div className="mt-auto flex gap-2 pt-5">
          <a
            href={lab.file}
            target="_blank"
            rel="noopener"
            className="font-display inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-[3px] border-ink bg-ink px-4 py-2.5 text-lg text-cream transition-transform hover:-translate-y-0.5"
          >
            <FileText className="size-5" /> View report
          </a>
          <a
            href={lab.file}
            download
            aria-label={`Download ${flavor.name} lab report`}
            className="grid size-12 shrink-0 place-items-center rounded-xl border-[3px] border-ink bg-sun transition-transform hover:-translate-y-0.5"
          >
            <Download className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LabReports() {
  const search = useSearch();
  const wanted = new URLSearchParams(search).get("flavor");

  // Deep link from a product page: jump to that report.
  useEffect(() => {
    if (!wanted) return;
    const t = window.setTimeout(() => {
      document.getElementById(`coa-${wanted}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 350);
    return () => window.clearTimeout(t);
  }, [wanted]);

  const live = LINES.filter(l => l.flavors.some(f => f.lab));
  const soon = LINES.filter(l => !l.flavors.some(f => f.lab));

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Goo colors={BRAND} className="absolute inset-0 -z-10 opacity-45" count={7} size={0.17} />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_40%,transparent,#0b0b10_85%)]" />
        <div className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-14 pt-36 text-center sm:px-8 sm:pt-40">
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 12 }}
            className="grid size-20 place-items-center rounded-3xl border-4 border-ink bg-sky shadow-[6px_6px_0_#fff7ee]"
          >
            <FlaskConical className="size-10 text-white" strokeWidth={2.5} />
          </motion.span>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-sun">Lab reports</p>
          <h1 className="font-display mt-3 text-[clamp(3rem,10vw,8rem)] leading-[0.85]">
            <PopWords text="Tested." className="block" />
            <PopWords text="Verified." className="rainbow-text block" />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-xl text-lg text-cream/75 sm:text-xl"
          >
            Every KRUSH batch goes to a third-party lab. Find your product, match the batch number on your pack and
            open the full certificate of analysis.
          </motion.p>
        </div>
      </section>

      {live.map(line => (
        <section key={line.slug} id={line.slug} className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-6 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em]" style={{ color: line.color }}>
                {line.kicker}
              </p>
              <h2 className="font-display mt-1 text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.9]">{line.short}</h2>
            </div>
            <p className="text-cream/60">
              {line.flavors.filter(f => f.lab).length} certificates · ACS Laboratory
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {line.flavors
              .filter(f => f.lab)
              .map((f, i) => (
                <Reveal key={f.slug} delay={(i % 3) * 0.06} className="h-full">
                  <ReportCard line={line} flavor={f} highlight={f.slug === wanted} />
                </Reveal>
              ))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <Reveal>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.9]">More reports coming soon</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {soon.map((l, i) => (
            <Reveal key={l.slug} delay={i * 0.08}>
              <div
                className="relative flex h-60 flex-col justify-between overflow-hidden rounded-[2rem] border-4 border-ink p-6"
                style={{ background: `linear-gradient(160deg, ${l.accent}, ${l.color})` }}
              >
                <div className="relative z-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/70">{l.kicker}</p>
                  <h3 className="font-display sticker mt-1 text-5xl leading-[0.95] text-white">{l.short}</h3>
                </div>
                <span className="font-display relative z-10 w-fit -rotate-3 rounded-xl border-[3px] border-ink bg-cream px-3 py-1 text-lg text-ink">
                  Coming soon
                </span>
                <img
                  src={l.hero}
                  alt={l.name}
                  loading="lazy"
                  className={cn(
                    "drop-glow absolute right-4 w-auto object-contain",
                    l.slug === "bitez" ? "top-4 h-[85%]" : "-bottom-6 h-[115%]",
                  )}
                />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 text-center text-cream/60 sm:flex-row">
          <span className="flex items-center gap-2">
            <QrCode className="size-5 shrink-0 text-sun" /> You can also scan the QR code on any pack.
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-5 shrink-0 text-lime" /> Every batch is lab tested before it ships.
          </span>
        </Reveal>
      </section>
    </>
  );
}
