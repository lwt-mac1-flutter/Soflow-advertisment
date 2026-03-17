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
      className="flex items-center gap-3 signage:gap-4 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] text-white px-4 py-3 signage:px-6 signage:py-4 rounded-2xl shadow-lg min-h-[64px] signage:min-h-[80px] w-full active:bg-white/[0.12] transition-colors">
      
      <div className="bg-[#FF6B4A]/20 p-3 rounded-full text-[#FF6B4A] shadow-[0_0_15px_rgba(255,107,74,0.3)]">
        <ArrowLeftIcon size={28} strokeWidth={3} />
      </div>
      <span className="text-lg signage:text-xl font-bold tracking-wide">{label}</span>
    </motion.button>);

}