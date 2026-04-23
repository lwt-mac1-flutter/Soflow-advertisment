import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  MapPin as MapPinIcon,
  X as XIcon,
  Droplets,
  Package,
  Leaf,
  Sparkles,
  Globe2,
  Route,
  ShieldCheck,
  ChevronRight,
  Plane
} from 'lucide-react';
import { ScreenProps } from '../types';
import { BackButton } from './BackButton';

type MarkerTone = 'coral' | 'teal' | 'blue' | 'amber';

type ImportLocation = {
  id: string;
  name: string;
  /** Shorter text on the map pin when the full name is too wide */
  mapLabel?: string;
  top: string;
  left: string;
  tone: MarkerTone;
  desc: string;
  specialties: string[];
  waterNote: string;
  supplyChain: string;
  sustainability: string;
};

const toneRing: Record<MarkerTone, string> = {
  coral: 'shadow-[0_0_0_2px_rgba(255,107,74,0.5)]',
  teal: 'shadow-[0_0_0_2px_rgba(0,229,195,0.45)]',
  blue: 'shadow-[0_0_0_2px_rgba(74,158,255,0.5)]',
  amber: 'shadow-[0_0_0_2px_rgba(255,184,77,0.5)]'
};

const toneFill: Record<MarkerTone, string> = {
  coral: 'text-[#FF6B4A]',
  teal: 'text-[#00E5C3]',
  blue: 'text-[#4A9EFF]',
  amber: 'text-[#FFB84D]'
};

const tonePulse: Record<MarkerTone, string> = {
  coral: 'bg-[#FF6B4A]',
  teal: 'bg-[#00E5C3]',
  blue: 'bg-[#4A9EFF]',
  amber: 'bg-[#FFB84D]'
};

const SOLE_IMPORTER_DISCLAIMER =
  'We have agreements to be the sole importers from certain suppliers.';

/** Hub airports — `top` / `left` as % of the map; `label` matches footer / chips */
const airportHubs = [
  {
    id: 'cgk',
    code: 'CGK',
    city: 'Jakarta',
    label: 'Jakarta (CGK)',
    blurb: 'Indonesia gateway: temp-mapped air freight, short dock time, and full documentation for reef-safe arrivals.',
    top: '52%',
    left: '64%'
  },
  {
    id: 'dps',
    code: 'DPS',
    city: 'Denpasar',
    label: 'DPS (Denpasar, Bali)',
    blurb: 'Bali entry for archipelago exports, interline handoffs, and alignment with farm pack schedules.',
    top: '65%',
    left: '86%'
  },
  {
    id: 'bne',
    code: 'BNE',
    city: 'Brisbane',
    label: 'BNE (Brisbane)',
    blurb: 'Queensland coast hub: health-aware handling and compliance-forward routing for Australian specialty lines.',
    top: '57%',
    left: '91%'
  },
  {
    id: 'per',
    code: 'PER',
    city: 'Perth',
    label: 'Perth, Australia (PER)',
    blurb: 'Western Australia port for vetted interline and domestic connections with careful timing for sensitive loads.',
    top: '75%',
    left: '61%'
  }
] as const;

const IMPORT_HUB_LINE = airportHubs.map((a) => a.label).join(' · ');

type HubAirport = (typeof airportHubs)[number];

const locations: ImportLocation[] = [
  {
    id: 'indonesia',
    name: 'Indonesia',
    top: '57%',
    left: '80%',
    tone: 'teal',
    desc: 'Coral-triangle and Indo-Pacific lines—mariculture, wild specialty, and inverts with vetted partners.',
    specialties: [
      'Maricultured SPS & LPS',
      'Soft corals & cleanup crews',
      'Export-grade packing out of Java & Bali'
    ],
    waterNote:
      'Indo-Pacific parameters; slow drip acclimation and stable alkalinity help color hold.',
    supplyChain:
      'Jakarta and DPS gateways, temp-mapped air freight, short dock time and full documentation.',
    sustainability:
      'We prioritize farm-raised and licensed wild harvest with clear chain of custody from supplier to you.'
  },
  {
    id: 'australia',
    name: 'Australia',
    top: '78%',
    left: '76%',
    tone: 'blue',
    desc: 'GBR and Australian specialty lines with strict compliance and health-aware routing.',
    specialties: [
      'Premium Australian LPS & SPS',
      'Permit-aware sourcing',
      'Seasonal rarity lists when available'
    ],
    waterNote:
      'Match salinity and temperature closely; allow a calm first day under moderate flow and PAR.',
    supplyChain:
      'Brisbane (BNE) and Perth (PER) are key entry points, with quarantine and paperwork aligned to regulations.',
    sustainability:
      'Sourcing follows Australian quotas, licensing, and traceability so availability always tracks the law.'
  },
  {
    id: 'malaysia-kl',
    name: 'Malaysia (Kuala Lumpur)',
    mapLabel: 'Malaysia (KL)',
    top: '44%',
    left: '75%',
    tone: 'coral',
    desc: 'Southeast Asia consolidation—fast links between farms, packers, and our cold chain into North America.',
    specialties: [
      'Regional mariculture and specialty frags',
      'Consolidation for mixed loads',
      'Rapid re-export coordination'
    ],
    waterNote:
      'Tropical, stable water profiles—drip new arrivals and confirm nutrients before high light or heavy feeding.',
    supplyChain:
      'KUL and regional air links to align with DPS, Jakarta, and interline schedules for reliable arrivals.',
    sustainability:
      'We work with suppliers who document origin and use responsible harvest or farm-raised stock.'
  },
  {
    id: 'belize',
    name: 'Belize',
    top: '43%',
    left: '25%',
    tone: 'amber',
    desc: 'Western Caribbean sourcing for Atlantic strains and showpiece corals with domestic-friendly routing when cleared.',
    specialties: [
      'Caribbean stony and soft corals',
      'Atlantic inverts and cleanup species',
      'Seasonal showpiece morphs when permitted'
    ],
    waterNote:
      'Caribbean chemistry can differ from Pacific—extend acclimation, test often, and adjust alk/Ca/Mg before ramping light.',
    supplyChain:
      'Regional air through approved hubs, Miami connections where applicable, and inspection-ready pack lists.',
    sustainability:
      'We follow licensed exporters and size limits, favoring programs that support reef and nursery recovery.'
  }
];

const stats = [
  {
    label: 'Source countries',
    value: `${locations.length}`,
    hint: 'Indonesia · Australia · Malaysia · Belize',
    icon: Globe2,
    color: 'text-[#00E5C3]',
    bg: 'bg-[#00E5C3]/12',
    border: 'border-[#00E5C3]/25'
  },
  {
    label: 'Hub airports',
    value: '4',
    hint: 'Jakarta · DPS · BNE · Perth',
    icon: Route,
    color: 'text-[#FF6B4A]',
    bg: 'bg-[#FF6B4A]/12',
    border: 'border-[#FF6B4A]/25'
  },
  {
    label: 'Traceability',
    value: '100%',
    hint: 'Documented chain',
    icon: ShieldCheck,
    color: 'text-[#4A9EFF]',
    bg: 'bg-[#4A9EFF]/12',
    border: 'border-[#4A9EFF]/25'
  }
] as const;

function RegionDetailBody({
  loc,
  onClose
}: {
  loc: ImportLocation;
  onClose: () => void;
}) {
  return (
    <>
      <div className="flex items-start gap-3 pr-10">
        <div
          className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 ${toneRing[loc.tone]} bg-[#050d1a]/80`}>
          <MapPinIcon
            className={toneFill[loc.tone]}
            size={26}
            fill="#050d1a"
            strokeWidth={2}
            aria-hidden
          />
        </div>
        <div className="min-w-0">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#00E5C3] signage:text-[11px]">
            Source region
          </p>
          <h3
            id="import-region-title"
            className="text-xl font-black tracking-tight text-white signage:text-2xl floor:text-3xl">
            {loc.name}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-white/45 floor:text-sm">
            Coral &amp; livestock origin
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
        <p className="text-sm font-medium leading-relaxed text-white/88 signage:text-base">
          {loc.desc}
        </p>
      </div>

      <p className="mt-3 rounded-xl border border-[#4A9EFF]/25 bg-[#4A9EFF]/8 px-3 py-2.5 text-xs font-medium leading-snug text-[#c5ddff] floor:text-sm">
        {SOLE_IMPORTER_DISCLAIMER}
      </p>

      <div className="mt-4">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 shrink-0 text-[#FFB84D]" strokeWidth={2.25} aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 floor:text-xs">
            Specialties
          </span>
        </div>
        <ul className="flex flex-wrap gap-2">
          {loc.specialties.map((tag) => (
            <li key={tag}>
              <span className="inline-block rounded-lg border border-[#00E5C3]/30 bg-[#00E5C3]/10 px-2.5 py-1 text-[10px] font-semibold text-[#b8fff0] signage:text-[11px] floor:text-xs">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 space-y-3">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3.5 floor:p-4">
          <div className="mb-2 flex items-center gap-2">
            <Droplets className="h-4 w-4 shrink-0 text-[#4A9EFF]" strokeWidth={2.25} aria-hidden />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/55 floor:text-xs">
              Water &amp; acclimation
            </span>
          </div>
          <p className="text-xs leading-relaxed text-white/78 floor:text-sm">{loc.waterNote}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3.5 floor:p-4">
          <div className="mb-2 flex items-center gap-2">
            <Package className="h-4 w-4 shrink-0 text-[#00E5C3]" strokeWidth={2.25} aria-hidden />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/55 floor:text-xs">
              Logistics &amp; handling
            </span>
          </div>
          <p className="text-xs leading-relaxed text-white/78 floor:text-sm">{loc.supplyChain}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3.5 floor:p-4">
          <div className="mb-2 flex items-center gap-2">
            <Leaf className="h-4 w-4 shrink-0 text-[#7AE582]" strokeWidth={2.25} aria-hidden />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/55 floor:text-xs">
              Sustainability
            </span>
          </div>
          <p className="text-xs leading-relaxed text-white/78 floor:text-sm">{loc.sustainability}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-6 flex w-full touch-manipulation items-center justify-center gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.06] py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/[0.1] lg:hidden floor:py-4 floor:text-base">
        Close details
        <XIcon className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </>
  );
}

const hubChipSelected = 'border-amber-400/50 bg-amber-400/15 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.35)]';

function AirportDetailBody({
  ap,
  onClose
}: {
  ap: HubAirport;
  onClose: () => void;
}) {
  return (
    <>
      <div className="flex items-start gap-3 pr-10">
        <div
          className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-400/35 bg-amber-400/10 shadow-[0_0_0_1px_rgba(251,191,36,0.12)]">
          <Plane className="h-6 w-6 text-amber-200" strokeWidth={2.25} aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-200/90 signage:text-[11px]">
            Hub airport
          </p>
          <h3
            id="import-airport-title"
            className="text-xl font-black tracking-tight text-white signage:text-2xl floor:text-3xl">
            {ap.label}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-white/45 floor:text-sm">
            {ap.code} · {ap.city} · import routing
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
        <p className="text-sm font-medium leading-relaxed text-white/88 signage:text-base">{ap.blurb}</p>
      </div>

      <p className="mt-3 rounded-xl border border-amber-400/25 bg-amber-400/8 px-3 py-2.5 text-xs font-medium leading-snug text-amber-100/90 floor:text-sm">
        {SOLE_IMPORTER_DISCLAIMER}
      </p>

      <button
        type="button"
        onClick={onClose}
        className="mt-6 flex w-full touch-manipulation items-center justify-center gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.06] py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/[0.1] lg:hidden floor:py-4 floor:text-base">
        Close details
        <XIcon className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </>
  );
}

function sidebarContentTransition(reduceMotion: boolean | null) {
  if (reduceMotion) {
    return {
      detail: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 }
      },
      list: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 }
      }
    };
  }
  return {
    detail: {
      initial: { opacity: 0, x: 36 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -28 },
      transition: { type: 'spring', stiffness: 380, damping: 32, mass: 0.85 }
    },
    list: {
      initial: { opacity: 0, x: -28 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 32 },
      transition: { type: 'spring', stiffness: 360, damping: 32, mass: 0.85 }
    }
  };
}

export function ImportMapScreen({ onNavigate }: ScreenProps) {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [activeAirportId, setActiveAirportId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduceMotion = useReducedMotion();
  const sideTx = sidebarContentTransition(reduceMotion);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const closePanel = useCallback(() => {
    setActiveLocation(null);
    setActiveAirportId(null);
  }, []);

  const active = activeLocation ? locations.find((l) => l.id === activeLocation) : null;
  const activeAirport = activeAirportId
    ? airportHubs.find((a) => a.id === activeAirportId) ?? null
    : null;

  const selectionBump = activeLocation ?? activeAirportId;

  return (
    <div className="flex min-h-[100dvh] min-h-screen w-full flex-col bg-transparent">
      <header className="relative z-20 border-b border-white/[0.08] bg-[#050d1a]/70 px-4 py-4 backdrop-blur-2xl signage:px-10 signage:py-5 floor:px-14 floor:py-6 display4k:px-20">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5 floor:max-w-[2200px] display4k:max-w-[2800px] lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#00E5C3]/30 bg-[#00E5C3]/10 px-3 py-1">
              <Globe2 className="h-3.5 w-3.5 text-[#00E5C3]" strokeWidth={2.5} aria-hidden />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#9ef7e8] signage:text-[10px]">
                Supply network
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white signage:text-3xl floor:text-4xl display4k:text-5xl">
              Where We{' '}
              <span className="bg-gradient-to-r from-[#00E5C3] via-white to-[#4A9EFF] bg-clip-text text-transparent">
                Import
              </span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/50 signage:text-base floor:text-lg">
              Indonesia, Australia, Malaysia (Kuala Lumpur), and Belize. Tap a pin for specialties,
              logistics, and how we acclimate and document every shipment.
            </p>
          </motion.div>
          <div className="w-full shrink-0 lg:max-w-md">
            <BackButton onClick={() => onNavigate('main')} />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-4 py-5 signage:px-10 signage:py-7 floor:max-w-[2200px] floor:px-14 floor:py-8 display4k:max-w-[2800px] display4k:px-20">
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3 floor:mb-7 floor:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`relative overflow-hidden rounded-2xl border ${stat.border} bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 shadow-lg backdrop-blur-xl floor:rounded-3xl floor:p-5`}>
              <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} floor:h-14 floor:w-14`}>
                <stat.icon className={`h-5 w-5 floor:h-6 floor:w-6 ${stat.color}`} strokeWidth={2.25} />
              </div>
              <div className={`text-3xl font-black tabular-nums ${stat.color} floor:text-4xl`}>
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 floor:text-xs">
                {stat.label}
              </div>
              <p className="mt-0.5 text-[11px] font-medium text-white/40 floor:text-sm">{stat.hint}</p>
            </div>
          ))}
      </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-6 floor:gap-8">
          {/* Map frame */}
          <div className="relative min-h-[min(52vh,560px)] flex-1 overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-[#050d1a] shadow-[0_28px_80px_rgba(0,0,0,0.45)] floor:min-h-[min(48vh,640px)] floor:rounded-[2rem] lg:min-h-[min(58vh,720px)]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,229,195,0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,229,195,0.06) 1px, transparent 1px)`,
                backgroundSize: '48px 48px'
              }}
              aria-hidden
            />
            <div className="absolute inset-0 opacity-25 mix-blend-screen">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=90"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5C3]/[0.07] via-transparent to-[#FF6B4A]/[0.06]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-transparent to-[#050d1a]/95" />

            <div className="absolute left-4 top-4 z-[5] max-w-[min(92%,300px)] rounded-xl border border-white/10 bg-[#050d1a]/75 px-3 py-2 backdrop-blur-md floor:left-5 floor:top-5 floor:px-4 floor:py-2.5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 floor:text-[10px]">
                Legend
              </p>
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-bold text-white/55 floor:text-[10px]">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#00E5C3]" />
                  Indonesia
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#4A9EFF]" />
                  Australia
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#FF6B4A]" />
                  Malaysia
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#FFB84D]" />
                  Belize
                </span>
                <span className="inline-flex items-center gap-1 text-[#FDE68A]">
                  <Plane className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden />
                  Airport hub
                </span>
              </div>
        </div>

            {locations.map((loc, i) => (
        <motion.div
          key={loc.id}
          className="absolute z-10"
                style={{ top: loc.top, left: loc.left }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.06 + 0.2, type: 'spring', stiffness: 260, damping: 22 }}>
            <motion.button
                  whileTap={{ scale: 0.92 }}
            onClick={() => {
                    setActiveAirportId(null);
                    setActiveLocation(loc.id);
                  }}
                  aria-label={`Open details for ${loc.name}`}
                  className="relative -ml-4 -mt-8 flex min-h-[56px] min-w-[56px] flex-col items-center justify-center touch-manipulation group floor:min-h-[64px] floor:min-w-[64px]">
              <motion.div
                    className={`absolute h-10 w-10 rounded-full opacity-30 blur-sm ${tonePulse[loc.tone]}`}
                    animate={{ scale: [1, 2.4], opacity: [0.45, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                  />
              <motion.div
                    className={`absolute h-6 w-6 rounded-full opacity-50 ${tonePulse[loc.tone]}`}
                    animate={{ scale: [1, 1.75], opacity: [0.75, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.45 }}
                  />
              <MapPinIcon
                    size={34}
                    className={`relative z-10 ${toneFill[loc.tone]} drop-shadow-[0_0_14px_rgba(0,0,0,0.85)] group-hover:scale-105 floor:h-10 floor:w-10`}
              fill="#050d1a"
                    strokeWidth={2.5}
                  />
                  <span
                    className={`mt-1.5 whitespace-nowrap rounded-full border border-white/15 bg-[#050d1a]/80 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white shadow-lg backdrop-blur-md floor:px-3 floor:text-xs ${
                      activeLocation === loc.id ? 'ring-2 ring-[#00E5C3]/60' : ''
                    }`}>
                {loc.mapLabel ?? loc.name}
              </span>
            </motion.button>
          </motion.div>
            ))}

            {airportHubs.map((ap, i) => (
              <motion.div
                key={ap.id}
                className="absolute z-[14]"
                style={{ top: ap.top, left: ap.left }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: locations.length * 0.06 + 0.35 + i * 0.05,
                  type: 'spring',
                  stiffness: 300,
                  damping: 24
                }}
                title={`${ap.city} — ${ap.code}`}>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    setActiveLocation(null);
                    setActiveAirportId(ap.id);
                  }}
                  aria-pressed={activeAirportId === ap.id}
                  aria-label={`Open details for ${ap.label}`}
                  className="relative -ml-3 -mt-3 flex flex-col items-center gap-1 touch-manipulation">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border bg-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.35)] backdrop-blur-sm transition-[box-shadow] sm:h-9 sm:w-9 ${
                      activeAirportId === ap.id
                        ? 'border-amber-200/90 ring-2 ring-amber-300/70'
                        : 'border-amber-400/50'
                    }`}>
                    <Plane className="h-3.5 w-3.5 text-amber-200 sm:h-4 sm:w-4" strokeWidth={2.5} aria-hidden />
                  </div>
                  <span
                    className={`max-w-[4.75rem] rounded-md border bg-[#050d1a]/90 px-1 py-0.5 text-center text-[7px] font-black leading-tight shadow-md backdrop-blur transition-[box-shadow] sm:max-w-[5.5rem] sm:px-1.5 sm:text-[8px] ${
                      activeAirportId === ap.id
                        ? 'border-amber-300/50 text-amber-50 ring-1 ring-amber-400/50'
                        : 'border-amber-400/25 text-amber-100/95'
                    }`}>
                    {ap.code} · {ap.city}
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Desktop side panel — content slides in when a region is selected */}
          <aside className="relative hidden w-full shrink-0 flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#0a1524]/70 shadow-[0_24px_64px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:flex lg:w-[380px] floor:w-[420px] display4k:w-[480px] floor:rounded-[2rem]">
        <AnimatePresence>
              {active && !reduceMotion && (
          <motion.div
                  key={active.id}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    boxShadow: 'inset 0 0 0 2px rgba(0,229,195,0.55)',
                    background: 'linear-gradient(90deg, rgba(0,229,195,0.08) 0%, transparent 45%)'
                  }}
                />
              )}
              {activeAirport && !active && !reduceMotion && (
                <motion.div
                  key={activeAirport.id}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    boxShadow: 'inset 0 0 0 2px rgba(251,191,36,0.45)',
                    background: 'linear-gradient(90deg, rgba(251,191,36,0.1) 0%, transparent 45%)'
                  }}
                />
              )}
            </AnimatePresence>

            <motion.div
              className="relative z-[2] flex min-h-0 flex-1 flex-col"
              initial={false}
              custom={selectionBump}
              variants={{
                still: { x: 0 },
                bump: (id: string | null) => ({
                  x: id ? [18, 0] : 0,
                  transition: { type: 'spring', stiffness: 440, damping: 32 }
                })
              }}
              animate={reduceMotion ? 'still' : 'bump'}>
              <div className="min-h-[5.5rem] border-b border-white/[0.07] px-5 py-4 floor:min-h-[5.75rem] floor:px-6 floor:py-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h2
                    key={active ? 'region' : activeAirport ? 'hub' : 'idle'}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                    transition={{ duration: 0.22 }}
                    className="text-xs font-black uppercase tracking-[0.22em] text-white/40 floor:text-sm">
                    {active ? 'Region details' : activeAirport ? 'Hub airport' : 'Region details'}
                  </motion.h2>
                </AnimatePresence>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={active?.id ?? activeAirport?.id ?? 'placeholder'}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 10, filter: 'blur(4px)' }
                    }
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -8, filter: 'blur(4px)' }
                    }
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-1 text-sm font-bold text-white floor:text-base">
                    {active ? active.name : activeAirport ? activeAirport.label : 'Select a source'}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-4 floor:px-6 floor:py-5">
                  <AnimatePresence mode="wait" initial={false}>
                    {active ? (
                      <motion.div
                        key={active.id}
                        {...sideTx.detail}
                        className="flex flex-col">
                        <RegionDetailBody loc={active} onClose={closePanel} />
                      </motion.div>
                    ) : activeAirport ? (
                      <motion.div
                        key={activeAirport.id}
                        {...sideTx.detail}
                        className="flex flex-col">
                        <AirportDetailBody ap={activeAirport} onClose={closePanel} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="region-list"
                        {...sideTx.list}
                        className="flex min-h-0 flex-1 flex-col justify-start">
                        <p className="text-sm leading-relaxed text-white/45 floor:text-base">
                          Choose a pin for Indonesia, Australia, Malaysia (Kuala Lumpur), or
                          Belize—or open the list. Hub routes include Jakarta, DPS, BNE, and Perth.
                        </p>
                        <p className="mt-2 text-xs font-medium leading-relaxed text-white/35 floor:text-sm">
                          {SOLE_IMPORTER_DISCLAIMER}
                        </p>
                        <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/35 floor:text-xs">
                          Jump to region
                        </p>
                        <ul className="mt-2 space-y-2">
                          {locations.map((loc) => (
                            <li key={loc.id}>
                <button
                                type="button"
                                onClick={() => {
                                  setActiveAirportId(null);
                                  setActiveLocation(loc.id);
                                }}
                                className="flex w-full touch-manipulation items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-left text-sm font-semibold text-white transition-colors hover:border-[#00E5C3]/35 hover:bg-white/[0.07]">
                                <span className="flex items-center gap-2">
                                  <span
                                    className={`h-2 w-2 shrink-0 rounded-full ${tonePulse[loc.tone]}`}
                                  />
                                  {loc.name}
                                </span>
                                <ChevronRight className="h-4 w-4 shrink-0 text-white/35" />
                              </button>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-amber-200/60 floor:text-xs">
                          Hub airports
                        </p>
                        <ul className="mt-2 max-h-[min(36vh,320px)] space-y-2 overflow-y-auto pr-1">
                          {airportHubs.map((ap) => (
                            <li key={ap.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveLocation(null);
                                  setActiveAirportId(ap.id);
                                }}
                                className={`flex w-full touch-manipulation items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                                  activeAirportId === ap.id
                                    ? `${hubChipSelected} text-white`
                                    : 'border-amber-400/20 bg-amber-400/5 text-amber-50/95 hover:border-amber-400/40 hover:bg-amber-400/10'
                                }`}>
                                <span className="flex min-w-0 items-center gap-2">
                                  <Plane
                                    className="h-4 w-4 shrink-0 text-amber-200/90"
                                    strokeWidth={2.25}
                                    aria-hidden
                                  />
                                  <span className="truncate">{ap.label}</span>
                                </span>
                                <ChevronRight className="h-4 w-4 shrink-0 text-amber-200/40" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence initial={false}>
                  {(active || activeAirport) && (
                    <motion.div
                      key="clear-footer"
                      initial={
                        reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="shrink-0 border-t border-white/[0.07] p-3 floor:p-4">
                      <button
                        type="button"
                        onClick={closePanel}
                        className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] py-2.5 text-xs font-bold uppercase tracking-wider text-white/70 transition-colors hover:bg-white/[0.09]">
                        Clear selection
                </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
                       </motion.div>
          </aside>
                        </div>

        {/* Quick jump chips */}
        <div className="mt-5 floor:mt-7">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/35 floor:text-xs">
            Jump to region
          </p>
          <div className="-mx-1 flex gap-2 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin]">
            {locations.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => {
                  setActiveAirportId(null);
                  setActiveLocation(loc.id);
                }}
                className={`shrink-0 touch-manipulation rounded-full border px-3.5 py-2 text-xs font-bold transition-all floor:px-4 floor:py-2.5 floor:text-sm ${
                  activeLocation === loc.id
                    ? `border-white/25 bg-white/[0.12] text-white ${toneRing[loc.tone]}`
                    : 'border-white/[0.1] bg-white/[0.04] text-white/70 hover:border-white/20 hover:bg-white/[0.07]'
                }`}>
                          {loc.name}
              </button>
            ))}
          </div>
          <p className="mb-2 mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-amber-200/55 floor:text-xs">
            Jump to hub
          </p>
          <div className="-mx-1 flex gap-2 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin]">
            {airportHubs.map((ap) => (
              <button
                key={ap.id}
                type="button"
                onClick={() => {
                  setActiveLocation(null);
                  setActiveAirportId(ap.id);
                }}
                className={`shrink-0 touch-manipulation rounded-full border px-3.5 py-2 text-xs font-bold transition-all floor:px-4 floor:py-2.5 floor:text-sm ${
                  activeAirportId === ap.id
                    ? hubChipSelected
                    : 'border-amber-400/20 bg-amber-400/5 text-amber-100/85 hover:border-amber-400/35 hover:bg-amber-400/10'
                }`}>
                {ap.code}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 w-full border-t border-white/[0.08] pt-6 floor:mt-auto floor:pt-7">
          <div className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 shadow-lg backdrop-blur-xl floor:rounded-3xl floor:p-5">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#4A9EFF]/30 bg-[#4A9EFF]/12">
                <Plane className="h-4 w-4 text-[#4A9EFF]" strokeWidth={2.25} aria-hidden />
              </div>
              <h2 className="text-sm font-black uppercase tracking-[0.12em] text-white/60 floor:text-base">
                Airports
              </h2>
            </div>
            <p className="text-sm font-semibold text-white/90 floor:text-base">
              {IMPORT_HUB_LINE}
            </p>
            <p className="mt-2 border-t border-white/[0.08] pt-3 text-sm font-medium leading-relaxed text-white/60 floor:text-base">
              {SOLE_IMPORTER_DISCLAIMER}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile / tablet modal — region or hub */}
      <AnimatePresence>
        {!isDesktop && ((active && activeLocation) || activeAirport) && (
          <motion.div
            key={active?.id ?? activeAirport?.id ?? 'import-detail'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center lg:hidden">
            <button
              type="button"
              aria-label={active ? 'Close region details' : 'Close airport details'}
              className="absolute inset-0 cursor-default border-0 bg-[#020814]/88 backdrop-blur-md"
              onClick={closePanel}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={active ? 'import-region-title' : 'import-airport-title'}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 mb-0 max-h-[min(88dvh,760px)] w-full max-w-lg overflow-y-auto rounded-t-[1.75rem] border border-white/[0.12] border-b-0 bg-[#050d1a] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_-28px_90px_rgba(0,0,0,0.75)] sm:mb-0 sm:max-h-[min(82vh,680px)] sm:rounded-[2rem] sm:border-b floor:max-w-xl">
              <div className="sticky top-0 z-10 flex justify-center bg-[#050d1a]/95 py-2 backdrop-blur-md sm:hidden">
                <div className="h-1 w-10 rounded-full bg-white/20" aria-hidden />
                    </div>
              <div
                className={`absolute left-0 top-0 h-full w-1 ${
                  active
                    ? 'bg-gradient-to-b from-[#FF6B4A] via-[#00E5C3] to-[#4A9EFF]'
                    : 'bg-gradient-to-b from-amber-500 via-amber-400/80 to-amber-600/60'
                }`}
                aria-hidden
              />
              <button
                type="button"
                onClick={closePanel}
                className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] text-white transition-colors hover:bg-white/[0.12] sm:top-4 sm:right-4 floor:h-12 floor:w-12">
                <XIcon size={22} strokeWidth={2.25} />
              </button>
              <div className="relative p-5 pt-2 sm:p-7 sm:pt-6 floor:p-8">
                {active && activeLocation ? (
                  <RegionDetailBody loc={active} onClose={closePanel} />
                ) : activeAirport ? (
                  <AirportDetailBody ap={activeAirport} onClose={closePanel} />
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
  );
}
