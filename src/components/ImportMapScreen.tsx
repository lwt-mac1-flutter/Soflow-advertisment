import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin as MapPinIcon,
  X as XIcon,
  Droplets,
  Package,
  Leaf,
  Sparkles
} from 'lucide-react';
import { ScreenProps } from '../types';
import { BackButton } from './BackButton';

type ImportLocation = {
  id: string;
  name: string;
  top: string;
  left: string;
  desc: string;
  specialties: string[];
  waterNote: string;
  supplyChain: string;
  sustainability: string;
};

const locations: ImportLocation[] = [
  {
    id: 'indo',
    name: 'Indonesia',
    top: '55%',
    left: '75%',
    desc: 'Rich biodiversity, premium cultured corals.',
    specialties: [
      'Maricultured stony corals',
      'Soft corals & LPS',
      'Inverts & cleanup crews'
    ],
    waterNote:
      'Indo-Pacific parameters; a slow acclimation suits most lines we bring in.',
    supplyChain:
      'Air freight with temp-mapped staging, short dock exposure, coordinated arrivals.',
    sustainability:
      'Farm-raised and quota-managed wild stock through vetted partners and clear paperwork.'
  },
  {
    id: 'fiji',
    name: 'Fiji',
    top: '65%',
    left: '88%',
    desc: 'Famous for vibrant soft corals and live rock.',
    specialties: [
      'Soft corals & leathers',
      'Premium live rock',
      'Showpiece color morphs'
    ],
    waterNote:
      'Stable alk and oxygen help; ramp flow and light gently in week one.',
    supplyChain:
      'Direct routes, cold-style packing, dispatch photos so you see what shipped.',
    sustainability:
      'CITES-aligned exports and reef areas co-managed with local villages.'
  },
  {
    id: 'tonga',
    name: 'Tonga',
    top: '68%',
    left: '92%',
    desc: 'Unique branching and plating species.',
    specialties: [
      'Branching Acropora',
      'Encrusting plates',
      'Distinct Tongan color lines'
    ],
    waterNote:
      'Keep alk, calcium, and magnesium steady for plating forms and tip color.',
    supplyChain:
      'Hub consolidations (e.g. LAX) for predictable handoffs and shorter transit.',
    sustainability:
      'Sizing and grading rules plus suppliers with documented ethics.'
  },
  {
    id: 'aus',
    name: 'Australia',
    top: '75%',
    left: '82%',
    desc: 'Home to the Great Barrier Reef, strict quotas.',
    specialties: ['GBR lineages', 'Premium LPS', 'Seasonal rarity lists'],
    waterNote:
      'Stable temp and chemistry; ease into full lighting after a calm acclimation day.',
    supplyChain:
      'Heavy documentation, optional quarantine and health checks before you receive stock.',
    sustainability:
      'Government caps, licensing, and traceability—availability tracks the law.'
  },
  {
    id: 'redsea',
    name: 'Red Sea',
    top: '45%',
    left: '55%',
    desc: 'Hardy species adapted to high salinity.',
    specialties: [
      'Hardy stony corals',
      'High-salinity tolerant softies',
      'Beginner-friendly classics'
    ],
    waterNote:
      'Often fine at slightly higher salinity; drip acclimate slowly into your system.',
    supplyChain:
      'Middle East / EU consolidators into US and EU with tight handoff timing.',
    sustainability:
      'Mariculture and ranching supplement tightly controlled wild harvest.'
  },
  {
    id: 'hawaii',
    name: 'Hawaii',
    top: '50%',
    left: '15%',
    desc: 'Endemic species and sustainable practices.',
    specialties: [
      'Pacific island specialties',
      'Expert domestic packing',
      'Short-haul when permitted'
    ],
    waterNote:
      'Steady alk and calcium before you raise PAR or stretch photoperiod.',
    supplyChain:
      'Cool packs, breathable insulation, and carrier rules followed exactly.',
    sustainability:
      'Compliance-first; many endemics are restricted—stock shifts with law and season.'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    top: '56%',
    left: '63%',
    desc: 'Atoll reefs with crystal water and boutique mariculture.',
    specialties: ['Acropora gardens', 'LPS islands', 'Cleanup & inverts'],
    waterNote:
      'Warm, stable reefs—match salinity closely and acclimate slowly from shipping bags.',
    supplyChain:
      'Male / Colombo consolidations into EU and US with short connection windows.',
    sustainability:
      'Resort-area nurseries and size limits; many lines are farm-raised on local tables.'
  },
  {
    id: 'philippines',
    name: 'Philippines',
    top: '49%',
    left: '81%',
    desc: 'Coral Triangle diversity with strong mariculture and wild specialty.',
    specialties: ['SPS & Acro', 'Softies & zoas', 'Rare LPS'],
    waterNote:
      'High biodiversity—watch for pests; dip and observe before aggressive lighting.',
    supplyChain:
      'Manila / Cebu export lanes with night flights to keep total travel time predictable.',
    sustainability:
      'Growing farm sector; wild harvest tied to permits and size classes where allowed.'
  },
  {
    id: 'kenya',
    name: 'Kenya',
    top: '59%',
    left: '57%',
    desc: 'Western Indian Ocean fringing reefs with hardy Indo-Pacific species.',
    specialties: ['Hardy stony corals', 'Soft corals', 'Indian Ocean classics'],
    waterNote:
      'Warm, energetic water—stable flow and alk help new colonies settle quickly.',
    supplyChain:
      'Nairobi / Mombasa air links into EU hubs; pack lists aligned with CITES paperwork.',
    sustainability:
      'Licensed exporters and seasonal quotas; we favor documented chain of custody.'
  },
  {
    id: 'bahamas',
    name: 'Bahamas',
    top: '41%',
    left: '26%',
    desc: 'Caribbean clarity—stony corals and iconic reef livestock.',
    specialties: ['Caribbean stony', 'Ricordea & softies', 'Atlantic specialties'],
    waterNote:
      'Caribbean chemistry can differ from Pacific—extend acclimation and test often.',
    supplyChain:
      'Miami and Nassau routing with domestic US options when stock clears inspection.',
    sustainability:
      'Regulated harvest and nursery programs; availability follows federal and local rules.'
  },
  {
    id: 'palau',
    name: 'Palau',
    top: '47%',
    left: '84%',
    desc: 'Micronesian reefs with strict protection and premium rare strains.',
    specialties: ['Micronesian Acro', 'Unique color lines', 'Protected-area ethics'],
    waterNote:
      'Pristine-water genetics—gentle PAR ramps and stable nutrients preserve color.',
    supplyChain:
      'Guam / Honolulu hops into mainland US; timing built around weekend arrivals.',
    sustainability:
      'Large marine protected areas; legal export only from approved, traceable sources.'
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    top: '50%',
    left: '72%',
    desc: 'Fast-growing farms and coastal mariculture along the South China Sea.',
    specialties: ['Farm-raised SPS', 'Cultured LPS', 'Budget-friendly colonies'],
    waterNote:
      'Farm lines adapt well; still drip acclimate—farms can run slightly different salinity.',
    supplyChain:
      'HCMC / Hanoi consolidations with sea-air combos into major import airports.',
    sustainability:
      'Land-based and near-shore farms reduce wild pressure; we favor repeat farm partners.'
  }
];

export function ImportMapScreen({ onNavigate }: ScreenProps) {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  return (
    <div className="flex flex-col min-h-[100dvh] min-h-screen w-full bg-transparent">
      {/* Header */}
      <div className="bg-white/[0.03] backdrop-blur-2xl border-b border-white/[0.08] pt-6 pb-4 px-6 signage:pt-8 signage:pb-5 signage:px-12 floor:px-16 display4k:px-24 z-20 relative">
        <h2 className="text-2xl signage:text-3xl floor:text-4xl font-black text-white mb-2 tracking-wide">
          Global Sources
        </h2>
        <div className="w-16 h-1 bg-[#00E5C3] rounded-full mb-6 shadow-[0_0_10px_rgba(0,229,195,0.5)]" />
        <BackButton onClick={() => onNavigate('main')} label="Back to Menu" />
      </div>

      {/* Map Area */}
      <div className="flex-1 min-h-[clamp(260px,52vh,56rem)] floor:min-h-[clamp(320px,50vh,64rem)] portrait:min-h-[min(45vh,520px)] w-full relative overflow-hidden">
        {/* Map Background Image */}
        <div className="absolute inset-0 opacity-20 mix-blend-screen">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=90"
            alt="World Map"
            className="w-full h-full object-cover object-center" />
          
        </div>

        {/* Teal Overlay */}
        <div className="absolute inset-0 bg-[#00E5C3]/5 mix-blend-overlay" />

        {/* Map Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-transparent to-[#050d1a]" />

        {/* Markers */}
        {locations.map((loc, i) =>
        <motion.div
          key={loc.id}
          className="absolute z-10"
          style={{
            top: loc.top,
            left: loc.left
          }}
          initial={{
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            delay: i * 0.1 + 0.3,
            type: 'spring'
          }}>
          
            <motion.button
            whileTap={{
              scale: 0.9
            }}
            onClick={() => setActiveLocation(loc.id)}
            className="relative -ml-4 -mt-8 flex flex-col items-center group min-h-[60px] min-w-[60px] justify-center">
            
              {/* Double Pulse effect */}
              <motion.div
              className="absolute w-10 h-10 bg-[#FF6B4A] rounded-full opacity-30 blur-sm"
              animate={{
                scale: [1, 2.5],
                opacity: [0.5, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut'
              }} />
            
              <motion.div
              className="absolute w-6 h-6 bg-[#FF6B4A] rounded-full opacity-50"
              animate={{
                scale: [1, 1.8],
                opacity: [0.8, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.5
              }} />
            
              <MapPinIcon
              size={36}
              className="text-[#FF6B4A] relative z-10 drop-shadow-[0_0_10px_rgba(255,107,74,0.8)]"
              fill="#050d1a"
              strokeWidth={2.5} />
            
              <span className="mt-2 text-white font-bold text-xs bg-white/[0.1] border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] whitespace-nowrap tracking-wider">
                {loc.name}
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* Info Popup */}
        <AnimatePresence>
          {activeLocation &&
          <motion.div
            key="import-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30 flex items-center justify-center p-4 signage:p-6 floor:p-8">
            
              <button
              type="button"
              aria-label="Close region details"
              className="absolute inset-0 bg-[#020814]/85 backdrop-blur-md border-0 cursor-default"
              onClick={() => setActiveLocation(null)} />
            
              <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="import-region-title"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 32
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-md floor:max-w-lg display4k:max-w-xl h-[32rem] signage:h-[34rem] floor:h-[36rem] display4k:h-[38rem] flex flex-col overflow-hidden rounded-2xl floor:rounded-3xl shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_28px_90px_rgba(0,0,0,0.65),0_0_60px_rgba(0,229,195,0.12)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#050d1a] to-[#030810]" />
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#FF6B4A] via-[#00E5C3] to-[#4A9EFF]" />
                <div className="absolute -right-16 -top-24 h-48 w-48 rounded-full bg-[#00E5C3]/15 blur-3xl pointer-events-none" />
                <div className="absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-[#FF6B4A]/10 blur-3xl pointer-events-none" />

                <div className="relative flex h-full flex-col p-4 pl-5 signage:p-5 signage:pl-6">
                  <button
                    type="button"
                    onClick={() => setActiveLocation(null)}
                    className="absolute top-3.5 right-3.5 z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/75 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white">
                    <XIcon size={20} strokeWidth={2.25} />
                  </button>

                  {locations
                    .filter((l) => l.id === activeLocation)
                    .map((loc) => (
                      <div
                        key={loc.id}
                        className="flex h-full min-h-0 flex-col">
                        <p className="text-[10px] signage:text-[11px] font-bold uppercase tracking-[0.22em] text-[#00E5C3] mb-1.5">
                          Source region
                        </p>
                        <div className="flex items-start gap-3 pr-11 mb-3">
                          <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#FF6B4A]/35 bg-gradient-to-br from-[#FF6B4A]/20 to-[#00E5C3]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                            <MapPinIcon
                              className="text-[#FF6B4A]"
                              size={26}
                              fill="#050d1a"
                              strokeWidth={2}
                              aria-hidden
                            />
                          </div>
                          <div className="min-w-0">
                            <h3
                              id="import-region-title"
                              className="text-xl signage:text-2xl font-black text-white tracking-tight leading-tight">
                              {loc.name}
                            </h3>
                            <p className="mt-0.5 text-xs text-white/45 font-medium">
                              Coral & livestock origin
                            </p>
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5 mb-3 shrink-0">
                          <p className="text-white/85 text-sm signage:text-[15px] leading-snug">
                            {loc.desc}
                          </p>
                        </div>

                        <div className="mb-3 shrink-0">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Sparkles
                              className="text-[#FFB84D] shrink-0"
                              size={14}
                              strokeWidth={2.25}
                              aria-hidden
                            />
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                              Specialties
                            </span>
                          </div>
                          <ul className="flex flex-wrap gap-1.5">
                            {loc.specialties.map((tag) => (
                              <li key={tag}>
                                <span className="inline-block rounded-md border border-[#00E5C3]/25 bg-[#00E5C3]/10 px-2 py-0.5 text-[10px] signage:text-[11px] font-semibold text-[#b8fff0]">
                                  {tag}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex min-h-0 flex-1 flex-col gap-2">
                          <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
                            <div className="flex items-center gap-1.5 mb-1 shrink-0">
                              <Droplets
                                className="text-[#4A9EFF] shrink-0"
                                size={14}
                                strokeWidth={2.25}
                                aria-hidden
                              />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-white/55">
                                Water & acclimation
                              </span>
                            </div>
                            <p className="min-h-0 flex-1 text-xs leading-snug text-white/75">
                              {loc.waterNote}
                            </p>
                          </div>

                          <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
                            <div className="flex items-center gap-1.5 mb-1 shrink-0">
                              <Package
                                className="text-[#00E5C3] shrink-0"
                                size={14}
                                strokeWidth={2.25}
                                aria-hidden
                              />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-white/55">
                                Logistics & handling
                              </span>
                            </div>
                            <p className="min-h-0 flex-1 text-xs leading-snug text-white/75">
                              {loc.supplyChain}
                            </p>
                          </div>

                          <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
                            <div className="flex items-center gap-1.5 mb-1 shrink-0">
                              <Leaf
                                className="text-[#7AE582] shrink-0"
                                size={14}
                                strokeWidth={2.25}
                                aria-hidden
                              />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-white/55">
                                Sustainability
                              </span>
                            </div>
                            <p className="min-h-0 flex-1 text-xs leading-snug text-white/75">
                              {loc.sustainability}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}