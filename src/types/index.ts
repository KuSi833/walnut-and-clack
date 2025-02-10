// Base product type with all common properties
export type Product = {
  id: string
  productType: string
  name: string
  description: string
  price: number
  tags: string[]
  images: {
    thumbnail: string
    full: string[]
  }
}

export type KeyboardBuild = Product & {
  productType: 'keyboard-build'
  keyboardCase: KeyboardCase,
  switches: KeyboardSwitch[]
  features: string[]
}

export type KeyboardCase = {
  productType: 'case'
  layout: KeyboardLayout
  woodOptions: {
    name: string
    description: string
    priceModifier: number
  }[]
}

export type KeyboardSwitch = 'Cherry MX Brown' | 'Cherry MX Blue' | 'Cherry MX Red'

export type KeyboardLayout = '60%' | '65%' | '75%' | 'TKL' | 'Full'



export type User = {
  email: string
  name?: string
  orders: Order[]
}

export type Order = {
  id: string
  userId: string
  products: (Product | KeyboardCase)[]
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: Date
  total: number
}

export type CartItem = {
  product: Product
  quantity: number
} 