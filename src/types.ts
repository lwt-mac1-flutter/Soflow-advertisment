export type ScreenType = 'main' | 'products' | 'product-details' | 'map' | 'register' | 'customers';

export interface ScreenProps {
  onNavigate: (screen: ScreenType, productId?: number) => void;
}