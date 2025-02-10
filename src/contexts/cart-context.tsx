'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { CartItem, KeyboardCaseBuild } from '@/types'

interface CartContextType {
    items: CartItem[]
    itemCount: number
    refreshCart: () => Promise<void>
    addToCart: (build: KeyboardCaseBuild) => Promise<void>
    removeFromCart: (buildId: string) => Promise<void>
}

const CartContext = createContext<CartContextType>({
    items: [],
    itemCount: 0,
    refreshCart: async () => { },
    addToCart: async () => { },
    removeFromCart: async () => { }
})

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const { data: session } = useSession()

    async function refreshCart() {
        if (!session?.user) {
            setItems([])
            return
        }

        try {
            const response = await fetch('/api/cart')
            if (!response.ok) throw new Error('Failed to fetch cart')
            const cartItems = await response.json()
            setItems(cartItems)
        } catch (error) {
            console.error('Error fetching cart:', error)
            setItems([])
        }
    }

    const addToCart = async (build: KeyboardCaseBuild) => {
        if (!session?.user) return

        // Optimistically add to local state
        const optimisticItem: CartItem = {
            id: `temp-${Date.now()}`,
            userId: (session.user as any).id, // Type assertion for now - should be properly typed in auth configuration
            buildId: build.id,
            quantity: 1,
            build
        }

        setItems(prev => [...prev, optimisticItem])

        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    buildId: build.id,
                    quantity: 1
                }),
            })

            if (!response.ok) throw new Error('Failed to add to cart')

            // Refresh cart to get the actual server state
            await refreshCart()
        } catch (error) {
            console.error('Error adding to cart:', error)
            // Revert optimistic update on error
            setItems(prev => prev.filter(item => item.id !== optimisticItem.id))
        }
    }

    const removeFromCart = async (buildId: string) => {
        if (!session?.user) return

        // Store the current items for potential rollback
        const previousItems = items

        // Optimistically remove from local state
        setItems(prev => prev.filter(item => item.buildId !== buildId))

        try {
            const response = await fetch(`/api/cart/${buildId}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Failed to remove from cart')
        } catch (error) {
            console.error('Error removing from cart:', error)
            // Revert optimistic update on error
            setItems(previousItems)
        }
    }

    useEffect(() => {
        refreshCart()
    }, [session])

    const value = {
        items,
        itemCount: items.length,
        refreshCart,
        addToCart,
        removeFromCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext) 