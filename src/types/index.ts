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

export type KeyboardBuildTemplate = Product & {
  productType: 'keyboard-build-template'
  availableCases: KeyboardCase[]
  availableSwitches: KeyboardSwitch[]
  features: string[]
}

export type ConfiguredKeyboardBuild = Product & {
  productType: 'keyboard-build'
  selectedCase: KeyboardCase
  selectedWoodOption: WoodOption
  selectedSwitch: KeyboardSwitch
  features: string[]
}

export type WoodOption = {
  name: string
  description: string
  priceModifier: number
}

export type KeyboardCase = {
  productType: 'case'
  layout: KeyboardLayout
  woodOptions: WoodOption[]
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
  product: ConfiguredKeyboardBuild
  quantity: number
} 