import React, { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, QrCode, Send } from 'lucide-react';
import { ScreenProps } from '../types';
import { BackButton } from './BackButton';
import {
  REGISTRATION_FORM_ENTRIES,
  REGISTRATION_FORM_POST_URL,
  qrCodeImageForUrl
} from '../constants/registrationForm';
import { useRegisterScreenPublicUrl } from '../hooks/useRegisterScreenPublicUrl';

type FormState = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
};

const initial: FormState = {
  name: '',
  businessName: '',
  email: '',
  phone: ''
};

async function submitToGoogleForm(values: FormState): Promise<void> {
  const body = new URLSearchParams();
  body.set(REGISTRATION_FORM_ENTRIES.fullName, values.name.trim());
  body.set(REGISTRATION_FORM_ENTRIES.businessName, values.businessName.trim());
  body.set(REGISTRATION_FORM_ENTRIES.email, values.email.trim());
  body.set(REGISTRATION_FORM_ENTRIES.phone, values.phone.trim());

  await fetch(REGISTRATION_FORM_POST_URL, {
    method: 'POST',
    mode: 'no-cors',
    body
  });
}

export function RegisterScreen({ onNavigate }: ScreenProps) {
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const registerUrl = useRegisterScreenPublicUrl();
  const qrSrc = useMemo(() => qrCodeImageForUrl(registerUrl, 512), [registerUrl]);

  const onChange = useCallback(
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    },
    []
  );

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitToGoogleForm(form);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }, [form]);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-transparent text-white">
      <header className="relative z-20 shrink-0 border-b border-white/[0.08] bg-[#050d1a]/90 px-6 pb-5 pt-6 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#050d1a]/80 signage:px-12 signage:pb-6 signage:pt-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl signage:text-4xl">
              Register <span className="text-[#FFB84D]">now</span>
            </h1>
            <p className="mt-1 text-sm text-white/45">
              Fill in your details below — or scan the QR to open this same Register screen on your phone.
            </p>
            <div className="mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#FFB84D] to-[#00E5C3]" />
          </div>
          <div className="w-full sm:max-w-xs">
            <BackButton onClick={() => onNavigate('main')} label="Back to Menu" />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6 signage:px-8 signage:py-8 lg:max-w-[min(100%,80rem)] lg:flex-row lg:items-stretch lg:gap-12 lg:px-8 lg:py-10 floor:px-12 floor:py-12 pb-28">
        {/* —— Left: Soflow-themed form → Google formResponse —— */}
        <motion.div
          className="min-w-0 flex-1 lg:max-w-xl lg:flex-none xl:max-w-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          {submitted ? (
            <div className="rounded-2xl border border-[#00E5C3]/30 bg-[#0a1524]/80 p-6 text-center shadow-xl backdrop-blur-xl signage:p-8">
              <p className="text-lg font-bold text-[#9ef7e8] sm:text-xl">Thank you for registering.</p>
              <p className="mt-2 text-sm text-white/60">
                We’ll contact you only after the event using the information you provided.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm(initial);
                }}
                className="mt-6 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/90 transition hover:border-[#00E5C3]/40 hover:bg-white/10">
                Register again
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="space-y-4 rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#0c1626]/90 to-[#0a1018] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6 lg:p-7">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00E5C3] shadow-[0_0_12px_#00E5C3]" />
                <h2 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">Your contact details</h2>
              </div>
              <div className="space-y-3.5 sm:space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-white/50">
                    Full name <span className="text-[#FF6B4A]">*</span>
                  </span>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange('name')}
                    autoComplete="name"
                    required
                    className="w-full min-h-[48px] rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm font-medium text-white placeholder:text-white/30 outline-none ring-[#00E5C3]/0 transition focus:border-[#00E5C3]/45 focus:ring-2 focus:ring-[#00E5C3]/25 sm:text-base"
                    placeholder="Your full name"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-white/50">
                    Business name <span className="text-[#FF6B4A]">*</span>
                  </span>
                  <input
                    name="businessName"
                    type="text"
                    value={form.businessName}
                    onChange={onChange('businessName')}
                    autoComplete="organization"
                    required
                    className="w-full min-h-[48px] rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm font-medium text-white placeholder:text-white/30 outline-none focus:border-[#00E5C3]/45 focus:ring-2 focus:ring-[#00E5C3]/25 sm:text-base"
                    placeholder="Company or store"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-white/50">
                    Email <span className="text-[#FF6B4A]">*</span>
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange('email')}
                    autoComplete="email"
                    required
                    className="w-full min-h-[48px] rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm font-medium text-white placeholder:text-white/30 outline-none focus:border-[#00E5C3]/45 focus:ring-2 focus:ring-[#00E5C3]/25 sm:text-base"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-white/50">
                    Phone number <span className="text-[#FF6B4A]">*</span>
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange('phone')}
                    autoComplete="tel"
                    required
                    className="w-full min-h-[48px] rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm font-medium text-white placeholder:text-white/30 outline-none focus:border-[#00E5C3]/45 focus:ring-2 focus:ring-[#00E5C3]/25 sm:text-base"
                    placeholder="(555) 000-0000"
                  />
                </label>
              </div>

              <p className="rounded-xl border border-[#4A9EFF]/20 bg-[#4A9EFF]/5 px-3 py-2.5 text-xs leading-relaxed text-[#9ec8ff] sm:text-sm">
                <span className="font-bold text-white/90">Note: </span>
                We use your details to contact you <span className="font-semibold text-white">only after the event</span>.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full min-h-[52px] touch-manipulation items-center justify-center gap-2 rounded-xl border border-[#00E5C3]/35 bg-gradient-to-r from-[#00E5C3]/20 to-[#4A9EFF]/15 py-3 text-base font-bold text-white shadow-[0_0_24px_rgba(0,229,195,0.12)] transition hover:border-[#00E5C3]/55 hover:from-[#00E5C3]/30 active:scale-[0.99] enabled:cursor-pointer disabled:cursor-wait disabled:opacity-70 sm:text-lg">
                {submitting ? (
                  <Loader2 className="h-5 w-5 shrink-0 animate-spin text-[#00E5C3]" strokeWidth={2.25} />
                ) : (
                  <Send className="h-5 w-5 shrink-0 text-[#00E5C3]" strokeWidth={2.25} />
                )}
                {submitting ? 'Sending…' : 'Submit'}
              </button>
            </form>
          )}
        </motion.div>

        {/* —— Right: big QR + copy —— */}
        <motion.div
          className="flex w-full flex-col items-center text-center lg:w-[min(100%,24rem)] lg:shrink-0 xl:w-[min(100%,28rem)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <div className="mb-4 w-full sm:mb-5">
            <div className="mb-1 inline-flex items-center justify-center gap-2 rounded-full border border-[#FF6B4A]/30 bg-[#FF6B4A]/10 px-3 py-1">
              <QrCode className="h-4 w-4 text-[#FF6B4A]" strokeWidth={2.25} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff9a7a]">Phone</span>
            </div>
            <h2 className="mt-2 text-balance text-xl font-black leading-tight text-white sm:text-2xl">
              Register on your phone
            </h2>
            <p className="mt-1.5 text-balance text-sm font-semibold text-[#9ef7e8] sm:text-base">Scan this QR code</p>
            <p className="mt-1 text-xs text-white/40 sm:text-sm">
              Opens this Register form in the browser on your phone (same URL as this display).
            </p>
          </div>

          <div className="relative w-full max-w-[20rem] sm:max-w-[22rem] lg:max-w-none">
            <div
              className="absolute inset-[-6px] rounded-[1.4rem] bg-gradient-to-br from-[#FF6B4A]/40 via-white/5 to-[#00E5C3]/40 opacity-80 blur-sm"
              aria-hidden
            />
            <div className="relative rounded-2xl border border-white/15 bg-white p-3 sm:p-4 floor:p-5 shadow-2xl">
              <img
                src={qrSrc}
                alt="Scan to open Register now on your phone"
                className="h-auto w-full object-contain"
                width={512}
                height={512}
                decoding="async"
                loading="eager"
              />
            </div>
            <p className="mt-3 text-xs font-medium text-white/35">Point your camera at the code</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
