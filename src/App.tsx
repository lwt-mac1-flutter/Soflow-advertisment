import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenType } from './types';
import { MainScreen } from './components/MainScreen';
import { ProductsScreen } from './components/ProductsScreen';
import { ProductDetailsScreen } from './components/ProductDetailsScreen';
import { ImportMapScreen } from './components/ImportMapScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { CustomersScreen } from './components/CustomersScreen';
export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('main');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const handleNavigate = (screen: ScreenType, productId?: number) => {
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
    <div className="min-h-screen w-screen bg-[#020810] flex items-center justify-center p-0 font-sans overflow-hidden">
      {/* Samsung OM55N-DS (1920x1080) Floorstand Dual - Full viewport */}
      <div className="w-full h-full min-h-screen max-w-[1920px] overflow-hidden relative bg-[#050d1a] shadow-[0_0_50px_rgba(0,229,195,0.1)]">
        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full bg-[#00E5C3] opacity-[0.03] blur-[100px]" />
          <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full bg-[#FF6B4A] opacity-[0.03] blur-[100px]" />
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentScreen === 'product-details' ? `product-${selectedProductId}` : currentScreen}
            custom={direction}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full z-10">
            
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>);

}