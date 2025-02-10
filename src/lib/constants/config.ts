export const SITE_CONFIG = {
  name: 'Walnut & Clack',
  description: 'Artisanal wooden keyboard cases',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
}

export const KEYBOARD_SIZES = ['60%', '65%', '75%'] as const 