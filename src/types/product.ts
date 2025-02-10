export interface Product {
    id: string
    name: string
    description: string
    price: number
    images: {
        thumbnail: string
        full: string[]
    }
    details: {
        layout: '60%' | '65%' | '75%' | 'TKL' | 'Full'
        switches: string[]
        woodOptions: {
            name: string
            description: string
            priceModifier: number
        }[]
        features: string[]
    }
    tags: string[]
} 