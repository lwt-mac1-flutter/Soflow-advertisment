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

const img = (id: string) => `https://images.unsplash.com/${id}?w=900&q=82`;

const CORAL_IMG = [
  img('photo-1583212292454-1fe6229603b7'),
  img('photo-1559827260-dc66d52bef19'),
  img('photo-1544551763-46a013bb70d5'),
  img('photo-1582967788606-a171c1080cb0'),
  img('photo-1596854407944-bf87f6fdd49e'),
  img('photo-1518837695005-2083093ee35b'),
  img('photo-1505142468610-359e7d316be0'),
  img('photo-1526336024174-e4bbc8daa0bd'),
  img('photo-1498623116898-88b42982a08b'),
  img('photo-1568430465619-387b73a5e163'),
  img('photo-1571759267053-7cb03620e18f'),
  img('photo-1468581265543-2230d60cefd5')
];

function tierFromValue(v: number): string {
  if (v < 120) return '$';
  if (v < 280) return '$$';
  if (v < 550) return '$$$';
  if (v < 900) return '$$$$';
  return '$$$$$';
}

let autoId = 0;
function coral(
  name: string,
  categoryId: string,
  priceValue: number,
  desc: string,
  extra?: Partial<Omit<Product, 'id' | 'name' | 'categoryId' | 'priceValue' | 'desc' | 'price'>>
): Product {
  autoId += 1;
  const i = CORAL_IMG[(autoId - 1) % CORAL_IMG.length];
  return {
    id: autoId,
    name,
    categoryId,
    priceValue,
    desc,
    price: tierFromValue(priceValue),
    priceLabel: `$${priceValue}`,
    image: extra?.image ?? i,
    longDesc:
      extra?.longDesc ??
      `${desc} Premium hand-selected for wholesale. Parameters and care notes available on request.`,
    origin: extra?.origin,
    careLevel: extra?.careLevel ?? 'Moderate',
    lighting: extra?.lighting ?? 'Moderate',
    wysiwyg: extra?.wysiwyg ?? true,
    compareAtLabel: extra?.compareAtLabel,
    ...extra
  };
}

/** Full WYSIWYG-style catalog */
const catalog: Product[] = [
  coral('Red Sea Premium Colony', 'misc', 189, 'Vibrant reds, hardy Indo-Pacific genetics.', {
    origin: 'Red Sea',
    careLevel: 'Moderate',
    lighting: 'Moderate to High',
    image: CORAL_IMG[0]
  }),
  coral('Pacific Staghorn Acropora', 'acropora', 320, 'Fast-growing branching SPS centerpiece.', {
    origin: 'Indo-Pacific',
    careLevel: 'Advanced',
    lighting: 'High'
  }),
  coral('Indo Brain — Maze Pattern', 'favia', 275, 'Classic maze brain, stable alk friendly.', {
    origin: 'Indonesia',
    careLevel: 'Moderate',
    lighting: 'Low to Moderate',
    image: CORAL_IMG[2]
  }),
  coral('Fiji Torch — Golden Tips', 'torch-euphyllia', 340, 'Long tentacles, strong fluorescence.', {
    origin: 'Fiji',
    careLevel: 'Moderate',
    image: CORAL_IMG[3]
  }),
  coral('Tonga Discosoma Mushroom', 'mushrooms-ricordea', 95, 'Beginner-friendly, multiplies readily.', {
    origin: 'Tonga',
    careLevel: 'Easy',
    lighting: 'Low',
    image: CORAL_IMG[4]
  }),
  coral('Australian Acropora — Ultra', 'acropora', 890, 'Show-grade color; expert systems only.', {
    origin: 'Australia',
    careLevel: 'Advanced',
    lighting: 'High',
    image: CORAL_IMG[5]
  }),

  coral('10 Head Fragged Branching Indo Hammer Lot', 'hammer', 520, 'Multi-head Indo hammer colony lot.', {
    origin: 'Indonesia'
  }),
  coral('10 Head HG Torch Lot', 'torch-euphyllia', 680, 'High-grade torch multi-head pack.', {
    compareAtLabel: '$749'
  }),
  coral('10 Pack Bulk Mushroom Frag Mix', 'frags', 290, 'Assorted mushroom frags — great for resale.', {
    wysiwyg: false
  }),
  coral('11 Head Branching Frogspawn Colony', 'frogspawn', 445, 'Dense branching euphyllia cluster.', {
    origin: 'Indonesia'
  }),
  coral('25 Head Fragged Branching Indo Hammer Lot', 'hammer', 1100, 'Large hammer showpiece lot.', {
    compareAtLabel: '$1250'
  }),
  coral('25 Pack Acan Frag Pack', 'acans', 750, 'Bulk acan frags — mixed colors.', { wysiwyg: false }),
  coral('3–4″ Koi Great Color Scoly', 'scolymia', 425, 'Koi pattern scolymia, strong contrast.', {
    origin: 'Australia'
  }),
  coral('4″ Red Devil Chalice', 'chalice', 380, 'Deep red chalice, slow grow centerpiece.', {
    origin: 'Indonesia'
  }),
  coral('5 Head Branching Indo Mixed Frogspawn', 'frogspawn', 265, 'Starter frogspawn multi-color.', {}),
  coral('5 Head Fragged Branching Indo Hammer Lot', 'hammer', 310, 'Compact hammer lot for retail racks.', {}),
  coral('5 Head HG Torch Lot (Singles)', 'torch-euphyllia', 395, 'Five singles, high grade tips.', {}),
  coral('5 Pack Candy Crush Jawbreaker', 'jawbreaker-mushroom', 220, 'Vibrant jawbreaker mushroom pack.', {}),
  coral('5 Pack Jawbreaker Assortment', 'jawbreaker-mushroom', 198, 'Mixed jawbreaker color morphs.', {}),
  coral('5 Pack Kryptonite Jawbreaker', 'jawbreaker-mushroom', 265, 'Neon green signature line.', {}),
  coral('5 Pack Mushroom Frag', 'frags', 145, 'Soft coral frag starter bundle.', { wysiwyg: false }),
  coral('NON-WYSIWYG Box Lot — Premium Mix', 'bulk-listing', 1000, 'Wholesale box — assorted LPS/SPS.', {
    wysiwyg: false
  }),
  coral('NON-WYSIWYG Box Lot — Softie Heavy', 'bulk-listing', 2000, 'Large volume soft coral box.', {
    wysiwyg: false
  }),
  coral('NON-WYSIWYG Box Lot — Starter', 'bulk-listing', 500, 'Entry wholesale coral mix box.', {
    wysiwyg: false
  }),

  coral('Acan Maxima — Ultra Stripe', 'acan-maxima', 1650, 'Rare maxima colorway; one colony.', {
    careLevel: 'Moderate'
  }),
  coral('Acan Lord — Rainbow Pack', 'acans', 185, 'Three-polyp rainbow acan starter.', {}),
  coral('Acanthophyllia — Master Scoly', 'acanthophyllia', 720, 'Premium doughnut coral, XL polyp.', {}),
  coral('Asian Acanth — Japanese Style', 'asian-acanth', 340, 'Tight polyp structure, pastel rim.', {}),
  coral('Blastomussa Merletti — Red', 'blastomussa', 155, 'Low light blasto colony.', {}),
  coral('Blastomussa Wellsi — Green', 'blastomussa', 210, 'Wellsi with neon green centers.', {}),
  coral('Bubble Coral — Pearl White', 'bubble-coral', 125, 'Gentle flow, classic bubble.', {}),
  coral('Chalice — Reverse Prism', 'chalice', 295, 'Metallic rings, encrusting habit.', {}),
  coral('Chalice — Tyree War Paint', 'chalice', 450, 'Collector-grade chalice slab.', {}),
  coral('Cynarina lacrymalis — Button', 'cynarina', 275, 'Large fleshy polyp, sand bed.', {}),
  coral('Duncanopsammia — Multi-Head', 'duncan', 95, 'Fast-growing branching duncan.', {}),
  coral('Elegance Coral — Purple Tip', 'elegance', 320, 'Catalaphyllia with long tentacles.', {}),
  coral('Favia — Dragon Eye', 'favia', 140, 'Moon favia with contrasting eyes.', {}),
  coral('Favia — War Coral', 'favia', 175, 'Platy favia encrusting plate.', {}),
  coral('Fungia — Red Disc', 'fungia', 185, 'Free-living plate, easy display.', {}),
  coral('Goniopora — Red Flowerpot', 'goniopora', 240, 'Long polyp gonio; stable nutrients.', {}),
  coral('Goniopora — Gold Maze', 'goniopora', 310, 'Rare gold strain flowerpot.', {}),
  coral('Lobophyllia — Brain Red', 'lobophyllia', 265, 'Open brain, moderate light.', {}),
  coral('Ricordea Florida — Orange', 'mushrooms-ricordea', 78, 'Caribbean ricordea, intense orange.', {
    origin: 'Caribbean'
  }),
  coral('Misc. LPS Grab Bag', 'misc', 160, 'Assorted LPS frags — value pack.', { wysiwyg: false }),
  coral('Pectinia — Cup Coral', 'pectinia', 195, 'Scroll cup, moderate flow.', {}),
  coral('Torch — Hellfire Indo', 'torch-euphyllia', 425, 'Classic hellfire tips.', {}),
  coral('Torch — Dragon Soul', 'torch-euphyllia', 595, 'Premium dragon soul lineage.', {
    compareAtLabel: '$650'
  }),
  coral('Wellsophyllia — Trachy Open Brain', 'wellsophyllia', 355, 'Trachyphillia with vivid folds.', {}),
  coral('Wilsoni — Ultra (If Available)', 'wilsoni', 1425, 'Ultra-rare Wilsoni; permit dependent.', {}),
  coral('Split Coral — Indo LPS Duo', 'split-coral', 225, 'Two-polyp split offering.', {}),

  coral('Acropora — Bali Green Slimer', 'acropora', 185, 'Fast encrusting green acro.', {}),
  coral('Acropora — Strawberry Shortcake', 'acropora', 540, 'Pink tips, strong lighting.', {}),
  coral('Frogspawn — Gold Branching', 'frogspawn', 198, 'Gold stem branching euphyllia.', {}),
  coral('Hammer — Wall Bicolor', 'hammer', 275, 'Wall hammer with split tips.', {}),
  coral('Frags — SPS Starter10-Pack', 'frags', 420, 'Mixed acro/monti frags for grow-out.', {
    wysiwyg: false
  }),
  coral('Frags — Zoanthid Garden Mix', 'frags', 135, 'Zoa/Paly frags — assorted.', { wysiwyg: false }),
  coral('Mushroom — Jawbreaker Single', 'jawbreaker-mushroom', 88, 'Single premium jawbreaker.', {}),
  coral('Goniopora — Aqua Blue', 'goniopora', 265, 'Aqua-blue polyp extension.', {}),
  coral('Scolymia — Warpaint Aussie', 'scolymia', 495, 'Australian warpaint scoly.', {
    origin: 'Australia'
  }),
  coral('Bubble Coral — Green Fluoro', 'bubble-coral', 142, 'Green bubble with pink mouth.', {}),
  coral('Bulk — Torch Singles x8', 'bulk-listing', 890, 'Eight torch singles wholesale pack.', {
    wysiwyg: false
  })
];

export const products: Product[] = catalog;

/** Categories that exist in taxonomy (for filter UI); counts from live data */
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
