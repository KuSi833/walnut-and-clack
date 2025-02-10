import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST() {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        // Get user with cart items
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            include: {
                cart: {
                    include: {
                        build: true
                    }
                }
            }
        })

        if (!user) {
            return new NextResponse('User not found', { status: 404 })
        }

        if (user.cart.length === 0) {
            return new NextResponse('Cart is empty', { status: 400 })
        }

        // Calculate total
        const total = user.cart.reduce(
            (sum, item) => sum + (item.build.totalPrice * item.quantity),
            0
        )

        // Create order with all cart items
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                total,
                status: 'pending',
                items: {
                    create: user.cart.map(item => ({
                        buildId: item.buildId,
                        quantity: item.quantity,
                        priceAtPurchase: item.build.totalPrice
                    }))
                }
            }
        })

        // Clear the user's cart
        await prisma.cartItem.deleteMany({
            where: {
                userId: user.id
            }
        })

        return NextResponse.json(order)
    } catch (error) {
        console.error('Error processing checkout:', error instanceof Error ? error.message : 'Unknown error')
        return new NextResponse('Internal Error', { status: 500 })
    }
} 