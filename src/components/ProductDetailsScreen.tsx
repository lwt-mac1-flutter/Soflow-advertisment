import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, X } from 'lucide-react';
import { BackButton } from './BackButton';
import { products, formatProductPrice } from '../data/products';

/** Wholesale contact details (matches soflowrubioscorals.us contact page). */
const WHOLESALE_CONTACT = {
  addressLine1: '7341 N.W. 32nd Ave',
  addressLine2: 'Miami, FL 33147, USA',
  emailDisplay: 'Info@soflowrubioscorals.us',
  emailMailto: 'mailto:info@soflowrubioscorals.us',
  phones: [
    { name: 'Anthony Rubio', tel: '+19547060081', display: '954-706-0081' },
    { name: 'Alain Suarez', tel: '+17863940908', display: '786-394-0908' }
  ] as const
};

interface ProductDetailsScreenProps {
  productId: number;
  onNavigate: (screen: 'products' | 'main') => void;
}

export function ProductDetailsScreen({ productId, onNavigate }: ProductDetailsScreenProps) {
  const [contactOpen, setContactOpen] = useState(false);
  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContactOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [contactOpen]);

  if (!product) {
    return (
      <div className="flex flex-col min-h-[100dvh] min-h-screen w-full bg-transparent items-center justify-center p-8">
        <p className="text-white/70 text-lg mb-6">Product not found.</p>
        <BackButton onClick={() => onNavigate('products')} label="Back to Products" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[100dvh] min-h-screen w-full bg-transparent">
      {/* Header */}
      <div className="bg-white/[0.03] backdrop-blur-2xl border-b border-white/[0.08] pt-6 pb-4 px-6 signage:pt-8 signage:pb-5 signage:px-12 floor:px-16 display4k:px-24 z-20 relative">
        <h2 className="text-2xl signage:text-3xl floor:text-4xl font-black text-white mb-2 tracking-wide">
          Product Details
        </h2>
        <div className="w-16 h-1 bg-[#FF6B4A] rounded-full mb-6 shadow-[0_0_10px_rgba(255,107,74,0.5)]" />
        <BackButton onClick={() => onNavigate('products')} label="Back to Products" />
      </div>

      <div className="px-4 py-6 signage:px-12 signage:py-8 floor:px-16 display4k:px-24 pb-24 max-w-[1400px] floor:max-w-[2200px] display4k:max-w-[2800px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl flex flex-col signage:flex-row"
        >
          {/* Image Section */}
          <div className="relative w-full signage:w-1/2 min-h-[240px] signage:min-h-[400px] floor:min-h-[480px] display4k:min-h-[560px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center min-w-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-transparent to-transparent opacity-60" />
          </div>

          {/* Details Section */}
          <div className="p-6 signage:p-10 floor:p-12 display4k:p-16 flex-1 flex flex-col justify-center">
            <h1 className="text-3xl signage:text-4xl floor:text-5xl display4k:text-6xl font-black text-white mb-3 tracking-tight">
              {product.name}
            </h1>
            <div className="mb-4 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl font-black text-[#FF6B4A] signage:text-3xl floor:text-4xl">
                {formatProductPrice(product)}
              </span>
              {product.compareAtLabel && (
                <span className="text-lg font-bold text-white/45 line-through">
                  {product.compareAtLabel}
                </span>
              )}
            </div>
            <p className="text-lg signage:text-xl floor:text-2xl display4k:text-3xl text-white/70 font-medium mb-8 leading-relaxed">
              {product.longDesc ?? product.desc}
            </p>

            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="touch-manipulation w-full signage:w-auto signage:min-w-[200px] floor:min-w-[280px] bg-[#FF6B4A] hover:bg-[#ff7a5c] text-white font-bold py-4 floor:py-5 px-8 floor:px-10 floor:text-xl display4k:text-2xl rounded-xl transition-colors shadow-[0_0_20px_rgba(255,107,74,0.3)] min-h-[56px] floor:min-h-[72px]">
              Contact for Wholesale Pricing
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {contactOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4 floor:p-6">
            <button
              type="button"
              aria-label="Close"
              className="absolute inset-0 border-0 bg-[#020814]/88 backdrop-blur-md"
              onClick={() => setContactOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex w-full max-w-md flex-col overflow-hidden rounded-t-3xl border border-white/[0.12] bg-[#050d1a] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_32px_90px_rgba(0,0,0,0.75)] sm:max-w-lg sm:rounded-3xl floor:max-w-xl">
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] bg-[#0a1524]/95 px-4 py-3 floor:px-5 floor:py-4">
                <h2
                  id="contact-modal-title"
                  className="text-base font-black text-white floor:text-lg">
                  Contact us
                </h2>
                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  className="touch-manipulation flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.08] text-white transition-colors hover:bg-white/[0.12] floor:h-12 floor:w-12">
                  <X className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                </button>
              </div>

              <div className="px-5 py-6 floor:px-7 floor:py-8">
                <div className="space-y-8 text-white">
                  <section>
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[#00E5C3] floor:text-base">
                      <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
                      Address
                    </h3>
                    <p className="whitespace-pre-line text-base font-semibold leading-relaxed text-white/90 floor:text-lg">
                      {WHOLESALE_CONTACT.addressLine1}
                      {'\n'}
                      {WHOLESALE_CONTACT.addressLine2}
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[#00E5C3] floor:text-base">
                      <Mail className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
                      Email Us
                    </h3>
                    <a
                      href={WHOLESALE_CONTACT.emailMailto}
                      className="text-base font-semibold text-white underline decoration-[#00E5C3]/50 underline-offset-4 transition-colors hover:text-[#00E5C3] floor:text-lg">
                      {WHOLESALE_CONTACT.emailDisplay}
                    </a>
                  </section>

                  <section>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[#00E5C3] floor:text-base">
                      <Phone className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
                      Call Us
                    </h3>
                    <ul className="space-y-4">
                      {WHOLESALE_CONTACT.phones.map(({ name, tel, display }) => (
                        <li key={name}>
                          <a
                            href={`tel:${tel}`}
                            className="group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg py-1 text-left transition-colors hover:text-[#00E5C3]">
                            <span className="font-semibold text-white/90 group-hover:text-[#00E5C3] floor:text-lg">
                              {name}
                            </span>
                            <span className="font-bold tabular-nums text-white group-hover:text-[#00E5C3] floor:text-lg">
                              {display}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
