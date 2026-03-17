import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star as StarIcon } from 'lucide-react';
import { ScreenProps } from '../types';
import { BackButton } from './BackButton';
const testimonials = [
{
  id: 1,
  company: 'Oceanic Aquariums',
  quote:
  'The quality of corals we receive from CoralCraft is unmatched. Our customers are always blown away by the vibrant colors.',
  rating: 5,
  initials: 'OA',
  color: 'bg-[#4A9EFF]',
  borderColor: 'border-[#4A9EFF]'
},
{
  id: 2,
  company: 'Reef Builders Inc.',
  quote:
  'Consistent sizing, healthy specimens, and incredible customer support. They are our primary supplier for a reason.',
  rating: 5,
  initials: 'RB',
  color: 'bg-[#00E5C3]',
  borderColor: 'border-[#00E5C3]'
},
{
  id: 3,
  company: 'Deep Blue Exotics',
  quote:
  'Their sustainable sourcing practices give us peace of mind. The Australian Acroporas are simply stunning.',
  rating: 5,
  initials: 'DB',
  color: 'bg-[#FF6B4A]',
  borderColor: 'border-[#FF6B4A]'
}];

const stats = [
{
  label: 'Happy Customers',
  value: '500+'
},
{
  label: 'Countries Served',
  value: '30+'
},
{
  label: 'Years Experience',
  value: '10+'
}];

export function CustomersScreen({ onNavigate }: ScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Auto-cycle testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex flex-col h-full w-full bg-transparent">
      {/* Header */}
      <div className="bg-white/[0.03] backdrop-blur-2xl border-b border-white/[0.08] pt-6 pb-4 px-6 signage:pt-8 signage:pb-5 signage:px-12 z-20 relative">
        <h2 className="text-2xl signage:text-3xl font-black text-white mb-2 tracking-wide">
          Our Customers
        </h2>
        <div className="w-16 h-1 bg-[#4A9EFF] rounded-full mb-6 shadow-[0_0_10px_rgba(74,158,255,0.5)]" />
        <BackButton onClick={() => onNavigate('main')} />
      </div>

      <div className="flex-1 flex flex-col px-4 py-6 signage:px-12 signage:py-8 overflow-y-auto max-w-[1400px] mx-auto w-full">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 signage:gap-4 mb-6 signage:mb-10">
          {stats.map((stat, i) =>
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: i * 0.1
            }}
            className="bg-white/[0.06] backdrop-blur-xl rounded-2xl p-3 signage:p-4 text-center shadow-lg border border-white/[0.08] border-b-2 border-b-[#FF6B4A]/50 flex flex-col justify-center min-h-[100px] signage:min-h-[120px]">
            
              <div className="text-3xl font-black text-[#FF6B4A] mb-1 drop-shadow-[0_0_10px_rgba(255,107,74,0.4)]">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          )}
        </div>

        {/* Testimonial Carousel */}
        <div className="flex-1 flex flex-col justify-center relative min-h-[280px] signage:min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{
                opacity: 0,
                x: 50
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -50
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut'
              }}
              className="bg-white/[0.06] backdrop-blur-2xl rounded-[40px] p-6 signage:p-10 shadow-2xl border border-white/[0.1] absolute inset-0 flex flex-col justify-center overflow-hidden">
              
              {/* Subtle gradient glow inside card */}
              <div
                className={`absolute -top-20 -right-20 w-64 h-64 rounded-full ${testimonials[currentIndex].color} opacity-10 blur-[60px]`} />
              

              <div className="flex items-center gap-4 signage:gap-6 mb-6 signage:mb-8 relative z-10">
                <div
                  className={`w-20 h-20 rounded-full ${testimonials[currentIndex].color}/20 flex items-center justify-center text-white text-2xl font-black shadow-inner border-2 ${testimonials[currentIndex].borderColor}`}>
                  
                  {testimonials[currentIndex].initials}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {testimonials[currentIndex].company}
                  </h3>
                  <div className="flex gap-1 mt-2">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) =>
                      <StarIcon
                        key={i}
                        size={20}
                        className="text-[#FFB84D] fill-[#FFB84D] drop-shadow-[0_0_5px_rgba(255,184,77,0.5)]" />


                    )}
                  </div>
                </div>
              </div>

              <blockquote className="text-lg signage:text-2xl text-white/90 leading-relaxed font-medium italic relative z-10">
                <span className="text-6xl text-[#FF6B4A]/20 absolute -top-6 -left-4 font-serif">
                  "
                </span>
                <span className="relative z-10">
                  {testimonials[currentIndex].quote}
                </span>
                <span className="text-6xl text-[#FF6B4A]/20 absolute -bottom-10 -right-2 font-serif">
                  "
                </span>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-3 mt-6 signage:mt-8 pb-6 signage:pb-8">
          {testimonials.map((_, i) =>
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-4 rounded-full transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center ${i === currentIndex ? 'w-12 bg-transparent' : 'w-4 bg-transparent'}`}
            aria-label={`Go to slide ${i + 1}`}>
            
              <div
              className={`h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-10 bg-[#FF6B4A] shadow-[0_0_10px_rgba(255,107,74,0.6)]' : 'w-2.5 bg-white/20'}`} />
            
            </button>
          )}
        </div>
      </div>
    </div>);

}