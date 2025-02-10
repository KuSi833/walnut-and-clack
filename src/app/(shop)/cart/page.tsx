'use client'

import { KeyboardBuildCartItem } from '@/components/cart/keyboard-build-cart-item'
import { useCart } from '@/contexts/cart-context'

export default function CartPage() {
    const { items, removeFromCart } = useCart()

    const handleRemoveItem = async (buildId: string) => {
        try {
            await removeFromCart(buildId)
        } catch (error) {
            console.error('Error removing item:', error)
        }
    }

    const total = items.reduce((sum, item) =>
        sum + (item.build.totalPrice * item.quantity), 0
    )

    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold text-walnut-900">Your Cart</h1>
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