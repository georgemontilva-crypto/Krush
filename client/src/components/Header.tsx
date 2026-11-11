import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { LINES } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const [loc] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [loc]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = (href: string) => (href === "/" ? loc === "/" : loc.startsWith(href));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 sm:px-4",
            scrolled || open
              ? "border-white/10 bg-ink/75 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              : "border-white/10 bg-ink/40 backdrop-blur-md",
          )}
        >
          <Link href="/" className="relative z-10 block" aria-label="KRUSH home">
            <Logo eager className="w-[76px] transition-transform duration-300 hover:rotate-[-4deg] hover:scale-110 sm:w-[88px]" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors",
                  active(n.href) ? "text-ink" : "text-cream/80 hover:text-cream",
                )}
              >
                {active(n.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-sun"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/products"
              className="hidden items-center gap-1.5 rounded-full bg-pink px-5 py-2.5 text-[15px] font-bold text-white transition-transform hover:-rotate-2 hover:scale-105 sm:flex"
            >
              Find your flavor <ArrowUpRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              className="grid size-11 place-items-center rounded-full bg-cream text-ink md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-pink px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="halftone pointer-events-none absolute inset-0 text-white/10" />
            <nav className="relative flex flex-col gap-1" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                >
                  <Link href={n.href} className="font-display sticker block py-1 text-6xl text-white">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="relative mt-10 grid gap-3">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Product lines</p>
              {LINES.map((l, i) => (
                <motion.div
                  key={l.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.07 }}
                >
                  <Link
                    href={`/products/${l.slug}`}
                    className="flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-lg font-bold text-cream"
                  >
                    <span>
                      {l.short}
                      <span className="ml-2 text-sm font-medium text-cream/60">{l.flavors.length} flavors</span>
                    </span>
                    <ArrowUpRight className="size-5" style={{ color: l.color }} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
