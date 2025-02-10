'use client'

import { useState } from 'react'
import { KeyboardBuild } from '@/types'
import { ChevronDown, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductCardActionsProps {
    product: KeyboardBuild
}

export const ProductCardActions = ({ product }: ProductCardActionsProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleToggle = () => {
        setIsExpanded(!isExpanded)
    }

    const handleAddToCart = () => {
        const cartItem = {
            product: product,
            quantity: 1
        }

        // Get existing cart
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')

        // Add new item
        localStorage.setItem('cart', JSON.stringify([...existingCart, cartItem]))

        // Force a page refresh to update the cart count in the header
        window.location.reload()
    }

    return (
        <>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-bold">£{product.price}</span>
                <button
                    onClick={handleToggle}
                    className="flex items-center gap-1 text-sm text-walnut"
                >
                    Details
                    <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        isExpanded && "rotate-180"
                    )} />
                </button>
            </div>

            {isExpanded && (
                <div className="mt-4 space-y-3 border-t border-walnut/10 pt-4">
                    <div>
                        <h4 className="font-medium">Layout</h4>
                        <p className="text-sm text-soft-black/70">
                            {product.keyboardCase.layout}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-medium">Wood Options</h4>
                        <div className="space-y-1">
                            {product.keyboardCase.woodOptions.map((wood) => (
                                <p key={wood.name} className="text-sm text-soft-black/70">
                                    {wood.name} (+£{wood.priceModifier})
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium">Available Switches</h4>
                        <div className="space-y-1">
                            {product.switches.map((switch_) => (
                                <p key={switch_} className="text-sm text-soft-black/70">
                                    {switch_}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium">Features</h4>
                        <div className="space-y-1">
                            {product.features.map((feature) => (
                                <p key={feature} className="text-sm text-soft-black/70">
                                    • {feature}
                                </p>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="w-full rounded-md bg-walnut px-4 py-2 text-cream hover:bg-walnut/90"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                        </span>
                    </button>
                </div>
            )}
        </>
    )
} 