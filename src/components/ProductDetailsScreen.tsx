import React from 'react';
import { motion } from 'framer-motion';
import { BackButton } from './BackButton';
import { products } from '../data/products';

interface ProductDetailsScreenProps {
  productId: number;
  onNavigate: (screen: 'products' | 'main') => void;
}

export function ProductDetailsScreen({ productId, onNavigate }: ProductDetailsScreenProps) {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="flex flex-col h-full w-full bg-transparent items-center justify-center p-8">
        <p className="text-gray-600 dark:text-white/70 text-lg mb-6">Product not found.</p>
        <BackButton onClick={() => onNavigate('products')} label="Back to Products" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-transparent">
      {/* Header */}
      <div className="bg-gray-100/90 dark:bg-white/[0.03] backdrop-blur-2xl border-b border-gray-200 dark:border-white/[0.08] pt-6 pb-4 px-6 signage:pt-8 signage:pb-5 signage:px-12 z-20 relative">
        <h2 className="text-2xl signage:text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-wide">
          Product Details
        </h2>
        <div className="w-16 h-1 bg-[#FF6B4A] rounded-full mb-6 shadow-[0_0_10px_rgba(255,107,74,0.5)]" />
        <BackButton onClick={() => onNavigate('products')} label="Back to Products" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 signage:px-12 signage:py-8 pb-24 max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 dark:bg-white/[0.06] backdrop-blur-xl border border-gray-200 dark:border-white/[0.08] rounded-3xl overflow-hidden shadow-lg dark:shadow-2xl flex flex-col signage:flex-row"
        >
          {/* Image Section */}
          <div className="relative w-full signage:w-1/2 min-h-[240px] signage:min-h-[400px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center min-w-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#050d1a] via-transparent to-transparent opacity-60" />
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-white/[0.15] backdrop-blur-md border border-gray-200 dark:border-white/20 px-4 py-2 rounded-full text-[#FF6B4A] font-black text-lg shadow-md">
              {product.price}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 signage:p-10 flex-1 flex flex-col justify-center">
            <h1 className="text-3xl signage:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              {product.name}
            </h1>
            <p className="text-lg signage:text-xl text-gray-600 dark:text-white/70 font-medium mb-6 leading-relaxed">
              {product.longDesc ?? product.desc}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-1 signage:grid-cols-3 gap-4 mb-8">
              {product.origin && (
                <div className="bg-gray-100/80 dark:bg-white/[0.06] rounded-2xl p-4 border border-gray-200 dark:border-white/[0.08]">
                  <p className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-widest mb-1">
                    Origin
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{product.origin}</p>
                </div>
              )}
              {product.careLevel && (
                <div className="bg-gray-100/80 dark:bg-white/[0.06] rounded-2xl p-4 border border-gray-200 dark:border-white/[0.08]">
                  <p className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-widest mb-1">
                    Care Level
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{product.careLevel}</p>
                </div>
              )}
              {product.lighting && (
                <div className="bg-gray-100/80 dark:bg-white/[0.06] rounded-2xl p-4 border border-gray-200 dark:border-white/[0.08]">
                  <p className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-widest mb-1">
                    Lighting
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{product.lighting}</p>
                </div>
              )}
            </div>

            <button className="w-full signage:w-auto signage:min-w-[200px] bg-[#FF6B4A] hover:bg-[#ff7a5c] text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-[0_0_20px_rgba(255,107,74,0.3)]">
              Contact for Wholesale Pricing
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
