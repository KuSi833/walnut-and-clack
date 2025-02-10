'use client'

import Image from 'next/image'
import { Order } from '@/types'
import { format } from 'date-fns'

interface OrderHistoryItemProps {
    order: Order
}

export const OrderHistoryItem = ({ order }: OrderHistoryItemProps) => {
    return (
        <div className="space-y-4 rounded-lg border border-walnut-200 bg-cream-50 p-6">
            <div className="flex items-center justify-between border-b border-walnut-200 pb-4">
                <div>
                    <p className="text-sm text-walnut-600">
                        Order placed on {format(new Date(order.createdAt), 'PPP')}
                    </p>
                    <p className="mt-1 text-sm text-walnut-600">
                        Status: <span className="font-medium capitalize">{order.status}</span>
                    </p>
                </div>
                <p className="font-mono text-lg font-bold text-walnut-900">
                    £{order.total}
                </p>
            </div>

            <div className="space-y-4">
                {order.items.map((item) => (
                    <div key={item.build.id} className="grid grid-cols-[100px_1fr] gap-6">
                        <div className="relative h-24 w-24 overflow-hidden rounded-md">
                            <Image
                                src={item.build.caseDesign.images.thumbnail}
                                alt={item.build.caseDesign.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-medium text-walnut-900">
                                {item.build.caseDesign.name}
                            </h3>
                            <div className="mt-2 space-y-1">
                                <p className="text-sm text-walnut-600">
                                    Wood: {item.build.selectedWoodOption.name}
                                    <span className="ml-1 text-walnut-500">
                                        (+£{item.build.selectedWoodOption.priceModifier})
                                    </span>
                                </p>
                                <p className="text-sm text-walnut-600">
                                    Layout: {item.build.caseDesign.layout}
                                </p>
                                <p className="text-sm text-walnut-600">
                                    Quantity: {item.quantity}
                                </p>
                                <p className="text-sm text-walnut-600">
                                    Price at purchase: £{item.priceAtPurchase}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 