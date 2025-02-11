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
    clearCart: () => void
}

const CartContext = createContext<CartContextType>({
    items: [],
    itemCount: 0,
    refreshCart: async () => { },
    addToCart: async () => { },
    removeFromCart: async () => { },
    clearCart: () => { }
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
            userId: (session.user as any).id,
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
                    caseDesignId: build.caseDesign.id,
                    selectedWoodOption: build.selectedWoodOption,
                    totalPrice: build.totalPrice
                }),
            })

            if (!response.ok) throw new Error('Failed to add to cart')

            // Refresh cart to get the actual server state
            await refreshCart()
        } catch (error) {
            console.error('Error adding to cart:', error)
            // Revert optimistic update on error
            setItems(prev => prev.filter(item => item.id !== optimisticItem.id))
            throw error // Re-throw to let the component handle the error
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

    const clearCart = () => {
        setItems([])
    }

    useEffect(() => {
        refreshCart()
    }, [session])

    const value = {
        items,
        itemCount: items.length,
        refreshCart,
        addToCart,
        removeFromCart,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext) 