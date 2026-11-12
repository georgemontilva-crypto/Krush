export type LineSlug = "bitez" | "flower" | "diamond-sauce";

export type Flavor = {
  slug: string;
  name: string;
  /** Strain type for flower and sauce; gummies have none. */
  type?: "Sativa" | "Indica" | "Hybrid";
  color: string;
  /** Second color for gradients. */
  accent: string;
  image: string;
  /** Optional extra shot (e.g. the 60CT display the flavor ships in). */
  alt?: string;
};

export type Spec = { label: string; value: string };

export type Line = {
  slug: LineSlug;
  name: string;
  short: string;
  kicker: string;
  tagline: string;
  blurb: string;
  color: string;
  accent: string;
  hero: string;
  /** Big numbers shown on cards. */
  stats: Spec[];
  specs: Spec[];
  formats: { name: string; detail: string; image: string }[];
  badges: string[];
  flavors: Flavor[];
};

const B = "/products/bitez";
const F = "/products/flower";
const S = "/products/sauce";

const bitezDisplay: Record<string, string> = {
  "blue-razz": "blue-razz",
  "strawberry-lemonade": "blue-razz",
  "peach-mango": "peach-mango",
  "strawberry-watermelon": "peach-mango",
  "sour-peach-kiwi": "sour-peach-kiwi",
  "sour-mystery": "sour-peach-kiwi",
  "sour-watermelon-lemonade": "sour-watermelon",
  "sour-blueberry-lemonade": "sour-watermelon",
  "strawberry-kiwi": "strawberry-kiwi",
  "peach-raspberry": "strawberry-kiwi",
  "apple-strawberry": "apple-strawberry",
  "watermelon-cherry": "apple-strawberry",
};

const gummy = (slug: string, name: string, color: string, accent: string): Flavor => ({
  slug,
  name,
  color,
  accent,
  image: `${B}/${slug}.webp`,
  alt: `${B}/display-${bitezDisplay[slug]}.webp`,
});

const jar = (slug: string, name: string, type: Flavor["type"], color: string, accent: string): Flavor => ({
  slug,
  name,
  type,
  color,
  accent,
  image: `${F}/${slug}.webp`,
});

const syringe = (slug: string, name: string, type: Flavor["type"], color: string, accent: string): Flavor => ({
  slug,
  name,
  type,
  color,
  accent,
  image: `${S}/${slug}.webp`,
});

export const LINES: Line[] = [
  {
    slug: "bitez",
    name: "Krush Bitez",
    short: "Bitez",
    kicker: "Premium Hemp Gummies",
    tagline: "Twelve flavors. One serious splash.",
    blurb:
      "Juicy, chewy, loud. Krush Bitez blend D9, CBD and CBN into a 500MG gummy, packed two to a pouch. Fruit-forward classics and puckering sours, sealed in a resealable, child-resistant bag.",
    color: "#ff2d95",
    accent: "#ffb21a",
    hero: `${B}/display-blue-razz.webp`,
    stats: [
      { label: "MG per gummy", value: "500" },
      { label: "MG per bag", value: "1000" },
      { label: "Flavors", value: "12" },
    ],
    specs: [
      { label: "Blend", value: "D9 + CBD + CBN" },
      { label: "Per gummy", value: "500MG" },
      { label: "Per bag", value: "1000MG · 2 gummies" },
      { label: "Net weight", value: "20G (10G each gummy)" },
      { label: "Display", value: "60 bags · 60,000MG total" },
      { label: "Onset", value: "Up to 2 hours · lasts 6–8 hours" },
    ],
    formats: [
      { name: "2CT Pouch", detail: "Two 500MG gummies, 1000MG per bag", image: `${B}/peach-mango.webp` },
      { name: "60CT Display", detail: "60 pouches, two flavors per display", image: `${B}/display-peach-mango.webp` },
    ],
    badges: ["Premium Hemp", "D9 + CBD + CBN", "Lab Tested", "Child Resistant", "21+ Only"],
    flavors: [
      gummy("peach-mango", "Peach Mango", "#ff7a2f", "#ffd23f"),
      gummy("strawberry-watermelon", "Strawberry Watermelon", "#ff2f5b", "#3ddc6a"),
      gummy("apple-strawberry", "Apple Strawberry", "#3ccf4e", "#ff2f45"),
      gummy("watermelon-cherry", "Watermelon Cherry", "#e8193c", "#35c95a"),
      gummy("strawberry-kiwi", "Strawberry Kiwi", "#ff3b6b", "#8ad13a"),
      gummy("peach-raspberry", "Peach Raspberry", "#ff6a3d", "#e5195f"),
      gummy("blue-razz", "Blue Razz", "#2f7bff", "#7a3cff"),
      gummy("strawberry-lemonade", "Strawberry Lemonade", "#ff4f8b", "#ffe14a"),
      gummy("sour-watermelon-lemonade", "Sour Watermelon Lemonade", "#ff3f7a", "#c6f03a"),
      gummy("sour-blueberry-lemonade", "Sour Blueberry Lemonade", "#2a5bd8", "#ffe14a"),
      gummy("sour-peach-kiwi", "Sour Peach Kiwi", "#ffa23a", "#9bd93c"),
      gummy("sour-mystery", "Sour Mystery", "#7b3cff", "#2fd0e8"),
    ],
  },
  {
    slug: "flower",
    name: "Krush Premium Flower",
    short: "Flower",
    kicker: "1G Premium Hemp Flower",
    tagline: "Top shelf. Hand trimmed. Small batch.",
    blurb:
      "Nine strains of 100% hemp flower, hand trimmed in small batches and portioned into 1G servings. Each jar holds 20 child-resistant mini jars, so every serving stays as fresh as the first.",
    color: "#8b3dff",
    accent: "#22d3ee",
    hero: `${F}/midnight-runtz.webp`,
    stats: [
      { label: "Gram per serving", value: "1G" },
      { label: "Count per jar", value: "20" },
      { label: "Strains", value: "9" },
    ],
    specs: [
      { label: "Product", value: "100% hemp flower" },
      { label: "Per serving", value: "1G mini jar" },
      { label: "Per jar", value: "20 count · 20G (0.70 OZ)" },
      { label: "Grade", value: "Premium · Top shelf" },
      { label: "Craft", value: "Hand trimmed · Small batch" },
      { label: "Use", value: "For inhalation only. Do not eat." },
    ],
    formats: [
      { name: "1G Mini Jar", detail: "Single 1G serving, child-resistant", image: `${F}/purple-velvet.webp` },
      { name: "20CT Jar", detail: "20 servings, 20G total", image: `${F}/rainbow-gelato.webp` },
    ],
    badges: ["100% Hemp Flower", "No Pesticides", "Lab Tested", "Texas Compliant", "Child Resistant"],
    flavors: [
      jar("cherry-blossom", "Cherry Blossom", "Sativa", "#ff3d5a", "#ff9a3d"),
      jar("blackberry-kush", "Blackberry Kush", "Indica", "#1fc8d6", "#2b6bff"),
      jar("tropical-haze", "Tropical Haze", "Sativa", "#2fd06b", "#ffd23f"),
      jar("rainbow-gelato", "Rainbow Gelato", "Hybrid", "#ff4fb1", "#ffe14a"),
      jar("purple-velvet", "Purple Velvet", "Indica", "#8b3dff", "#d06bff"),
      jar("pink-sherb", "Pink Sherb", "Hybrid", "#ff3da8", "#ff8ad0"),
      jar("peach-z", "Peach Z", "Hybrid", "#ff7a3d", "#ffc23d"),
      jar("midnight-runtz", "Midnight Runtz", "Indica", "#3d6bff", "#22d3ee"),
      jar("golden-guava", "Golden Guava", "Sativa", "#ffb21a", "#ffe14a"),
    ],
  },
  {
    slug: "diamond-sauce",
    name: "Krush Diamond Sauce",
    short: "Diamond Sauce",
    kicker: "THC Diamond Sauce Syringe",
    tagline: "3ML of pure sauce. Nine strains deep.",
    blurb:
      "Terp-loaded diamond sauce in a precise 3ML syringe. Dose it, dab it or boost your bowl. Nine candy-coated strains across Sativa, Indica and Hybrid, sold as singles or in a 5-pack.",
    color: "#ffb21a",
    accent: "#ff2d95",
    hero: `${S}/rainbow-z.webp`,
    stats: [
      { label: "ML per syringe", value: "3" },
      { label: "Packs", value: "Single\u00a0/\n5 Pack" },
      { label: "Strains", value: "9" },
    ],
    specs: [
      { label: "Product", value: "THC Diamond Sauce" },
      { label: "Size", value: "3ML syringe" },
      { label: "Packs", value: "Single · 5 Pack" },
      { label: "Types", value: "Sativa · Indica · Hybrid" },
      { label: "Packaging", value: "Child-resistant" },
      { label: "Age", value: "21+ only" },
    ],
    formats: [
      { name: "Single", detail: "One 3ML diamond sauce syringe", image: `${S}/cherry-drip.webp` },
      { name: "5 Pack", detail: "Five syringes of the same strain", image: `${S}/purple-punch.webp` },
    ],
    badges: ["Diamond Sauce", "3ML Syringe", "Lab Tested", "Child Resistant", "21+ Only"],
    flavors: [
      syringe("purple-punch", "Purple Punch", "Indica", "#8b3dff", "#ff4fb1"),
      syringe("cherry-drip", "Cherry Drip", "Sativa", "#e8194f", "#ff6a8a"),
      syringe("strawnana-haze", "Strawnana Haze", "Indica", "#ff2f5b", "#ffd23f"),
      syringe("blue-nurdz", "Blue Nurdz", "Indica", "#2f6bff", "#22d3ee"),
      syringe("candyland", "Candyland", "Hybrid", "#ff3da8", "#ff9ad5"),
      syringe("peach-ringz", "Peach Ringz", "Hybrid", "#ff8a1f", "#ff4f3d"),
      syringe("pineapple-kush", "Pineapple Kush", "Sativa", "#f5c400", "#9bd93c"),
      syringe("rainbow-z", "Rainbow Z", "Hybrid", "#ff2d95", "#3d8bff"),
      syringe("ztarburst", "Ztarburst", "Sativa", "#ff4a2f", "#ffb21a"),
    ],
  },
];

export const lineBySlug = (slug: string) => LINES.find(l => l.slug === slug);

export const ALL_FLAVORS = LINES.flatMap(l => l.flavors.map(f => ({ ...f, line: l })));

export const BRAND = ["#ff2d95", "#ffe11a", "#ff8a1f", "#3d8bff", "#8b3dff", "#2bd96b"];
