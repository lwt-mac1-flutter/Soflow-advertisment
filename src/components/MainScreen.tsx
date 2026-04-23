import React, { useCallback, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring
} from 'framer-motion';
import {
  Fish as ProductsIcon,
  Globe as GlobeIcon,
  ClipboardList as ClipboardListIcon,
  Users as UsersIcon,
  ChevronRight
} from 'lucide-react';
import { ScreenProps } from '../types';
import { QRCodePanel } from './QRCodePanel';

/**
 * Hero: coral reef via YouTube embed (autoplay muted; nocookie domain).
 * Swap HERO_YOUTUBE_ID to change the clip. Thumbnail loads before the iframe.
 */
const HERO_YOUTUBE_ID = 'eHxbMa2RVTQ'; // Coral Reef Aquarium | 4K HDR (Mixkit-style kiosk-friendly loop)
const HERO_POSTER = `https://i.ytimg.com/vi/${HERO_YOUTUBE_ID}/maxresdefault.jpg`;

function heroYoutubeEmbedSrc(videoId: string): string {
  const q = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    loop: '1',
    playlist: videoId,
    iv_load_policy: '3',
    fs: '0',
    disablekb: '1'
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${q}`;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 26 }
  }
};

type MenuBlock = {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof ProductsIcon;
  color: string;
  bg: string;
  glow: string;
  gradient: string;
  ring: string;
  screen: 'products' | 'map' | 'register' | 'customers';
  num: string;
};

function HeroVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [embedReady, setEmbedReady] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const parallaxX = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.4 });
  const parallaxY = useSpring(my, { stiffness: 90, damping: 18, mass: 0.4 });

  const useYoutube = !reduceMotion;

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduceMotion || !wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      mx.set(px * -28);
      my.set(py * -28);
    },
    [reduceMotion, mx, my]
  );

  const onPointerLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={wrapRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="absolute inset-0 cursor-default overflow-hidden">
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={
          reduceMotion
            ? undefined
            : {
                x: parallaxX,
                y: parallaxY,
                scale: 1.08
              }
        }>
        <motion.div
          className="absolute inset-0"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.07, 1]
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut'
          }}>
          <img
            src={HERO_POSTER}
            alt=""
            className="absolute inset-0 z-0 h-full w-full object-cover object-center brightness-[1.02] saturate-[1.15]"
            loading="eager"
            decoding="async"
          />

          {useYoutube && (
            <div className="absolute inset-0 z-[1] overflow-hidden brightness-[1.03] contrast-[1.06] saturate-[1.2]">
              <iframe
                title="Coral reef aquarium background video"
                src={heroYoutubeEmbedSrc(HERO_YOUTUBE_ID)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                loading="eager"
                onLoad={() => setEmbedReady(true)}
                className="pointer-events-none absolute left-1/2 top-1/2 min-h-[56.25vw] min-w-full border-0"
                style={{
                  width: '177.78vh',
                  height: '100%',
                  transform: 'translate(-50%, -50%)'
                }}
                aria-hidden
              />
            </div>
          )}

          <motion.div
            className="pointer-events-none absolute inset-0 z-[2] bg-[#050d1a]"
            initial={false}
            animate={{ opacity: useYoutube && !embedReady ? 0.45 : 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050d1a] via-[#050d1a]/55 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050d1a] via-transparent to-[#00E5C3]/10 mix-blend-soft-light" />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
        animate={
          reduceMotion
            ? undefined
            : {
                background: [
                  'radial-gradient(ellipse 80% 60% at 20% 70%, #00E5C3 0%, transparent 55%)',
                  'radial-gradient(ellipse 80% 60% at 75% 30%, #FF6B4A 0%, transparent 55%)',
                  'radial-gradient(ellipse 80% 60% at 20% 70%, #00E5C3 0%, transparent 55%)'
                ]
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      />
    </motion.div>
  );
}

export function MainScreen({ onNavigate }: ScreenProps) {
  const reduceMotion = useReducedMotion();

  const menuBlocks: MenuBlock[] = [
    {
      id: 'products',
      title: 'Our Products',
      subtitle: 'Sum of Our products',
      icon: ProductsIcon,
      color: 'text-[#FF6B4A]',
      bg: 'bg-[#FF6B4A]/12',
      glow: 'shadow-[0_0_40px_rgba(255,107,74,0.25)]',
      gradient: 'from-[#FF6B4A] to-[#ff9a7a]',
      ring: 'group-hover:shadow-[0_0_50px_rgba(255,107,74,0.35)]',
      screen: 'products',
      num: '01'
    },
    {
      id: 'map',
      title: 'Where We Import',
      subtitle: 'Global reef sources',
      icon: GlobeIcon,
      color: 'text-[#00E5C3]',
      bg: 'bg-[#00E5C3]/12',
      glow: 'shadow-[0_0_40px_rgba(0,229,195,0.2)]',
      gradient: 'from-[#00E5C3] to-[#4A9EFF]',
      ring: 'group-hover:shadow-[0_0_50px_rgba(0,229,195,0.3)]',
      screen: 'map',
      num: '02'
    },
    {
      id: 'register',
      title: 'Regsister Now',
      subtitle: 'Wholesale portal access',
      icon: ClipboardListIcon,
      color: 'text-[#FFB84D]',
      bg: 'bg-[#FFB84D]/12',
      glow: 'shadow-[0_0_40px_rgba(255,184,77,0.2)]',
      gradient: 'from-[#FFB84D] to-[#FF6B4A]',
      ring: 'group-hover:shadow-[0_0_50px_rgba(255,184,77,0.3)]',
      screen: 'register',
      num: '03'
    },
    {
      id: 'customers',
      title: 'Our Customers',
      subtitle: 'Retail partners & stories',
      icon: UsersIcon,
      color: 'text-[#4A9EFF]',
      bg: 'bg-[#4A9EFF]/12',
      glow: 'shadow-[0_0_40px_rgba(74,158,255,0.2)]',
      gradient: 'from-[#4A9EFF] to-[#00E5C3]',
      ring: 'group-hover:shadow-[0_0_50px_rgba(74,158,255,0.3)]',
      screen: 'customers',
      num: '04'
    }
  ];

  return (
    <div className="relative flex min-h-[100dvh] min-h-screen w-full flex-col overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-[20%] top-0 h-[85%] w-[70%] rounded-full bg-[#00E5C3]/[0.07] blur-[120px]" />
        <div className="absolute -right-[15%] bottom-[10%] h-[60%] w-[55%] rounded-full bg-[#FF6B4A]/[0.06] blur-[100px]" />
        <div className="absolute left-1/2 top-[35%] h-px w-[min(90%,64rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <header className="relative z-30 border-b border-white/[0.07] bg-[#050d1a]/70 px-4 py-2.5 backdrop-blur-2xl signage:px-10 signage:py-3 floor:px-12 floor:py-3.5 display4k:px-16 display4k:py-4">
        <div className="relative mx-auto flex max-w-[1400px] floor:max-w-[2200px] display4k:max-w-[2800px] flex-col items-center justify-center gap-2 sm:gap-4">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center px-3 py-1.5">
            <img
              src="/logo.webp"
              alt="Logo"
              className="h-16 w-auto object-contain drop-shadow-[0_0_14px_rgba(0,229,195,0.35)] sm:h-20 signage:h-24 floor:h-[6rem] display4k:h-32 max-w-[min(95vw,620px)]"
            />
          </motion.div>
        </div>
      </header>

      <section className="relative z-10 -mt-px px-4 pb-2 pt-1.5 signage:px-8 floor:px-12 display4k:px-16">
        <div
          className="relative mx-auto max-w-[1400px] floor:max-w-[2200px] display4k:max-w-[2800px] overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#0a1524]/50 shadow-[0_32px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:rounded-[2rem] floor:rounded-[2.5rem]">
          <div className="relative h-[min(72vh,1100px)] min-h-[520px] floor:h-[min(74vh,1200px)] floor:min-h-[660px] display4k:min-h-[780px]">
            <HeroVisual reduceMotion={!!reduceMotion} />

            <div className="absolute inset-0 flex flex-col justify-end p-6 signage:p-10 floor:p-12 display4k:p-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.55 }}>
                <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#00E5C3] floor:text-xs">
                  <span className="h-px w-8 bg-gradient-to-r from-[#00E5C3] to-transparent" aria-hidden />
                  Soflow experience
                </p>
                <h1 className="max-w-[18ch] text-3xl font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] signage:text-4xl floor:text-5xl display4k:text-6xl">
                  Premium{' '}
                  <span className="bg-gradient-to-r from-[#00E5C3] via-white to-[#FF6B4A] bg-clip-text text-transparent">
                    marine life
                  </span>
                  <br />
                  <span className="text-white/90">for serious retailers.</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-white/60 signage:text-base floor:text-lg display4k:text-xl">
                  Sustainably sourced corals and livestock—transparent origins, wholesale-only access,
                  and a catalog built for your showroom floor.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <motion.div
        className="relative z-20 mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 signage:px-12 signage:py-8 floor:px-16 display4k:px-20 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.28em] text-white/35">
              Explore
            </h2>
            <p className="mt-1 text-lg font-bold text-white floor:text-xl display4k:text-2xl">
              Choose where to go next
            </p>
          </div>
          <p className="text-sm text-white/40 floor:text-base">Licensed aquatic retailers</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 floor:gap-7 lg:grid-cols-4 lg:gap-5 floor:lg:gap-6">
          {menuBlocks.map((block) => (
            <motion.button
              key={block.id}
              type="button"
              layout
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { type: 'spring', stiffness: 420, damping: 22 }
              }}
              whileTap={{
                scale: 0.96,
                transition: { type: 'spring', stiffness: 500, damping: 28 }
              }}
              onClick={() => onNavigate(block.screen)}
              className={`touch-manipulation group relative flex min-h-[160px] flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-5 text-left shadow-xl backdrop-blur-xl floor:min-h-[200px] floor:rounded-3xl floor:p-7 display4k:min-h-[240px] display4k:p-8 ${block.ring}`}>
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${block.gradient} opacity-0`}
                initial={false}
                whileHover={{ opacity: 0.12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
              />
              <div
                className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${block.gradient} opacity-90`}
                aria-hidden
              />
              <div className="absolute right-4 top-4 text-4xl font-black tabular-nums text-white/[0.06] transition-colors group-hover:text-white/10 floor:text-5xl">
                {block.num}
              </div>
              <motion.div
                className={`relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${block.bg} ${block.glow} floor:h-16 floor:w-16 display4k:h-20 display4k:w-20`}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { rotate: [0, -4, 4, 0], transition: { duration: 0.55 } }
                }>
                <block.icon
                  className={`h-7 w-7 floor:h-9 floor:w-9 display4k:h-11 display4k:w-11 ${block.color}`}
                  strokeWidth={2.25}
                />
              </motion.div>
              <h3 className="relative z-10 text-xl font-black leading-tight text-white floor:text-2xl display4k:text-3xl">
                {block.title}
              </h3>
              <p className="relative z-10 mt-1 text-base font-semibold text-white/55 floor:text-lg display4k:text-xl">
                {block.subtitle}
              </p>
              <div className="relative z-10 mt-auto flex items-center gap-1 pt-4 text-sm font-bold uppercase tracking-[0.14em] text-white/45 transition-colors group-hover:text-[#00E5C3] floor:text-base display4k:text-lg">
                Open
                <motion.span
                  initial={false}
                  className="inline-flex"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </motion.span>
              </div>
              <div
                className={`pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br ${block.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
                aria-hidden
              />
            </motion.button>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-8 floor:mt-10">
          <QRCodePanel />
        </motion.div>
      </motion.div>
    </div>
  );
}
