import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Star as StarIcon,
  Users as UsersIcon,
  Globe as GlobeIcon,
  Award as AwardIcon,
  ChevronLeft,
  ChevronRight,
  Building2,
  Quote,
  Sparkles
} from 'lucide-react';
import { ScreenProps } from '../types';
import { BackButton } from './BackButton';

const testimonials = [
  {
    id: 1,
    company: 'Oceanic Aquariums',
    segment: 'Multi-store retail',
    region: 'U.S. · West Coast',
    quote:
      'The quality of corals we receive from Soflow is unmatched. Our customers are always blown away by the vibrant colors and health of every piece.',
    rating: 5,
    initials: 'OA',
    accent: 'from-[#4A9EFF] to-[#00E5C3]',
    ring: 'ring-[#4A9EFF]/40',
    glow: 'shadow-[0_0_60px_rgba(74,158,255,0.18)]'
  },
  {
    id: 2,
    company: 'Reef Builders Inc.',
    segment: 'Showroom & design',
    region: 'Canada',
    quote:
      'Consistent sizing, healthy specimens, and incredible support. They are our primary supplier—transparent origins and wholesale pricing we can stand behind.',
    rating: 5,
    initials: 'RB',
    accent: 'from-[#00E5C3] to-[#4A9EFF]',
    ring: 'ring-[#00E5C3]/40',
    glow: 'shadow-[0_0_60px_rgba(0,229,195,0.15)]'
  },
  {
    id: 3,
    company: 'Deep Blue Exotics',
    segment: 'Specialty boutique',
    region: 'EU · Mediterranean',
    quote:
      'Sustainable sourcing gives us confidence with our clients. The Australian Acroporas and LPS selections are simply stunning week after week.',
    rating: 5,
    initials: 'DB',
    accent: 'from-[#FF6B4A] to-[#FFB84D]',
    ring: 'ring-[#FF6B4A]/35',
    glow: 'shadow-[0_0_60px_rgba(255,107,74,0.16)]'
  }
] as const;

const stats = [
  {
    label: 'Partner stores',
    value: '500+',
    hint: 'Licensed retailers',
    icon: UsersIcon,
    color: 'text-[#FF6B4A]',
    bg: 'bg-[#FF6B4A]/12',
    border: 'border-[#FF6B4A]/25'
  },
  {
    label: 'Regions served',
    value: '30+',
    hint: 'Import corridors',
    icon: GlobeIcon,
    color: 'text-[#00E5C3]',
    bg: 'bg-[#00E5C3]/12',
    border: 'border-[#00E5C3]/25'
  },
  {
    label: 'Years wholesale',
    value: '10+',
    hint: 'Marine specialty',
    icon: AwardIcon,
    color: 'text-[#4A9EFF]',
    bg: 'bg-[#4A9EFF]/12',
    border: 'border-[#4A9EFF]/25'
  }
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 28 }
  }
};

export function CustomersScreen({ onNavigate }: ScreenProps) {
  const reduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  const go = useCallback(
    (dir: -1 | 1) => {
      setCurrentIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return testimonials.length - 1;
        if (next >= testimonials.length) return 0;
        return next;
      });
    },
    []
  );

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const active = testimonials[currentIndex];

  return (
    <div className="flex min-h-[100dvh] min-h-screen w-full flex-col bg-transparent">
      <header className="relative z-20 border-b border-white/[0.08] bg-[#050d1a]/70 px-4 py-4 backdrop-blur-2xl signage:px-10 signage:py-5 floor:px-14 floor:py-6 display4k:px-20">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5 floor:max-w-[2200px] display4k:max-w-[2800px] lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#4A9EFF]/30 bg-[#4A9EFF]/10 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 text-[#4A9EFF]" strokeWidth={2.5} aria-hidden />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#9ec5ff] signage:text-[10px]">
                Partner stories
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white signage:text-3xl floor:text-4xl display4k:text-5xl">
              Our{' '}
              <span className="bg-gradient-to-r from-[#4A9EFF] via-[#00E5C3] to-[#FF6B4A] bg-clip-text text-transparent">
                Customers
              </span>
            </h1>
            <p className="mt-2 max-w-xl text-sm font-medium text-white/50 signage:text-base floor:text-lg">
              Wholesale retailers who build showrooms and reputations on healthy livestock and honest sourcing.
            </p>
          </motion.div>
          <div className="w-full shrink-0 lg:max-w-md">
            <BackButton onClick={() => onNavigate('main')} />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 signage:px-10 signage:py-8 floor:max-w-[2200px] floor:px-14 floor:py-10 display4k:max-w-[2800px] display4k:px-20 display4k:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-5 floor:gap-7 lg:grid-cols-12 lg:gap-8">
          {/* Stats bento */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-12 lg:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`relative overflow-hidden rounded-2xl border ${stat.border} bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 shadow-lg backdrop-blur-xl floor:rounded-3xl floor:p-5`}>
                <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} floor:h-14 floor:w-14`}>
                  <stat.icon className={`h-5 w-5 floor:h-6 floor:w-6 ${stat.color}`} strokeWidth={2.25} aria-hidden />
                </div>
                <div className={`text-3xl font-black tabular-nums ${stat.color} floor:text-4xl display4k:text-5xl`}>
                  {stat.value}
                </div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 floor:text-xs">
                  {stat.label}
                </div>
                <p className="mt-0.5 text-[11px] font-medium text-white/40 floor:text-sm">{stat.hint}</p>
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/[0.04] blur-2xl"
                  aria-hidden
                />
              </div>
            ))}
          </motion.div>

          {/* Left column — trust copy */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between rounded-[1.75rem] border border-white/[0.09] bg-[#0a1524]/60 p-5 shadow-[0_24px_64px_rgba(0,0,0,0.35)] backdrop-blur-md signage:p-7 lg:col-span-5 floor:rounded-[2rem] floor:p-8">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[#00E5C3]">
                <Building2 className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/45 floor:text-xs">
                  Built for retailers
                </span>
              </div>
              <h2 className="text-xl font-black leading-snug text-white floor:text-2xl display4k:text-3xl">
                Trusted by serious aquatic businesses
              </h2>
              <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-white/55 floor:text-base">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E5C3]" aria-hidden />
                  Consistent grading, acclimation notes, and origin transparency on every shipment.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B4A]" aria-hidden />
                  Dedicated wholesale support—not a consumer checkout dressed up as B2B.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A9EFF]" aria-hidden />
                  Partners from single showrooms to multi-door chains across North America &amp; Europe.
                </li>
              </ul>
            </div>
            <p className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-xs font-semibold text-white/45 floor:text-sm">
              Stories rotate automatically—use arrows or tap a partner card to jump.
            </p>
          </motion.div>

          {/* Spotlight + carousel */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 lg:col-span-7">
            <div
              className={`relative min-h-[280px] overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-gradient-to-br from-white/[0.07] to-white/[0.02] ring-1 ${active.ring} ${active.glow} backdrop-blur-xl floor:min-h-[320px] floor:rounded-[2rem] display4k:min-h-[380px]`}>
              <div
                className={`pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${active.accent} opacity-[0.15] blur-[70px]`}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/90 via-transparent to-transparent" aria-hidden />

              <div className="relative flex h-full flex-col p-5 signage:p-7 floor:p-9">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${active.accent} text-lg font-black text-white shadow-lg floor:h-20 floor:w-20 floor:text-xl`}>
                      {active.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white floor:text-xl display4k:text-2xl">
                        {active.company}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-white/45 floor:text-sm">
                        {active.segment}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-[#00E5C3]/90 floor:text-xs">
                        {active.region}
                      </p>
                    </div>
                  </div>
                  <Quote className="h-10 w-10 shrink-0 text-white/[0.08] floor:h-12 floor:w-12" strokeWidth={1.25} aria-hidden />
                </div>

                <div className="flex gap-0.5">
                  {[...Array(active.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 w-5 fill-[#FFB84D] text-[#FFB84D] drop-shadow-[0_0_8px_rgba(255,184,77,0.35)] floor:h-6 floor:w-6"
                      aria-hidden
                    />
                  ))}
                </div>

                <div className="relative mt-5 flex-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.blockquote
                      key={active.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="text-base font-medium leading-relaxed text-white/90 signage:text-lg floor:text-xl display4k:text-2xl">
                      {active.quote}
                    </motion.blockquote>
                  </AnimatePresence>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                    {currentIndex + 1} / {testimonials.length}
                  </span>
                  <div className="flex gap-2">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => go(-1)}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] text-white transition-colors hover:bg-white/[0.1] floor:h-14 floor:w-14 touch-manipulation"
                      aria-label="Previous testimonial">
                      <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => go(1)}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] text-white transition-colors hover:bg-white/[0.1] floor:h-14 floor:w-14 touch-manipulation"
                      aria-label="Next testimonial">
                      <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner picker cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.button
                  key={t.id}
                  type="button"
                  layout
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentIndex(i)}
                  className={`touch-manipulation rounded-2xl border p-4 text-left transition-all floor:rounded-3xl floor:p-5 ${
                    i === currentIndex
                      ? `border-white/20 bg-white/[0.1] ring-2 ${t.ring}`
                      : 'border-white/[0.07] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.05]'
                  }`}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${t.accent} text-xs font-black text-white floor:h-12 floor:w-12 floor:text-sm`}>
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white floor:text-base">{t.company}</p>
                      <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-white/40 floor:text-xs">
                        {t.segment}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
