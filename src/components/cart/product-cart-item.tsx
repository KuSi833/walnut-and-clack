'use client'

import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { CartItem, Product } from '@/types'

interface ProductCartItemProps {
    item: CartItem
    onRemove: () => void
}

export const ProductCartItem = ({ item, onRemove }: ProductCartItemProps) => {
    const product = item.product as Product

    return (
        <div className="flex items-center gap-4 rounded-lg border border-walnut-200 bg-cream-50 p-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-md">
                <Image
                    src={product.images.thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-1 items-center justify-between">
                <div>
                    <h3 className="font-medium text-walnut-900">
                        {product.name}
                    </h3>
                    <div className="mt-2 space-y-1.5">
                        <p className="text-sm text-walnut-600">
                            Quantity: {item.quantity}
                        </p>
                        <p className="font-mono text-sm font-medium text-walnut-800">
                            £{product.price}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onRemove}
                    className="rounded-md p-2 text-walnut-600 hover:bg-walnut-100 hover:text-walnut-900"
                    aria-label="Remove item"
                >
                    <Trash2 className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
} 