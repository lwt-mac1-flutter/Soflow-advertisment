import React from 'react';
import { motion } from 'framer-motion';
import { ScreenProps } from '../types';
import { BackButton } from './BackButton';
import { products } from '../data/products';

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 30
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 25
    }
  }
};
export function ProductsScreen({ onNavigate }: ScreenProps) {
  return (
    <div className="flex flex-col h-full w-full bg-transparent">
      {/* Header */}
      <div className="bg-white/[0.03] backdrop-blur-2xl border-b border-white/[0.08] pt-6 pb-4 px-6 signage:pt-8 signage:pb-5 signage:px-12 z-20 relative">
        <h2 className="text-2xl signage:text-3xl font-black text-white mb-2 tracking-wide">
          Our Products
        </h2>
        <div className="w-16 h-1 bg-[#FF6B4A] rounded-full mb-6 shadow-[0_0_10px_rgba(255,107,74,0.5)]" />
        <BackButton onClick={() => onNavigate('main')} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 signage:px-12 signage:py-8 pb-24 signage:pb-32">
        <motion.div
          className="grid grid-cols-2 gap-4 signage:gap-6 max-w-[1400px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          
          {products.map((product) =>
          <motion.div
            key={product.id}
            variants={cardVariants}
            whileTap={{
              scale: 0.96
            }}
            className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            
              <div className="h-36 signage:h-48 w-full overflow-hidden relative">
                <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                loading="lazy" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 right-3 bg-white/[0.15] backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[#FF6B4A] font-black text-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                  {product.price}
                </div>
              </div>
              <div className="p-4 signage:p-5 flex-1 flex flex-col justify-between relative z-10 -mt-6">
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight mb-2 drop-shadow-md">
                    {product.name}
                  </h3>
                  <p className="text-white/60 text-sm leading-snug font-medium">
                    {product.desc}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('product-details', product.id)}
                  className="mt-5 w-full bg-white/[0.05] border border-[#FF6B4A]/50 text-[#FF6B4A] font-bold py-3 rounded-xl min-h-[48px] active:bg-[#FF6B4A]/20 transition-colors"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>);

}