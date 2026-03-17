import React, { Children } from 'react';
import { motion } from 'framer-motion';
import {
  Shell as ShellIcon,
  Globe as GlobeIcon,
  ClipboardList as ClipboardListIcon,
  Users as UsersIcon } from
'lucide-react';
import { ScreenProps } from '../types';
import { QRCodePanel } from './QRCodePanel';
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};
export function MainScreen({ onNavigate }: ScreenProps) {
  const menuBlocks = [
  {
    id: 'products',
    title: 'Our Products',
    subtitle: 'Browse Catalog',
    icon: ShellIcon,
    color: 'text-[#FF6B4A]',
    bg: 'bg-[#FF6B4A]/10',
    shadow: 'shadow-[0_0_20px_rgba(255,107,74,0.3)]',
    borderLeft: 'border-l-[#FF6B4A]',
    screen: 'products' as const
  },
  {
    id: 'map',
    title: 'Where We Import',
    subtitle: 'Global Sources',
    icon: GlobeIcon,
    color: 'text-[#00E5C3]',
    bg: 'bg-[#00E5C3]/10',
    shadow: 'shadow-[0_0_20px_rgba(0,229,195,0.3)]',
    borderLeft: 'border-l-[#00E5C3]',
    screen: 'map' as const
  },
  {
    id: 'register',
    title: 'How to Register',
    subtitle: 'Join Network',
    icon: ClipboardListIcon,
    color: 'text-[#FFB84D]',
    bg: 'bg-[#FFB84D]/10',
    shadow: 'shadow-[0_0_20px_rgba(255,184,77,0.3)]',
    borderLeft: 'border-l-[#FFB84D]',
    screen: 'register' as const
  },
  {
    id: 'customers',
    title: 'Our Customers',
    subtitle: 'Success Stories',
    icon: UsersIcon,
    color: 'text-[#4A9EFF]',
    bg: 'bg-[#4A9EFF]/10',
    shadow: 'shadow-[0_0_20px_rgba(74,158,255,0.3)]',
    borderLeft: 'border-l-[#4A9EFF]',
    screen: 'customers' as const
  }];

  return (
    <div className="flex flex-col h-full w-full bg-transparent">
      {/* Header Bar */}
      <div className="bg-white/[0.03] backdrop-blur-2xl border-b border-white/[0.08] pt-6 pb-4 px-6 signage:pt-8 signage:pb-5 signage:px-12 z-20 relative">
        <div className="flex items-center justify-center">
          <img
            src="/logo.webp"
            alt="Logo"
            className="h-20 signage:h-28 w-auto object-contain max-w-[90vw]"
          />
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-[28vh] min-h-[180px] signage:h-[32vh] -mt-4 signage:-mt-6 z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-0">
          
          <img
            src="https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=1920&q=90"
            alt="Beautiful Coral Reef"
            className="w-full h-full object-cover object-center opacity-80 mix-blend-screen"
            loading="eager"
            decoding="async" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-[#050d1a]/60 to-transparent" />
        </motion.div>

        {/* Animated Gradient Mesh Overlay */}
        <motion.div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          animate={{
            background: [
            'radial-gradient(circle at 20% 80%, #00E5C3 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, #FF6B4A 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, #00E5C3 0%, transparent 50%)']

          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear'
          }} />
        

        <div className="absolute bottom-6 left-0 right-0 px-6 signage:bottom-8 signage:px-12 text-center z-10">
          <h2 className="text-white text-3xl signage:text-4xl font-black tracking-wide drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            Premium Marine Life
          </h2>
          <p className="text-[#00E5C3] text-lg signage:text-xl font-bold mt-2 tracking-wider drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            SUSTAINABLY SOURCED
          </p>
        </div>
      </div>

      {/* Interactive Blocks */}
      <motion.div
        className="flex-1 px-4 py-3 signage:px-12 signage:py-6 flex flex-col justify-center z-20 -mt-6 signage:-mt-8 max-w-[1400px] mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        
        <div className="grid grid-cols-2 gap-4 signage:gap-6 mb-6 signage:mb-8">
          {menuBlocks.map((block) =>
          <motion.button
            key={block.id}
            variants={itemVariants}
            whileTap={{
              scale: 0.96
            }}
            onClick={() => onNavigate(block.screen)}
            className={`bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] border-l-4 ${block.borderLeft} rounded-3xl p-4 signage:p-6 flex flex-col items-center justify-center gap-3 signage:gap-5 min-h-[140px] signage:min-h-[170px] relative overflow-hidden group`}>
            
              <div
              className={`absolute inset-0 ${block.bg} opacity-0 group-active:opacity-100 transition-opacity`} />
            
              <div
              className={`w-14 h-14 signage:w-[72px] signage:h-[72px] rounded-full ${block.bg} flex items-center justify-center shrink-0 ${block.shadow} relative z-10`}>
              
                <block.icon
                size={36}
                className={block.color}
                strokeWidth={2.5} />
              
              </div>
              <div className="text-center relative z-10">
                <h3 className="text-white text-lg signage:text-xl font-bold leading-tight mb-1 tracking-wide">
                  {block.title}
                </h3>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                  {block.subtitle}
                </p>
              </div>
            </motion.button>
          )}
        </div>

        {/* QR Code Panel */}
        <motion.div variants={itemVariants}>
          <QRCodePanel />
        </motion.div>
      </motion.div>
    </div>);

}