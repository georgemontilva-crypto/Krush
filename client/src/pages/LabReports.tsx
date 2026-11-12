import { motion } from "motion/react";
import { FlaskConical, QrCode, ShieldCheck } from "lucide-react";
import { BRAND, LINES } from "@/lib/catalog";
import { Goo } from "@/components/Goo";
import { PopWords, Reveal } from "@/components/Reveal";

export default function LabReports() {
  return (
    <>
      <div className="relative isolate overflow-hidden">
        <Goo colors={BRAND} className="absolute inset-0 -z-10 opacity-50" count={7} size={0.17} />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_40%,transparent,#0b0b10_85%)]" />
        <div className="mx-auto flex min-h-[88svh] max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-32 text-center sm:px-8">
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 12 }}
            className="grid size-20 place-items-center rounded-3xl border-4 border-ink bg-sky shadow-[6px_6px_0_#fff7ee]"
          >
            <FlaskConical className="size-10 text-white" strokeWidth={2.5} />
          </motion.span>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-sun">Lab reports</p>
          <h1 className="font-display mt-3 text-[clamp(3.2rem,12vw,9.5rem)] leading-[0.85]">
            <PopWords text="Coming" className="block" />
            <PopWords text="soon." className="rainbow-text block" />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-7 max-w-xl text-lg text-cream/75 sm:text-xl"
          >
            Batch-by-batch lab results for every KRUSH product will live right here. We're putting the final touches on
            it.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 160, damping: 14 }}
            className="mt-9 flex max-w-lg items-start gap-4 rounded-[1.5rem] border-[3px] border-ink bg-sun p-5 text-left text-ink shadow-[6px_6px_0_#ff2d95]"
          >
            <QrCode className="size-10 shrink-0" strokeWidth={2.2} />
            <div>
              <p className="font-display text-2xl leading-none">Need it now?</p>
              <p className="mt-1.5 font-medium text-ink/75">
                Scan the QR code on your pack to open the lab report for that exact batch.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {LINES.map((l, i) => (
            <Reveal key={l.slug} delay={i * 0.08}>
              <div
                className="relative flex h-[380px] flex-col overflow-hidden rounded-[2rem] border-4 border-ink p-6"
                style={{ background: `linear-gradient(160deg, ${l.accent}, ${l.color})` }}
              >
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/70">{l.kicker}</p>
                    <h2 className="font-display sticker mt-1 text-4xl leading-[0.95] text-white">{l.short}</h2>
                  </div>
                  <span className="font-display shrink-0 rotate-6 rounded-xl border-[3px] border-ink bg-cream px-3 py-1 text-sm text-ink">
                    Coming soon
                  </span>
                </div>
                <img
                  src={l.hero}
                  alt={l.name}
                  loading="lazy"
                  className="drop-glow absolute bottom-5 left-1/2 h-[62%] w-auto -translate-x-1/2 object-contain opacity-90 grayscale-[35%]"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex items-center justify-center gap-2 text-center text-cream/60">
          <ShieldCheck className="size-5 shrink-0 text-lime" />
          <p>Every KRUSH batch is lab tested before it reaches the shelf.</p>
        </Reveal>
      </section>
    </>
  );
}
