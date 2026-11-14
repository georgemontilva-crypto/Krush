import { Link } from "wouter";
import { LINES } from "@/lib/catalog";
import { Logo } from "./Logo";
import { Marquee } from "./Marquee";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink-2">
      <Marquee
        items={["Get Krushed", "21+ Only", "Lab Tested", "Loud Flavor", "Premium Hemp"]}
        className="font-display bg-sun py-3 text-2xl text-ink sm:text-3xl"
        speed={40}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo className="w-44" />
          <p className="mt-5 max-w-sm text-cream/65">
            Bitez gummies, premium hemp flower and diamond sauce. Made loud, packed safe, for adults 21 and up.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cream/45">Explore</p>
          <ul className="mt-4 grid gap-2.5 text-lg font-semibold">
            <li><Link href="/" className="hover:text-sun">Home</Link></li>
            <li><Link href="/products" className="hover:text-sun">All products</Link></li>
            <li><Link href="/lab-reports" className="hover:text-sun">Lab reports</Link></li>
            <li><Link href="/about" className="hover:text-sun">About us</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cream/45">Lines</p>
          <ul className="mt-4 grid gap-2.5 text-lg font-semibold">
            {LINES.map(l => (
              <li key={l.slug}>
                <Link href={`/products/${l.slug}`} className="transition-colors hover:text-[var(--c)]" style={{ ["--c" as string]: l.color }}>
                  {l.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-white/10 px-5 py-8 text-xs leading-relaxed text-cream/45 sm:px-8">
        <p>
          Hemp-derived products containing a total delta-9 THC concentration not exceeding 0.3% on a dry weight basis,
          in accordance with the 2018 Farm Bill. These statements have not been evaluated by the FDA. These products are
          not intended to diagnose, treat, cure, or prevent any disease. For adults 21+ only. Keep out of reach of
          children and pets. Do not drive or operate machinery after use. Not for use by pregnant or nursing
          individuals. Consult a licensed healthcare professional before use if you have a medical condition or take
          medication.
        </p>
        <p className="mt-4">© {new Date().getFullYear()} KRUSH. All rights reserved.</p>
      </div>
    </footer>
  );
}
