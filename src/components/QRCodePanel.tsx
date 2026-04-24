import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { qrCodeImageForUrl } from '../constants/registrationForm';
import { useRegisterScreenPublicUrl } from '../hooks/useRegisterScreenPublicUrl';

const HOME_QR_PX = 640;

export function QRCodePanel() {
  const registerUrl = useRegisterScreenPublicUrl();
  const homeQrSrc = useMemo(
    () => qrCodeImageForUrl(registerUrl, HOME_QR_PX),
    [registerUrl]
  );
  const hostHint = useMemo(() => {
    try {
      return new URL(registerUrl).host;
    } catch {
      return '';
    }
  }, [registerUrl]);

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div
        className="pointer-events-none absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-[#FF6B4A]/20 via-[#00E5C3]/15 to-[#4A9EFF]/20 blur-2xl floor:-inset-2 floor:blur-3xl"
        aria-hidden
      />
      <motion.a
        href={registerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col items-stretch overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-white/[0.08] p-4 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-[#00E5C3]/30 hover:bg-white/[0.1] sm:flex-row sm:items-center sm:gap-8 signage:p-6 signage:gap-10 floor:rounded-[2rem] floor:p-8 floor:gap-12"
        aria-label="Open Register now on your phone in a new tab"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.995 }}
        animate={{
          boxShadow: [
            '0 12px 40px rgba(0,0,0,0.25),0 0 0 1px rgba(255,255,255,0.06)',
            '0 20px 56px rgba(0,229,195,0.12),0 0 0 1px rgba(0,229,195,0.12)',
            '0 12px 40px rgba(0,0,0,0.25),0 0 0 1px rgba(255,255,255,0.06)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="flex justify-center sm:shrink-0 sm:justify-start">
          <div className="relative">
            <motion.div
              className="absolute -inset-3 rounded-3xl border-2 border-[#FF6B4A]/40"
              animate={{
                scale: [1, 1.04, 1],
                opacity: [0.35, 0.7, 0.35]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              aria-hidden
            />
            <div className="absolute -inset-1 rounded-[1.35rem] bg-gradient-to-br from-[#FF6B4A]/30 via-white/10 to-[#00E5C3]/30 opacity-80 blur-md group-hover:opacity-100" aria-hidden />
            <div className="relative rounded-2xl border-2 border-white/30 bg-white p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.2)] sm:p-3 floor:p-3.5">
              <img
                src={homeQrSrc}
                alt="QR code — scan to open Register now on your phone"
                className="h-[min(52vw,220px)] w-[min(52vw,220px)] object-contain sm:h-52 sm:w-52 signage:h-56 signage:w-56 floor:h-64 floor:w-64 display4k:h-72 display4k:w-72"
                width={HOME_QR_PX}
                height={HOME_QR_PX}
                decoding="async"
                loading="eager"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex min-w-0 flex-1 flex-col justify-center text-center sm:mt-0 sm:text-left">
          <p className="mb-1 inline-flex items-center justify-center gap-2 sm:justify-start">
            <Sparkles className="h-4 w-4 text-[#00E5C3] floor:h-5 floor:w-5" strokeWidth={2.5} aria-hidden />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6ee7d8] signage:text-xs floor:text-sm">
              Register on your phone
            </span>
          </p>
          <h3 className="text-2xl font-black tracking-tight text-white signage:text-3xl floor:text-4xl display4k:text-5xl">
            Scan to <span className="text-[#FFB84D]">register</span>
          </h3>
          <p className="mt-2 text-base font-medium leading-snug text-white/70 signage:text-lg floor:text-xl display4k:text-2xl">
            Opens this app’s <span className="text-white/90">Register now</span> form on your phone (same screen as the kiosk).
          </p>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold text-[#00E5C3]/80 sm:justify-start floor:text-base">
            <span className="truncate text-white/50">{hostHint || 'This site'}</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2.5} aria-hidden />
          </p>
        </div>
      </motion.a>
    </div>
  );
}
