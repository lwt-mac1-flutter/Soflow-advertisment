import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ChevronUp, Info, Shell, Sparkles, X } from 'lucide-react';
import { ScreenProps } from '../types';
import { BackButton } from './BackButton';
import { products, Product } from '../data/products';

const tileVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 32,
      delay: (typeof i === 'number' ? i : 0) * 0.05
    }
  })
};

function splitProductName(name: string): { primary: string; secondary: string | null } {
  const parts = name.split(' — ').map((p) => p.trim());
  if (parts.length >= 2) {
    return { primary: parts[0] ?? name, secondary: parts.slice(1).join(' — ') };
  }
  return { primary: name, secondary: null };
}

function GalleryTile({
  product,
  index,
  onSelect
}: {
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
}) {
  const { primary, secondary } = useMemo(() => splitProductName(product.name), [product.name]);
  const n = String(index + 1).padStart(2, '0');

  return (
    <motion.button
      type="button"
      custom={index}
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 420, damping: 28 } }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(product)}
      className="group relative w-full text-left">
      {/* Gradient frame — intensifies on hover */}
      <div
        className="rounded-2xl bg-gradient-to-br from-white/[0.12] via-[#0a1524] to-white/[0.08] p-px shadow-[0_4px_0_rgba(0,0,0,0.2)] transition-all duration-500 group-hover:from-[#FF6B4A]/50 group-hover:via-[#0d1828] group-hover:to-[#00E5C3]/45 group-hover:shadow-[0_12px_40px_rgba(0,229,195,0.12)]">
        <div className="overflow-hidden rounded-[0.9rem] bg-[#04070c]">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#080d14] sm:aspect-[3/2]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain object-center p-1.5 transition duration-700 ease-out sm:p-2 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            {/* Shine sweep — does not dim the photo */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden>
              <div className="products-card-shine absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            <div
              className="pointer-events-none absolute left-2 top-2 flex h-8 min-w-8 items-center justify-center rounded-lg border border-white/10 bg-[#050a10]/80 px-2 text-[11px] font-black tabular-nums text-white/90 shadow-lg backdrop-blur-sm sm:left-3 sm:top-3 sm:h-9 sm:min-w-9 sm:text-xs">
              {n}
            </div>
          </div>

          <div className="relative border-t border-white/[0.08] bg-gradient-to-b from-[#0a1018] to-[#04070c] px-3 py-3 sm:px-4 sm:py-3.5">
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#00E5C3]/40 to-transparent" />
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-extrabold leading-snug tracking-tight text-white sm:text-base">
                  {primary}
                </p>
                {secondary ? (
                  <p className="mt-1 text-[13px] font-medium leading-snug text-[#6ee7d8]/95 sm:text-sm">
                    {secondary}
                  </p>
                ) : null}
              </div>
              <div className="mt-0.5 flex shrink-0 items-center text-[#00E5C3]/50 transition group-hover:text-[#00E5C3]">
                <span className="text-[10px] font-bold uppercase tracking-widest sm:text-xs">Open</span>
                <ChevronRight className="h-4 w-4 -translate-y-px sm:h-5 sm:w-5" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function ImageLightbox({
  product,
  onClose,
  onNavigate
}: {
  product: Product;
  onClose: () => void;
  onNavigate: ScreenProps['onNavigate'];
}) {
  const { primary, secondary } = useMemo(() => splitProductName(product.name), [product.name]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged photo: ${product.name}`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}>
      <div className="absolute inset-0 bg-[#010407]/90 backdrop-blur-md" aria-hidden />
      <motion.div
        className="relative z-10 flex max-h-[min(96dvh,1080px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#060a10] shadow-[0_0_0_1px_rgba(0,229,195,0.12),0_32px_80px_rgba(0,0,0,0.75)]"
        initial={{ scale: 0.94, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3 border-b border-white/10 p-3 sm:p-4">
          <div className="min-w-0 pl-0.5">
            <h2 className="text-balance text-base font-extrabold text-white sm:text-lg">{primary}</h2>
            {secondary ? (
              <p className="mt-0.5 text-sm font-medium text-[#7dd3c0]" lang="la">
                {secondary}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onNavigate('product-details', product.id);
                onClose();
              }}
              className="hidden sm:inline-flex touch-manipulation items-center gap-1.5 rounded-xl border border-[#00E5C3]/35 bg-[#00E5C3]/10 px-3 py-2 text-xs font-bold text-[#9ef7e8] transition hover:border-[#00E5C3]/55 hover:bg-[#00E5C3]/15">
              <Info className="h-3.5 w-3.5" strokeWidth={2.5} />
              Full details
            </button>
            <button
              type="button"
              onClick={onClose}
              className="touch-manipulation rounded-xl border border-white/15 p-2 text-white/80 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
              aria-label="Close">
              <X className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />
            </button>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center bg-black/50 px-2 pb-2 pt-0 sm:px-4 sm:pb-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-auto w-full max-h-[min(78dvh,900px)] object-contain"
            style={{ maxWidth: 'min(100%, 1200px)' }}
          />
        </div>
        <div className="border-t border-white/10 p-3 sm:hidden">
          <button
            type="button"
            onClick={() => {
              onNavigate('product-details', product.id);
              onClose();
            }}
            className="flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-[#00E5C3]/35 bg-[#00E5C3]/10 py-3 text-sm font-bold text-[#9ef7e8]">
            <Info className="h-4 w-4" strokeWidth={2.5} />
            Full details & pricing
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProductsScreen({ onNavigate }: ScreenProps) {
  const [showTop, setShowTop] = useState(false);
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null);

  const onScroll = useCallback(() => {
    setShowTop(window.scrollY > 400);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-transparent text-white">
      <div
        className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#00E5C3]/12 blur-[100px] motion-reduce:animate-none"
        aria-hidden
        style={{ animation: 'products-blob-drift 22s ease-in-out infinite' }}
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-32 h-72 w-72 rounded-full bg-[#FF6B4A]/10 blur-[100px] motion-reduce:animate-none"
        style={{ animation: 'products-blob-drift 28s ease-in-out infinite reverse' }}
        aria-hidden
      />

      <header className="relative z-20 shrink-0 border-b border-white/[0.08] bg-[#050d1a]/90 px-6 pb-6 pt-6 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#050d1a]/80 signage:px-12 signage:pb-7 signage:pt-8">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#4A9EFF]/25 bg-[#4A9EFF]/10 px-3 py-1">
              <Shell className="h-3.5 w-3.5 text-[#4A9EFF]" strokeWidth={2.5} aria-hidden />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9ec8ff]">
                Product gallery
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl signage:text-5xl">
              Our{' '}
              <span className="bg-gradient-to-r from-[#FF6B4A] via-[#FFB84D] to-[#00E5C3] bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/60 signage:text-base">
              Sum of Our products
            </p>
            <p className="mt-1.5 max-w-2xl text-sm text-white/45">
              Tap a tile to enlarge the photo, then open full details and pricing.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00E5C3]/20 bg-[#00E5C3]/5 px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#00E5C3]" strokeWidth={2.5} />
                <span className="text-xs font-bold text-[#9ef7e8]">
                  {products.length} products
                </span>
              </div>
              <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#FF6B4A] to-[#00E5C3] shadow-[0_0_20px_rgba(0,229,195,0.4)]" />
            </div>
          </div>
          <div className="w-full shrink-0 sm:w-auto lg:max-w-sm lg:pb-1">
            <BackButton onClick={() => onNavigate('main')} label="Back to Menu" />
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-4 py-8 signage:px-12 signage:py-10 floor:px-16 scroll-smooth pb-28">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {products.map((product, index) => (
            <GalleryTile
              key={product.id}
              product={product}
              index={index}
              onSelect={setLightboxProduct}
            />
          ))}
        </div>
      </main>

      {showTop && !lightboxProduct && (
        <motion.button
          type="button"
          className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-[#00E5C3]/40 bg-gradient-to-br from-[#0a1524] to-[#050d1a] text-[#9ef7e8] shadow-[0_0_32px_rgba(0,229,195,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d1a]"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}>
          <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
        </motion.button>
      )}

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxProduct && (
              <ImageLightbox
                key={lightboxProduct.id}
                product={lightboxProduct}
                onClose={() => setLightboxProduct(null)}
                onNavigate={onNavigate}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
