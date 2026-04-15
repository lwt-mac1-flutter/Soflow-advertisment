import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
interface BackButtonProps {
  onClick: () => void;
  label?: string;
}
export function BackButton({
  onClick,
  label = 'Back to Menu'
}: BackButtonProps) {
  return (
    <motion.button
      whileTap={{
        scale: 0.95
      }}
      onClick={onClick}
      className="flex items-center gap-3 signage:gap-4 floor:gap-5 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] text-white px-4 py-3 signage:px-6 signage:py-4 floor:px-8 floor:py-5 rounded-2xl shadow-lg min-h-[64px] signage:min-h-[80px] floor:min-h-[88px] display4k:min-h-[100px] w-full active:bg-white/[0.12] transition-colors touch-manipulation">
      
      <div className="bg-[#FF6B4A]/20 p-3 floor:p-4 rounded-full text-[#FF6B4A] shadow-[0_0_15px_rgba(255,107,74,0.3)]">
        <ArrowLeftIcon className="h-7 w-7 floor:h-8 floor:w-8 display4k:h-10 display4k:w-10" strokeWidth={3} />
      </div>
      <span className="text-lg signage:text-xl floor:text-2xl display4k:text-[1.65rem] font-bold tracking-wide">{label}</span>
    </motion.button>);

}