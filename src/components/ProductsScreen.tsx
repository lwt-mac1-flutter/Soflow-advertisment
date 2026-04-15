import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Filter,
  MapPin,
  Search,
  Shell,
  Sparkles,
  X
} from 'lucide-react';
import { ScreenProps } from '../types';
import { BackButton } from './BackButton';
import {
  products,
  Product,
  getCategoryCounts,
  formatProductPrice
} from '../data/products';
import { categoryLabel } from '../data/categories';

const PRICE_BUCKETS = [
  { id: 'all', label: 'All prices', test: () => true },
  { id: 'u250', label: 'Under $250', test: (v: number) => v < 250 },
  { id: '250-600', label: '$250 – $600', test: (v: number) => v >= 250 && v < 600 },
  { id: '600-1200', label: '$600 – $1,200', test: (v: number) => v >= 600 && v < 1200 },
  { id: '1200p', label: '$1,200+', test: (v: number) => v >= 1200 }
] as const;

function careBadgeClass(care?: string) {
  const v = care?.toLowerCase() ?? '';
  if (v.includes('easy')) return 'bg-[#00E5C3]/15 text-[#7ff5e4] border-[#00E5C3]/35';
  if (v.includes('advanced')) return 'bg-[#FF6B4A]/15 text-[#ffb5a6] border-[#FF6B4A]/35';
  return 'bg-[#FFB84D]/15 text-[#ffe0b3] border-[#FFB84D]/35';
}

function ProductCard({
  product,
  onNavigate
}: {
  product: Product;
  onNavigate: ScreenProps['onNavigate'];
}) {
  const display = formatProductPrice(product);
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 380,
            damping: 28
          }
        }
      }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      whileTap={{ scale: 0.98 }}
      className="group relative">
      <div
        className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-[#FF6B4A]/25 via-transparent to-[#00E5C3]/20 opacity-60 blur-[1px] transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-white/[0.09] bg-[#0a1524]/90 shadow-[0_24px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
        <div className="relative aspect-[5/4] w-full overflow-hidden sm:aspect-[4/3]">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
            loading="lazy"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-[#050d1a]/25 to-[#00E5C3]/10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#FF6B4A]/15 opacity-80" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="inline-block max-w-[85%] truncate rounded-full border border-[#4A9EFF]/30 bg-black/45 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#b8d9ff] backdrop-blur-md">
              {categoryLabel(product.categoryId)}
            </span>
            {product.wysiwyg !== false && (
              <span className="rounded-full border border-[#00E5C3]/35 bg-[#00E5C3]/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-[#9ef7e8]">
                WYSIWYG
              </span>
            )}
            {product.origin && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-md">
                <MapPin className="h-3 w-3 text-[#00E5C3]" strokeWidth={2.5} aria-hidden />
                {product.origin}
              </span>
            )}
            {product.careLevel && (
              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${careBadgeClass(product.careLevel)}`}>
                {product.careLevel}
              </span>
            )}
          </div>

          <div className="absolute right-3 top-3 text-right">
            <span className="inline-flex flex-col items-end rounded-full border border-[#FF6B4A]/40 bg-[#FF6B4A]/20 px-3 py-1.5 text-sm font-black tracking-wide text-[#ffb5a6] shadow-[0_0_20px_rgba(255,107,74,0.35)]">
              {product.compareAtLabel && (
                <span className="text-[10px] font-bold line-through opacity-70">
                  {product.compareAtLabel}
                </span>
              )}
              <span>{display}</span>
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050d1a] to-transparent" />
        </div>

        <div className="relative flex flex-1 flex-col gap-3 p-4 signage:p-5">
          <div className="absolute left-0 top-0 h-1 w-12 rounded-full bg-gradient-to-r from-[#FF6B4A] to-[#00E5C3] opacity-90" />

          <div className="pt-1">
            <h3 className="text-base font-black leading-tight tracking-tight text-white signage:text-lg">
              {product.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-white/55">
              {product.desc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('product-details', product.id)}
            className="touch-manipulation mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-[#00E5C3]/35 bg-gradient-to-r from-[#00E5C3]/12 to-[#FF6B4A]/10 py-3 floor:py-4 text-sm floor:text-base font-bold text-white shadow-[0_0_24px_rgba(0,229,195,0.12)] transition-colors hover:border-[#00E5C3]/55 hover:from-[#00E5C3]/20 min-h-[48px] floor:min-h-[60px] display4k:min-h-[72px] active:scale-[0.99]">
            View details
            <ArrowRight className="h-4 w-4 text-[#00E5C3]" strokeWidth={2.5} aria-hidden />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductsScreen({ onNavigate }: ScreenProps) {
  const [query, setQuery] = useState('');
  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set());
  const [priceBucket, setPriceBucket] = useState<(typeof PRICE_BUCKETS)[number]['id']>('all');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryRows = useMemo(() => getCategoryCounts(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const bucket = PRICE_BUCKETS.find((b) => b.id === priceBucket) ?? PRICE_BUCKETS[0];
    return products.filter((p) => {
      if (selectedCats.size > 0 && !selectedCats.has(p.categoryId)) return false;
      if (!bucket.test(p.priceValue)) return false;
      if (!q) return true;
      const cat = categoryLabel(p.categoryId).toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        cat.includes(q)
      );
    });
  }, [query, selectedCats, priceBucket]);

  function toggleCategory(id: string) {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearFilters() {
    setSelectedCats(new Set());
    setPriceBucket('all');
    setQuery('');
  }

  const activeFilterCount =
    selectedCats.size + (priceBucket !== 'all' ? 1 : 0) + (query.trim() ? 1 : 0);

  return (
    <div className="flex flex-col min-h-[100dvh] min-h-screen w-full bg-transparent">
      <div className="relative z-20 border-b border-white/[0.08] bg-white/[0.03] px-6 pb-5 pt-6 backdrop-blur-2xl signage:px-12 signage:pb-6 signage:pt-8 floor:px-16 display4k:px-24">
        <div className="mx-auto flex max-w-[1600px] floor:max-w-[2400px] display4k:max-w-[3000px] flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#4A9EFF]/25 bg-[#4A9EFF]/10 px-3 py-1">
              <Shell className="h-3.5 w-3.5 text-[#4A9EFF]" strokeWidth={2.5} aria-hidden />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9ec8ff]">
                Coral WYSIWYG album
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white signage:text-4xl floor:text-5xl display4k:text-6xl">
              Wholesale{' '}
              <span className="bg-gradient-to-r from-[#FF6B4A] via-[#FFB84D] to-[#00E5C3] bg-clip-text text-transparent">
                catalog
              </span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/50 signage:text-base floor:text-lg display4k:text-xl">
              Browse by category like our live album—filters update instantly. Licensed retailers
              only; scan QR on the main menu to register.
            </p>
            <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#FF6B4A] to-[#00E5C3] shadow-[0_0_16px_rgba(0,229,195,0.4)]" />
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:pb-1">
            <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5">
              <Sparkles className="h-4 w-4 text-[#FFB84D]" aria-hidden />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                  Listings
                </p>
                <p className="text-sm font-bold text-white">{products.length} SKUs</p>
              </div>
            </div>
            <BackButton onClick={() => onNavigate('main')} label="Back to Menu" />
          </div>
        </div>

        {/* Search + mobile filter toggle */}
        <div className="mx-auto mt-6 flex max-w-[1600px] floor:max-w-[2400px] display4k:max-w-[3000px] flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
              strokeWidth={2.25}
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, description, category…"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.06] py-3 floor:py-4 pl-10 floor:pl-12 pr-4 text-sm floor:text-base display4k:text-lg font-medium text-white placeholder:text-white/35 outline-none ring-[#00E5C3]/40 focus:ring-2 min-h-[48px] floor:min-h-[56px]"
              autoComplete="off"
            />
          </div>
          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-3 text-sm font-bold text-white sm:hidden">
            <Filter className="h-4 w-4 text-[#00E5C3]" aria-hidden />
            Filters
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-[#FF6B4A] px-2 py-0.5 text-xs font-black text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="relative w-full flex-1 overflow-x-hidden px-4 py-8 signage:px-12 signage:py-10 floor:px-16 display4k:px-24 pb-24 signage:pb-32">
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#00E5C3]/12 blur-[100px]" aria-hidden />
        <div className="pointer-events-none absolute -right-20 bottom-40 h-64 w-64 rounded-full bg-[#FF6B4A]/10 blur-[90px]" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-[1600px] floor:max-w-[2400px] display4k:max-w-[3000px] flex-col gap-8 lg:flex-row lg:items-start">
          {/* Sidebar filters — desktop */}
          <aside
            className={`lg:sticky lg:top-4 lg:z-[5] lg:flex lg:w-72 lg:shrink-0 floor:lg:w-80 display4k:lg:w-96 lg:flex-col ${filtersOpen ? 'flex' : 'hidden'} lg:flex`}>
            <div className="max-h-[min(70vh,720px)] floor:max-h-[min(75vh,900px)] overflow-y-auto rounded-2xl border border-white/[0.09] bg-[#0a1524]/85 p-4 floor:p-5 display4k:p-6 shadow-xl backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/50">
                  <Filter className="h-3.5 w-3.5 text-[#00E5C3]" aria-hidden />
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B4A] hover:text-[#ff8a73]">
                    Clear all
                  </button>
                )}
              </div>

              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/35">
                Price
              </p>
              <div className="mb-5 flex flex-col gap-1.5">
                {PRICE_BUCKETS.map((b) => (
                  <label
                    key={b.id}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-white/80 hover:bg-white/[0.05]">
                    <input
                      type="radio"
                      name="price-bucket"
                      checked={priceBucket === b.id}
                      onChange={() => setPriceBucket(b.id)}
                      className="h-4 w-4 accent-[#00E5C3]"
                    />
                    {b.label}
                  </label>
                ))}
              </div>

              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/35">
                Categories
              </p>
              <div className="flex flex-col gap-0.5 pr-1">
                {categoryRows.map(({ category, count }) => (
                  <label
                    key={category.id}
                    className="flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 text-[13px] leading-snug text-white/75 hover:bg-white/[0.05]">
                    <input
                      type="checkbox"
                      checked={selectedCats.has(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#00E5C3]"
                    />
                    <span className="flex-1">
                      {category.label}
                      <span
                        className={`ml-1.5 text-[11px] font-bold tabular-nums ${count === 0 ? 'text-white/25' : 'text-[#00E5C3]/80'}`}>
                        ({count})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm font-bold text-white lg:hidden">
              <X className="h-4 w-4" aria-hidden />
              Close filters
            </button>
          </aside>

          {/* Grid */}
          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.28em] text-white/35">
                  Album grid
                </h3>
                <p className="mt-1 text-sm font-semibold text-white/55">
                  Showing{' '}
                  <span className="text-white">{filtered.length}</span> of {products.length}
                </p>
              </div>
            </div>

            <motion.div
              key={`${query}-${[...selectedCats].sort().join(',')}-${priceBucket}`}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-4 floor:gap-7 display4k:grid-cols-5 display4k:gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.04, delayChildren: 0.04 }
                }
              }}
              initial="hidden"
              animate="visible">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-16 text-center">
                <p className="text-lg font-bold text-white/70">No matches</p>
                <p className="mt-2 text-sm text-white/45">Try clearing filters or a broader search.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-xl border border-[#00E5C3]/40 bg-[#00E5C3]/15 px-6 py-3 text-sm font-bold text-[#9ef7e8]">
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
