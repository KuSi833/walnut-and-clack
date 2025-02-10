'use client'

import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { CartItem } from '@/types'

interface KeyboardBuildCartItemProps {
    item: CartItem
    onRemove: () => void
}

export const KeyboardBuildCartItem = ({ item, onRemove }: KeyboardBuildCartItemProps) => {
    const { build } = item
    const { caseDesign, selectedWoodOption, totalPrice } = build

    return (
        <div className="grid grid-cols-[100px_150px_1fr_auto] gap-6 items-center rounded-lg border border-walnut-200 bg-cream-50 p-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-md">
                <Image
                    src={caseDesign.images.thumbnail}
                    alt={caseDesign.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="space-y-2">
                <h3 className="font-medium text-walnut-900">
                    {caseDesign.name}
                </h3>
                <p className="text-sm text-walnut-600">
                    Quantity: {item.quantity}
                </p>
                <p className="font-mono text-sm font-medium text-walnut-800">
                    £{totalPrice}
                </p>
            </div>

            <div className="space-y-2">
                <p className="text-sm text-walnut-600">
                    Wood: {selectedWoodOption.name}
                    <span className="ml-1 text-walnut-500">
                        (+£{selectedWoodOption.priceModifier})
                    </span>
                </p>
                <p className="text-sm text-walnut-600">
                    Layout: {caseDesign.layout}
                </p>
                <p className="text-sm text-walnut-600">
                    Features: {caseDesign.features.join(', ')}
                </p>
            </div>

            <button
                onClick={onRemove}
                className="rounded-md p-2 text-walnut-600 hover:bg-walnut-100 hover:text-walnut-900"
                aria-label="Remove item"
            >
                <Trash2 className="h-5 w-5" />
            </button>
        </div>
    )
}