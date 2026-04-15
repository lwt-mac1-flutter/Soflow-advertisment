import React from 'react';
import { motion } from 'framer-motion';

/** Shared wholesale portal QR — file: public/qr-code.png */
export const QR_CODE_SRC = '/qr-code.png';

export function QRCodePanel() {
  return (
    <motion.div
      className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-4 signage:p-6 floor:p-8 floor:rounded-[2rem] flex items-center gap-4 signage:gap-6 floor:gap-8 display4k:gap-10 relative overflow-hidden"
      animate={{
        boxShadow: [
          '0px 10px 30px rgba(255, 107, 74, 0.05)',
          '0px 10px 40px rgba(255, 107, 74, 0.15)',
          '0px 10px 30px rgba(255, 107, 74, 0.05)'
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}>
      <div className="relative w-24 h-24 signage:w-32 signage:h-32 floor:w-40 floor:h-40 display4k:w-48 display4k:h-48 shrink-0 flex items-center justify-center">
        <motion.div
          className="absolute inset-[-8px] rounded-2xl border-2 border-[#FF6B4A]"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.75, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          aria-hidden
        />
        <div className="relative z-10 h-full w-full overflow-hidden rounded-xl border border-white/25 bg-white p-1.5 shadow-inner">
          <img
            src={QR_CODE_SRC}
            alt="QR code to open wholesale registration"
            className="h-full w-full object-contain"
            width={256}
            height={256}
            decoding="async"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center z-10 min-w-0">
        <h3 className="text-xl signage:text-2xl floor:text-3xl display4k:text-4xl font-black text-white mb-1 floor:mb-2 tracking-wide">
          Scan to Register
        </h3>
        <p className="text-white/60 text-base signage:text-lg floor:text-xl display4k:text-2xl font-medium leading-tight">
          Get instant access to our wholesale catalog & pricing.
        </p>
      </div>
    </motion.div>
  );
}
