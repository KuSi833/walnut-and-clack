// Base product type with all common properties
export type Product = {
  id: string
  name: string
  description: string
  price: number
  tags: string[]
  images: {
    thumbnail: string
    full: string[]
  }
}

export type WoodOption = {
  name: string
  description: string
  priceModifier: number
}

export type KeyboardLayout = '60%' | '65%' | '75%' | 'TKL' | 'Full'

// Base keyboard case design
export type KeyboardCaseDesign = Product & {
  layout: KeyboardLayout
  woodOptions: WoodOption[]
  features: string[]
}

// A configured build of a keyboard case with selected options
export type KeyboardCaseBuild = {
  id: string
  caseDesign: KeyboardCaseDesign
  selectedWoodOption: WoodOption
  totalPrice: number
}

export type User = {
  id: string
  email: string
  name?: string
  orders: Order[]
  cart: CartItem[]
}

export type Order = {
  id: string
  userId: string
  items: OrderItem[]
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: Date
  total: number
}

export type OrderItem = {
  id: string
  orderId: string
  buildId: string
  quantity: number
  priceAtPurchase: number
  build: KeyboardCaseBuild
}

export type CartItem = {
  id: string
  userId: string
  buildId: string
  quantity: number
  build: KeyboardCaseBuild
} 