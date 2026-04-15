/** Wholesale album category taxonomy (reference: WYSIWYG-style coral catalog) */
export interface ProductCategory {
  id: string;
  label: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: 'acan-maxima', label: 'Acan Maxima' },
  { id: 'acans', label: 'Acans' },
  { id: 'acanthophyllia', label: 'Acanthophyllia' },
  { id: 'acropora', label: 'Acropora' },
  { id: 'asian-acanth', label: 'Asian Acanth (Japanese Acans)' },
  { id: 'blastomussa', label: 'Blastomussa' },
  { id: 'bubble-coral', label: 'Bubble Coral' },
  { id: 'bulk-listing', label: 'BULK LISTING' },
  { id: 'chalice', label: 'Chalice' },
  { id: 'cynarina', label: 'Cynarina lacrymalis' },
  { id: 'dendrophyllia', label: 'Dendrophyllia' },
  { id: 'duncan', label: 'Duncan' },
  { id: 'elegance', label: 'Elegance' },
  { id: 'favia', label: 'Favia — Moon, Platy, etc.' },
  { id: 'fish', label: 'Fish' },
  { id: 'frags', label: 'Frags' },
  { id: 'frogspawn', label: 'Frogspawn' },
  { id: 'fungia', label: 'Fungia' },
  { id: 'goniopora', label: 'Goniopora' },
  { id: 'hammer', label: 'Hammer' },
  { id: 'lobophyllia', label: 'Lobophyllia / Symphyllia' },
  { id: 'mushrooms-ricordea', label: 'Mushrooms — Ricordea' },
  { id: 'misc', label: 'Misc.' },
  { id: 'jawbreaker-mushroom', label: 'Jawbreaker Mushroom' },
  { id: 'pectinia', label: 'Pectinia' },
  { id: 'scolymia', label: 'Scolymia' },
  { id: 'torch-euphyllia', label: 'Torch / Euphyllia' },
  { id: 'wellsophyllia', label: 'Wellsophyllia — Trachy' },
  { id: 'wilsoni', label: 'Wilsoni' },
  { id: 'split-coral', label: 'Split Coral' }
];

export const CATEGORY_BY_ID = Object.fromEntries(
  PRODUCT_CATEGORIES.map((c) => [c.id, c])
) as Record<string, ProductCategory>;

export function categoryLabel(id: string): string {
  return CATEGORY_BY_ID[id]?.label ?? id;
}
