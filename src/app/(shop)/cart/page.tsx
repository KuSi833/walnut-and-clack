'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { KeyboardBuildCartItem } from '@/components/cart/keyboard-build-cart-item'
import { useCart } from '@/contexts/cart-context'

export default function CartPage() {
    const router = useRouter()
    const { items, removeFromCart, clearCart } = useCart()
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleRemoveItem = async (buildId: string) => {
        try {
            await removeFromCart(buildId)
        } catch (error) {
            console.error('Error removing item:', error)
        }
    }

    const handleCheckout = async () => {
        setIsCheckingOut(true)
        setError(null)

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }

            // Wait for the order to be created and cart to be cleared in the database
            await response.json()

            // Now that the server operation is confirmed successful, clear local state
            clearCart()

            // Only redirect after everything is confirmed
            router.push('/profile')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to checkout')
            setIsCheckingOut(false)
        }
    }

    const total = items.reduce((sum, item) =>
        sum + (item.build.totalPrice * item.quantity), 0
    )

    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold text-walnut-900">Your Cart</h1>
            {error && (
                <div className="mt-4 rounded-md bg-red-50 p-4 text-red-500">
                    {error}
                </div>
            )}
            <div className="mt-8">
                {items.length === 0 ? (
                    <p className="text-walnut-600">Your cart is empty.</p>
                ) : (
                    <div className="space-y-8">
                        <div className="space-y-4">
                            {items.map((item) => (
                                <KeyboardBuildCartItem
                                    key={item.id}
                                    item={item}
                                    onRemove={() => handleRemoveItem(item.buildId)}
                                />
                            ))}
                        </div>
                        <div className="rounded-lg border border-walnut-200 bg-cream-50 p-6">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-medium text-walnut-900">Total</span>
                                <span className="font-mono text-xl font-bold text-walnut-900">
                                    £{total}
                                </span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="mt-4 w-full rounded-md bg-walnut-800 px-4 py-2 font-medium text-cream-50 hover:bg-walnut-900 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 