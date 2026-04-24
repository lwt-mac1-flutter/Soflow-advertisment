import type { ProductCategory } from './categories';
import { PRODUCT_CATEGORIES } from './categories';

export interface Product {
  id: number;
  name: string;
  desc: string;
  /** Legacy tier display ($–$$$$$) */
  price: string;
  /** Dollar display e.g. "$249" */
  priceLabel?: string;
  compareAtLabel?: string;
  /** For price-range filters */
  priceValue: number;
  categoryId: string;
  image: string;
  longDesc?: string;
  origin?: string;
  careLevel?: string;
  lighting?: string;
  wysiwyg?: boolean;
}

function tierFromValue(v: number): string {
  if (v < 120) return '$';
  if (v < 280) return '$$';
  if (v < 550) return '$$$';
  if (v < 900) return '$$$$';
  return '$$$$$';
}

function p(
  id: number,
  name: string,
  categoryId: string,
  priceValue: number,
  desc: string,
  image: string,
  extra?: Partial<Omit<Product, 'id' | 'name' | 'categoryId' | 'priceValue' | 'desc' | 'image' | 'price'>>
): Product {
  return {
    id,
    name,
    categoryId,
    priceValue,
    desc,
    price: tierFromValue(priceValue),
    priceLabel: `$${priceValue}`,
    image,
    longDesc:
      extra?.longDesc ??
      `${desc} WYSIWYG photo — hand-selected. Parameters and care notes available on request.`,
    careLevel: extra?.careLevel ?? 'Moderate',
    lighting: extra?.lighting ?? 'Moderate',
    wysiwyg: extra?.wysiwyg ?? true,
    ...extra
  };
}

/** So Flow catalog — 16 WYSIWYG specimens, local product photography */
const catalog: Product[] = [
  p(
    1,
    'Goniopora — Goniopora stokesi',
    'goniopora',
    285,
    'Dense flowerpot polyps; stable nutrients, moderate flow, and room to grow.',
    '/products/goniopora-stokesi.png',
    { careLevel: 'Moderate to Advanced' }
  ),
  p(
    2,
    'Indophyllia — fleshy LPS centerpiece',
    'acanthophyllia',
    520,
    'Premium Acanthophyllia-meet presentation; open brain texture with bold color.',
    '/products/indophyllia.png',
    { careLevel: 'Moderate', lighting: 'Low to Moderate' }
  ),
  p(
    3,
    'Blastomussa — Blastomussa wellsi',
    'blastomussa',
    189,
    'Tight polyp mounds; low-moderate light, strong presence for frag racks.',
    '/products/blastomussa-wellsi.png',
    { careLevel: 'Easy', lighting: 'Low' }
  ),
  p(
    4,
    'Bubble coral — Plerogyra sinuosa',
    'bubble-coral',
    198,
    'Grape / bubble structure; gentle, low to moderate flow — classic LPS.',
    '/products/bubble-coral-plerogyra.png',
    { careLevel: 'Moderate', lighting: 'Low to Moderate' }
  ),
  p(
    5,
    'Chalice — Echinophyllia',
    'chalice',
    345,
    'Dramatic plate growth and edge contrast; allow encrusting room on the rock.',
    '/products/chalice-echinophyllia.png',
    { careLevel: 'Moderate' }
  ),
  p(
    6,
    'Lobophyllia / Symphyllia — brain lobo',
    'lobophyllia',
    365,
    'Fleshy lobes with neon center tissue; acclimate slowly and keep alk stable.',
    '/products/lobophyllia-symphyllia.png',
    { careLevel: 'Moderate', lighting: 'Low to Moderate' }
  ),
  p(
    7,
    'Acan Lord — Micromussa lordhowensis',
    'acans',
    225,
    'Neon polyp pack; great texture in lower- to mid-par zones.',
    '/products/acan-lord-micromussa.png',
    { careLevel: 'Moderate', lighting: 'Low to Moderate' }
  ),
  p(
    8,
    'Wellsophyllia / Trachyphyllia',
    'wellsophyllia',
    310,
    'Open-brain trachy; meaty fold structure with signature colorways.',
    '/products/wellsophyllia-trachy.png',
    { careLevel: 'Moderate' }
  ),
  p(
    9,
    'Branching hammer — Euphyllia paraancora',
    'hammer',
    415,
    'Euphyllia motion; classic hammer tips with strong fluorescence under blues.',
    '/products/branching-hammer-paraancora.png',
    { careLevel: 'Moderate' }
  ),
  p(
    10,
    'Acropora — branching SPS',
    'acropora',
    425,
    'Show-grade branching; strong light, stable SPS parameters, and flow.',
    '/products/acropora-spp.png',
    { careLevel: 'Advanced', lighting: 'High' }
  ),
  p(
    11,
    'Cynarina — Cynarina lacrymalis',
    'cynarina',
    265,
    'Single large polyp “button”; open brain look with moderate, indirect flow.',
    '/products/cynarina-lacrymalis.png',
    { careLevel: 'Moderate' }
  ),
  p(
    12,
    'Plate coral — pectinia-style layout',
    'pectinia',
    280,
    'Contoured plate growth; corallite pattern pops under actinic pop.',
    '/products/plate-coral.png',
    { careLevel: 'Moderate' }
  ),
  p(
    13,
    'Donut coral — Acanthophyllia',
    'acanthophyllia',
    550,
    'Acanthophyllia (donut) — fleshy folds, bold red-to-orange marbling.',
    '/products/donut-coral-acanthophyllia.png',
    { careLevel: 'Moderate', lighting: 'Low to Moderate' }
  ),
  p(
    14,
    'Scolymia — war paint grade',
    'scolymia',
    480,
    'Master scoly color; minimal flow, let tissue inflate fully after shipping.',
    '/products/scolymia-warpaint.png',
    { careLevel: 'Moderate' }
  ),
  p(
    15,
    'Mushroom — Ricordea / Yuma',
    'mushrooms-ricordea',
    145,
    'Fluorescent marbling; great for lower-light island displays.',
    '/products/mushroom-ricordea.png',
    { careLevel: 'Easy', lighting: 'Low to Moderate' }
  ),
  p(
    16,
    'Torch — Euphyllia glabrescens',
    'torch-euphyllia',
    395,
    'Toxic torch tips; place with spacing — sweep matters for euphyllia.',
    '/products/torch-euphyllia.png',
    { careLevel: 'Moderate' }
  )
];

export const products: Product[] = catalog;

export function getCategoryCounts(): { category: ProductCategory; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    counts.set(p.categoryId, (counts.get(p.categoryId) ?? 0) + 1);
  }
  return PRODUCT_CATEGORIES.map((category) => ({
    category,
    count: counts.get(category.id) ?? 0
  }));
}

export function formatProductPrice(p: Product): string {
  return p.priceLabel ?? p.price;
}
