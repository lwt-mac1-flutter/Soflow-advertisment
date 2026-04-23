import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
interface BackButtonProps {
  onClick: () => void;
  label?: string;
  /** Use on light backgrounds (e.g. WYSIWYG gallery) */
  variant?: 'dark' | 'light';
}
export function BackButton({
  onClick,
  label = 'Back to Menu',
  variant = 'dark'
}: BackButtonProps) {
  const isLight = variant === 'light';
  return (
    <motion.button
      whileTap={{
        scale: 0.95
      }}
      onClick={onClick}
      className={
        isLight
          ? 'flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 min-h-[44px] touch-manipulation sm:gap-3 sm:px-4 sm:text-base'
          : 'flex items-center gap-3 signage:gap-4 floor:gap-5 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] text-white px-4 py-3 signage:px-6 signage:py-4 floor:px-8 floor:py-5 rounded-2xl shadow-lg min-h-[64px] signage:min-h-[80px] floor:min-h-[88px] display4k:min-h-[100px] w-full active:bg-white/[0.12] transition-colors touch-manipulation'
      }>
      <div
        className={
          isLight
            ? 'flex h-8 w-8 items-center justify-center rounded-full bg-[#3a6bb8]/10 text-[#3a6bb8] sm:h-9 sm:w-9'
            : 'bg-[#FF6B4A]/20 p-3 floor:p-4 rounded-full text-[#FF6B4A] shadow-[0_0_15px_rgba(255,107,74,0.3)]'
        }>
        <ArrowLeftIcon
          className={
            isLight
              ? 'h-4 w-4 sm:h-5 sm:w-5'
              : 'h-7 w-7 floor:h-8 floor:w-8 display4k:h-10 display4k:w-10'
          }
          strokeWidth={isLight ? 2.5 : 3}
        />
      </div>
      <span
        className={
          isLight
            ? 'max-w-[9rem] truncate sm:max-w-none sm:whitespace-normal'
            : 'text-lg signage:text-xl floor:text-2xl display4k:text-[1.65rem] font-bold tracking-wide'
        }>
        {label}
      </span>
    </motion.button>);

}