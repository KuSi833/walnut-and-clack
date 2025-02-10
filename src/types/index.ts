export type Product = {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  size: '60%' | '65%' | '75%'
  inStock: boolean
  specs: {
    material: string
    weight: string
    dimensions: string
  }
}

export type User = {
  id: string
  email: string
  name?: string
  orders: Order[]
}

export type Order = {
  id: string
  userId: string
  products: Product[]
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: Date
  total: number
} 