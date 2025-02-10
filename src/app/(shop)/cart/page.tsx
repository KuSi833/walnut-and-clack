'use client'

import { useEffect, useState } from 'react'
import { CartItem } from '@/types'
import { KeyboardBuildCartItem } from '@/components/cart/keyboard-build-cart-item'
import { ProductCartItem } from '@/components/cart/product-cart-item'

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        // Load cart items from localStorage
        const items = JSON.parse(localStorage.getItem('cart') || '[]')
        setCartItems(items)

        // Calculate total
        const newTotal = items.reduce((sum: number, item: CartItem) =>
            sum + (item.product.price * item.quantity), 0)
        setTotal(newTotal)
    }, [])

    const handleRemoveItem = (index: number) => {
        const newItems = cartItems.filter((_, i) => i !== index)
        localStorage.setItem('cart', JSON.stringify(newItems))
        setCartItems(newItems)

        // Update total
        const newTotal = newItems.reduce((sum: number, item: CartItem) =>
            sum + (item.product.price * item.quantity), 0)
        setTotal(newTotal)

        // Force header cart count update
        window.location.reload()
    }

    const renderCartItem = (item: CartItem, index: number) => {
        if (item.product.productType === 'keyboard-build') {
            return (
                <KeyboardBuildCartItem
                    key={`${item.product.id}-${index}`}
                    item={item}
                    onRemove={() => handleRemoveItem(index)}
                />
            )
        }

        return (
            <ProductCartItem
                key={`${item.product.id}-${index}`}
                item={item}
                onRemove={() => handleRemoveItem(index)}
            />
        )
    }

    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold text-walnut-900">Your Cart</h1>
            <div className="mt-8">
                {cartItems.length === 0 ? (
                    <p className="text-walnut-600">Your cart is empty.</p>
                ) : (
                    <div className="space-y-8">
                        <div className="space-y-4">
                            {cartItems.map((item, index) => renderCartItem(item, index))}
                        </div>
                        <div className="rounded-lg border border-walnut-200 bg-cream-50 p-6">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-medium text-walnut-900">Total</span>
                                <span className="font-mono text-xl font-bold text-walnut-900">
                                    £{total}
                                </span>
                            </div>
                            <button
                                className="mt-4 w-full rounded-md bg-walnut-800 px-4 py-2 font-medium text-cream-50 hover:bg-walnut-900"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 