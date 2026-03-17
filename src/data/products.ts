export interface Product {
  id: number;
  name: string;
  desc: string;
  price: string;
  image: string;
  longDesc?: string;
  origin?: string;
  careLevel?: string;
  lighting?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Red Sea Coral',
    desc: 'Vibrant red hues, hardy species',
    price: '$$$',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1920&q=90',
    longDesc: 'Sourced from the pristine waters of the Red Sea, these corals are known for their stunning red coloration and exceptional hardiness. Ideal for intermediate aquarists, they thrive in moderate flow and stable water parameters.',
    origin: 'Red Sea',
    careLevel: 'Moderate',
    lighting: 'Moderate to High',
  },
  {
    id: 2,
    name: 'Pacific Staghorn',
    desc: 'Fast growing branching coral',
    price: '$$',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=90',
    longDesc: 'A fast-growing branching coral that creates dramatic underwater structures. Perfect for aquarists looking to fill their tank quickly. Tolerates a range of conditions and is forgiving of minor parameter fluctuations.',
    origin: 'Indo-Pacific',
    careLevel: 'Easy',
    lighting: 'Moderate',
  },
  {
    id: 3,
    name: 'Indo Brain Coral',
    desc: 'Mesmerizing maze patterns',
    price: '$$$$',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=90',
    longDesc: 'Famous for its intricate maze-like patterns and vibrant colors. Indonesian brain corals are highly sought after for their unique appearance. Requires stable alkalinity and calcium levels for optimal growth.',
    origin: 'Indonesia',
    careLevel: 'Moderate',
    lighting: 'Low to Moderate',
  },
  {
    id: 4,
    name: 'Fiji Torch Coral',
    desc: 'Flowing tentacles with glowing tips',
    price: '$$$',
    image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1920&q=90',
    longDesc: 'Stunning euphyllia with long, flowing tentacles that glow under actinic lighting. A centerpiece coral that adds movement and drama to any reef tank. Handle with care—tentacles can extend several inches.',
    origin: 'Fiji',
    careLevel: 'Moderate',
    lighting: 'Moderate',
  },
  {
    id: 5,
    name: 'Tonga Mushroom',
    desc: 'Perfect for beginner aquarists',
    price: '$',
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=1920&q=90',
    longDesc: 'An excellent choice for beginners! These hardy mushrooms come in a variety of colors and are incredibly forgiving. They multiply readily and can be fragged easily. Great for low-light setups.',
    origin: 'Tonga',
    careLevel: 'Easy',
    lighting: 'Low',
  },
  {
    id: 6,
    name: 'Australian Acropora',
    desc: 'Premium vivid coloration',
    price: '$$$$$',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=90',
    longDesc: 'The crown jewel of SPS corals. Australian Acropora features intense, vivid colors that rival any coral in the hobby. Requires pristine water quality, strong flow, and high-intensity lighting. For experienced reef keepers.',
    origin: 'Australia',
    careLevel: 'Advanced',
    lighting: 'High',
  },
];
