'use client'

import { useEffect, useState } from 'react'
import { CartItem } from '@/types'
import { KeyboardBuildCartItem } from '@/components/cart/keyboard-build-cart-item'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [total, setTotal] = useState<number>(0)
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await fetch('/api/cart')
                if (!response.ok) throw new Error('Failed to fetch cart')
                const items = await response.json()
                setCartItems(items)

                // Calculate total
                const newTotal = items.reduce((sum: number, item: CartItem) =>
                    sum + (item.build.totalPrice * item.quantity), 0)
                setTotal(newTotal)
            } catch (error) {
                console.error('Error fetching cart:', error)
            }
        }

        if (session?.user) {
            fetchCartItems()
        }
    }, [session])

    const handleRemoveItem = async (buildId: string) => {
        try {
            const response = await fetch(`/api/cart/${buildId}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Failed to remove item')

            // Refresh the cart items
            const updatedResponse = await fetch('/api/cart')
            if (!updatedResponse.ok) throw new Error('Failed to fetch updated cart')

            const updatedItems = await updatedResponse.json()
            setCartItems(updatedItems)

            // Update total
            const newTotal = updatedItems.reduce((sum: number, item: CartItem) =>
                sum + (item.build.totalPrice * item.quantity), 0)
            setTotal(newTotal)

            // Refresh the page to update header
            router.refresh()
        } catch (error) {
            console.error('Error removing item:', error)
        }
    }

    const renderCartItem = (item: CartItem) => {
        return (
            <KeyboardBuildCartItem
                key={item.id}
                item={item}
                onRemove={() => handleRemoveItem(item.buildId)}
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
                            {cartItems.map((item) => renderCartItem(item))}
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