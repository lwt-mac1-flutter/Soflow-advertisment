import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from './types';
import { MainScreen } from './components/MainScreen';
import { ProductsScreen } from './components/ProductsScreen';
import { ProductDetailsScreen } from './components/ProductDetailsScreen';
import { ImportMapScreen } from './components/ImportMapScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { CustomersScreen } from './components/CustomersScreen';

function screenFromLocation(): ScreenType {
  if (typeof window === 'undefined') return 'main';
  const hash = window.location.hash.replace(/^#/, '').replace(/^\//, '');
  if (hash === 'register') return 'register';
  if (new URLSearchParams(window.location.search).get('screen') === 'register') {
    return 'register';
  }
  return 'main';
}

function clearRegisterHashFromUrl() {
  if (typeof window === 'undefined') return;
  const hash = window.location.hash.replace(/^#/, '').replace(/^\//, '');
  if (hash !== 'register') return;
  const u = new URL(window.location.href);
  u.hash = '';
  history.replaceState(null, '', u.pathname + u.search);
}

function ensureRegisterHashInUrl() {
  if (typeof window === 'undefined') return;
  const hash = window.location.hash.replace(/^#/, '').replace(/^\//, '');
  if (hash === 'register') return;
  history.replaceState(
    null,
    '',
    `${window.location.pathname}${window.location.search}#register`
  );
}

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() => screenFromLocation());
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const onHash = () => {
      const next = screenFromLocation();
      setDirection(next === 'main' ? -1 : 1);
      setCurrentScreen(next);
      if (next !== 'product-details') setSelectedProductId(null);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleNavigate = (screen: ScreenType, productId?: number) => {
    if (screen === 'register') {
      ensureRegisterHashInUrl();
    } else {
      clearRegisterHashFromUrl();
    }
    setDirection(screen === 'main' ? -1 : 1);
    setCurrentScreen(screen);
    setSelectedProductId(screen === 'product-details' && productId ? productId : null);
  };
  const screenVariants = {
    initial: (dir: number) => ({
      y: dir > 0 ? '100%' : '-20%',
      opacity: dir > 0 ? 1 : 0
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (dir: number) => ({
      y: dir > 0 ? '-20%' : '100%',
      opacity: dir > 0 ? 0 : 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  /** No `y` transform — `transform` on an ancestor breaks `position:sticky` inside the screen. */
  const productsScreenVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
    }
  };
  const renderScreen = () => {
    switch (currentScreen) {
      case 'main':
        return <MainScreen onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsScreen onNavigate={handleNavigate} />;
      case 'product-details':
        return selectedProductId ? (
          <ProductDetailsScreen
            productId={selectedProductId}
            onNavigate={handleNavigate}
          />
        ) : (
          <ProductsScreen onNavigate={handleNavigate} />
        );
      case 'map':
        return <ImportMapScreen onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterScreen onNavigate={handleNavigate} />;
      case 'customers':
        return <CustomersScreen onNavigate={handleNavigate} />;
      default:
        return <MainScreen onNavigate={handleNavigate} />;
    }
  };
  return (
    <div className="min-h-[100dvh] min-h-screen w-full bg-[#020810] p-0 font-sans overflow-x-hidden">
      {/* 32" 4K UHD touch +1920 signage — use full width up to 4K */}
      <div className="relative mx-auto w-full min-h-[100dvh] min-h-screen max-w-[3840px] bg-[#050d1a] shadow-[0_0_50px_rgba(0,229,195,0.1)] overflow-x-hidden">
        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden min-h-[100dvh]">
          <div className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full bg-[#00E5C3] opacity-[0.03] blur-[100px]" />
          <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full bg-[#FF6B4A] opacity-[0.03] blur-[100px]" />
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentScreen === 'product-details' ? `product-${selectedProductId}` : currentScreen}
            custom={direction}
            variants={
              currentScreen === 'products' ? productsScreenVariants : screenVariants
            }
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 flex min-h-[100dvh] min-h-screen w-full flex-col">
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>);

}