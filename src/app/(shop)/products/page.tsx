'use client'

import { ProductCard } from '@/components/products/product-card'
import { KeyboardCaseDesign } from '@/types'
import { useEffect, useState } from 'react'

export default function ProductsPage() {
    const [products, setProducts] = useState<KeyboardCaseDesign[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products')
                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }
                const data = await response.json()
                setProducts(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (isLoading) {
        return (
            <div className="container py-8">
                <div className="flex items-center justify-center">
                    <div className="text-lg">Loading...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-8">
                <div className="flex items-center justify-center">
                    <div className="text-lg text-red-500">{error}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-8">
            <h1 className="mb-8 text-3xl font-bold">Keyboard Cases</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
} 