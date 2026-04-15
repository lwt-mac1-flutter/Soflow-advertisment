import React, { Children } from 'react';
import { motion } from 'framer-motion';
import {
  Globe as GlobeIcon,
  UserPlus as UserPlusIcon,
  FileText as FileTextIcon,
  ShoppingCart as ShoppingCartIcon } from
'lucide-react';
import { ScreenProps } from '../types';
import { BackButton } from './BackButton';
import { QRCodePanel } from './QRCodePanel';
const steps = [
{
  id: 1,
  title: 'Visit Our Portal',
  desc: 'Scan the QR code below to open our wholesale portal on your phone.',
  icon: GlobeIcon,
  color: 'bg-[#4A9EFF]',
  textColor: 'text-[#4A9EFF]',
  shadow: 'shadow-[0_0_20px_rgba(74,158,255,0.3)]'
},
{
  id: 2,
  title: 'Create Account',
  desc: 'Fill in your business details and contact information.',
  icon: UserPlusIcon,
  color: 'bg-[#FFB84D]',
  textColor: 'text-[#FFB84D]',
  shadow: 'shadow-[0_0_20px_rgba(255,184,77,0.3)]'
},
{
  id: 3,
  title: 'Submit Documents',
  desc: 'Upload your business license and tax exemption forms.',
  icon: FileTextIcon,
  color: 'bg-[#00E5C3]',
  textColor: 'text-[#00E5C3]',
  shadow: 'shadow-[0_0_20px_rgba(0,229,195,0.3)]'
},
{
  id: 4,
  title: 'Start Ordering',
  desc: 'Once approved (usually 24h), access live inventory and pricing.',
  icon: ShoppingCartIcon,
  color: 'bg-[#FF6B4A]',
  textColor: 'text-[#FF6B4A]',
  shadow: 'shadow-[0_0_20px_rgba(255,107,74,0.3)]'
}];

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};
const stepVariants = {
  hidden: {
    opacity: 0,
    x: -30
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
};
export function RegisterScreen({ onNavigate }: ScreenProps) {
  return (
    <div className="flex flex-col min-h-[100dvh] min-h-screen w-full bg-transparent">
      {/* Header */}
      <div className="bg-white/[0.03] backdrop-blur-2xl border-b border-white/[0.08] pt-6 pb-4 px-6 signage:pt-8 signage:pb-5 signage:px-12 floor:px-16 display4k:px-24 z-20 relative">
        <h2 className="text-2xl signage:text-3xl floor:text-4xl font-black text-white mb-2 tracking-wide">
          How to Register
        </h2>
        <div className="w-16 h-1 bg-[#FFB84D] rounded-full mb-6 shadow-[0_0_10px_rgba(255,184,77,0.5)]" />
        <BackButton onClick={() => onNavigate('main')} />
      </div>

      <div className="px-4 py-6 signage:px-12 signage:py-8 floor:px-16 display4k:px-24 pb-24 signage:pb-12 flex flex-col relative max-w-[1400px] floor:max-w-[2200px] display4k:max-w-[2800px] mx-auto w-full">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[38px] signage:left-[52px] top-12 bottom-48 w-0.5 bg-gradient-to-b from-[#4A9EFF] via-[#00E5C3] to-[#FF6B4A] opacity-30 z-0" />

        <motion.div
          className="flex flex-col gap-4 signage:gap-6 mb-6 signage:mb-10 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          
          {steps.map((step, index) =>
          <motion.div
            key={step.id}
            variants={stepVariants}
            className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-4 signage:p-6 shadow-xl flex items-center gap-4 signage:gap-6 relative overflow-hidden">
            
              {/* Step Number Background Watermark */}
              <div className="absolute -right-4 -top-8 text-[140px] font-black text-white/[0.03] select-none pointer-events-none">
                {step.id}
              </div>

              <div
              className={`${step.color}/20 w-12 h-12 signage:w-[60px] signage:h-[60px] rounded-2xl flex items-center justify-center shrink-0 ${step.shadow} border border-white/10 relative z-10`}>
              
                <step.icon
                  size={32}
                  className={step.textColor}
                  strokeWidth={2.25}
                />
              
              </div>

              <div className="relative z-10">
                <h3
                className={`text-xl signage:text-2xl font-bold ${step.textColor} mb-1 tracking-wide drop-shadow-md`}>
                
                  {step.title}
                </h3>
                <p className="text-white/70 text-base signage:text-lg leading-snug font-medium">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* QR Code Section */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 1,
            duration: 0.5
          }}
          className="relative z-10">
          
          <QRCodePanel />
        </motion.div>
      </div>
    </div>);

}