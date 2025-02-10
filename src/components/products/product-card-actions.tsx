'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { ChevronDown, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductCardActionsProps {
    product: Product
}

export const ProductCardActions = ({ product }: ProductCardActionsProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleToggle = () => {
        setIsExpanded(!isExpanded)
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
                        <h4 className="font-medium">Compatibility</h4>
                        <p className="text-sm text-soft-black/70">
                            {product.details.compatibility.join(', ')}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-medium">Material</h4>
                        <p className="text-sm text-soft-black/70">{product.details.material}</p>
                    </div>
                    {product.details.syntax && (
                        <div>
                            <h4 className="font-medium">Syntax</h4>
                            <code className="block rounded bg-soft-black/5 p-2 text-sm">
                                {product.details.syntax}
                            </code>
                        </div>
                    )}
                    {product.details.codeTheme && (
                        <div>
                            <h4 className="font-medium">Theme</h4>
                            <p className="text-sm text-soft-black/70">{product.details.codeTheme}</p>
                        </div>
                    )}
                    <button className="w-full rounded-md bg-walnut px-4 py-2 text-cream hover:bg-walnut/90">
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