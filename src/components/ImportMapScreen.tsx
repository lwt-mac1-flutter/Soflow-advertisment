import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin as MapPinIcon,
  X as XIcon,
  Globe as GlobeIcon } from
'lucide-react';
import { ScreenProps } from '../types';
import { BackButton } from './BackButton';
const locations = [
{
  id: 'indo',
  name: 'Indonesia',
  top: '55%',
  left: '75%',
  desc: 'Rich biodiversity, premium cultured corals.'
},
{
  id: 'fiji',
  name: 'Fiji',
  top: '65%',
  left: '88%',
  desc: 'Famous for vibrant soft corals and live rock.'
},
{
  id: 'tonga',
  name: 'Tonga',
  top: '68%',
  left: '92%',
  desc: 'Unique branching and plating species.'
},
{
  id: 'aus',
  name: 'Australia',
  top: '75%',
  left: '82%',
  desc: 'Home to the Great Barrier Reef, strict quotas.'
},
{
  id: 'redsea',
  name: 'Red Sea',
  top: '45%',
  left: '55%',
  desc: 'Hardy species adapted to high salinity.'
},
{
  id: 'hawaii',
  name: 'Hawaii',
  top: '50%',
  left: '15%',
  desc: 'Endemic species and sustainable practices.'
}];

export function ImportMapScreen({ onNavigate }: ScreenProps) {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  return (
    <div className="flex flex-col h-full w-full bg-transparent">
      {/* Header */}
      <div className="bg-white/[0.03] backdrop-blur-2xl border-b border-white/[0.08] pt-6 pb-4 px-6 signage:pt-8 signage:pb-5 signage:px-12 z-20 relative">
        <h2 className="text-2xl signage:text-3xl font-black text-white mb-2 tracking-wide">
          Global Sources
        </h2>
        <div className="w-16 h-1 bg-[#00E5C3] rounded-full mb-6 shadow-[0_0_10px_rgba(0,229,195,0.5)]" />
        <BackButton onClick={() => onNavigate('main')} label="Back to Menu" />
      </div>

      {/* Map Area */}
      <div className="flex-1 relative overflow-hidden">
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
            initial={{
              opacity: 0,
              y: 50
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: 50
            }}
            className="absolute bottom-6 left-4 right-4 signage:bottom-8 signage:left-6 signage:right-6 z-30">
            
              <div className="bg-white/[0.08] backdrop-blur-2xl border border-white/[0.1] border-t-4 border-t-[#00E5C3] rounded-3xl p-4 signage:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-2 relative">
                <button
                onClick={() => setActiveLocation(null)}
                className="absolute top-4 right-4 p-2 bg-white/[0.1] rounded-full text-white/70 hover:text-white min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors">
                
                  <XIcon size={24} />
                </button>

                {locations.
              filter((l) => l.id === activeLocation).
              map((loc) =>
              <div key={loc.id} className="pr-10">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="bg-[#00E5C3]/20 p-2 rounded-full shadow-[0_0_15px_rgba(0,229,195,0.3)]">
                          <GlobeIcon className="text-[#00E5C3]" size={28} />
                        </div>
                        <h3 className="text-xl signage:text-2xl font-black text-white tracking-wide">
                          {loc.name}
                        </h3>
                      </div>
                      <p className="text-white/70 text-base signage:text-lg leading-relaxed font-medium">
                        {loc.desc}
                      </p>
                    </div>
              )}
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}