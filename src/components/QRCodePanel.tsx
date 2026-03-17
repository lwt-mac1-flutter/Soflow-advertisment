import React from 'react';
import { motion } from 'framer-motion';
export function QRCodePanel() {
  return (
    <motion.div
      className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-4 signage:p-6 flex items-center gap-4 signage:gap-6 relative overflow-hidden"
      animate={{
        boxShadow: [
        '0px 10px 30px rgba(255, 107, 74, 0.05)',
        '0px 10px 40px rgba(255, 107, 74, 0.15)',
        '0px 10px 30px rgba(255, 107, 74, 0.05)']

      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}>
      
      {/* CSS-based QR Code representation */}
      <div className="relative w-24 h-24 signage:w-28 signage:h-28 shrink-0 flex items-center justify-center">
        {/* Animated pulsing ring */}
        <motion.div
          className="absolute inset-[-8px] rounded-2xl border-2 border-[#FF6B4A]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />
        

        <div className="relative w-full h-full bg-[#0a1a2e] p-2 rounded-xl border border-white/20 flex flex-col justify-between z-10">
          <div className="flex justify-between">
            <div className="w-7 h-7 border-[5px] border-white rounded-sm flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white" />
            </div>
            <div className="w-7 h-7 border-[5px] border-white rounded-sm flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white" />
            </div>
          </div>

          <div className="flex justify-center gap-1.5 my-1 px-1 flex-wrap">
            <div className="w-3 h-3 bg-white rounded-sm" />
            <div className="w-3 h-3 bg-white rounded-sm" />
            <div className="w-4 h-3 bg-white rounded-sm" />
            <div className="w-3 h-4 bg-white rounded-sm" />
            <div className="w-5 h-3 bg-white rounded-sm" />
          </div>

          <div className="flex justify-between items-end">
            <div className="w-7 h-7 border-[5px] border-white rounded-sm flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white" />
            </div>
            <div className="w-10 h-8 flex flex-wrap gap-1.5 justify-end content-end">
              <div className="w-3 h-3 bg-white rounded-sm" />
              <div className="w-4 h-3 bg-white rounded-sm" />
              <div className="w-3 h-3 bg-white rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center z-10">
        <h3 className="text-xl signage:text-2xl font-black text-white mb-1 tracking-wide">
          Scan to Register
        </h3>
        <p className="text-white/60 text-base signage:text-lg font-medium leading-tight">
          Get instant access to our wholesale catalog & pricing.
        </p>
      </div>
    </motion.div>);

}