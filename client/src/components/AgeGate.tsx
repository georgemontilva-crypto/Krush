import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/catalog";
import { Goo } from "./Goo";
import { Logo } from "./Logo";

const KEY = "krush_age_ok";

/** 21+ gate, remembered on this device after a yes. */
export function AgeGate() {
  const [ok, setOk] = useState(true);
  const [nope, setNope] = useState(false);

  useEffect(() => {
    try {
      setOk(window.localStorage.getItem(KEY) === "1");
    } catch {
      setOk(false);
    }
  }, []);

  useEffect(() => {
    if (ok) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [ok]);

  const yes = () => {
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      /* asked again next visit */
    }
    setOk(true);
  };

  return (
    <AnimatePresence>
      {!ok && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-title"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-ink p-5"
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
        >
          <Goo colors={BRAND} className="absolute inset-0 opacity-60" count={6} size={0.2} />
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" />
          <motion.div
            initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="relative w-full max-w-md rounded-[2rem] border-4 border-ink bg-cream p-7 text-center text-ink shadow-[10px_10px_0_#0b0b10] sm:p-9"
          >
            <Logo eager className="wobble mx-auto -mt-20 w-52 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] sm:w-60" />
            {nope ? (
              <>
                <h2 id="age-title" className="font-display mt-4 text-4xl">Come back later</h2>
                <p className="mt-3 text-ink/70">KRUSH products are only for adults 21 and older.</p>
              </>
            ) : (
              <>
                <h2 id="age-title" className="font-display mt-4 text-4xl leading-none sm:text-5xl">Are you 21+?</h2>
                <p className="mt-3 text-ink/70">You must be of legal age to enter this site.</p>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={yes}
                    className="font-display rounded-2xl border-[3px] border-ink bg-pink py-4 text-2xl text-white shadow-[4px_4px_0_#0b0b10] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    Yes, I am
                  </button>
                  <button
                    type="button"
                    onClick={() => setNope(true)}
                    className="font-display rounded-2xl border-[3px] border-ink bg-white py-4 text-2xl shadow-[4px_4px_0_#0b0b10] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    No
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
