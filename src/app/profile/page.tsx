'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Order } from '@/types'
import { OrderHistoryItem } from '@/components/orders/order-history-item'

export default function ProfilePage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrders = async () => {
            if (!session?.user) {
                router.push('/auth/signin')
                return
            }

            try {
                const response = await fetch('/api/orders')
                if (!response.ok) throw new Error('Failed to fetch orders')
                const data = await response.json()
                setOrders(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch orders')
            } finally {
                setIsLoading(false)
            }
        }

        fetchOrders()
    }, [session, router])

    if (!session) {
        return null
    }

    if (isLoading) {
        return (
            <div className="container py-8">
                <div className="flex items-center justify-center">
                    <div className="text-lg">Loading...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-8">
                <div className="flex items-center justify-center">
                    <div className="text-lg text-red-500">{error}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-walnut-900">Your Profile</h1>
                <p className="mt-2 text-walnut-600">
                    Welcome back, {session.user.name || session.user.email}
                </p>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-walnut-900">Order History</h2>
                {orders.length === 0 ? (
                    <p className="text-walnut-600">You haven't placed any orders yet.</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <OrderHistoryItem key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
} 