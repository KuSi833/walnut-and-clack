import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import logger from '@/lib/logger'

const prisma = new PrismaClient()

export async function POST() {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.email) {
            logger.warn({ email: session?.user?.email }, 'Unauthorized attempt to checkout')
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
            logger.error({ email: session.user.email }, 'User not found during checkout')
            return new NextResponse('User not found', { status: 404 })
        }

        if (user.cart.length === 0) {
            logger.warn({ userId: user.id }, 'Attempted checkout with empty cart')
            return new NextResponse('Cart is empty', { status: 400 })
        }

        // Calculate total
        const total = user.cart.reduce(
            (sum, item) => sum + (Number(item.build.totalPrice) * item.quantity),
            0
        )

        logger.debug({ userId: user.id, total }, 'Calculated order total')

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
                        priceAtPurchase: Number(item.build.totalPrice)
                    }))
                }
            }
        })

        logger.debug({ orderId: order.id }, 'Created order')

        // Clear the user's cart
        await prisma.cartItem.deleteMany({
            where: {
                userId: user.id
            }
        })

        logger.info({ 
            userId: user.id, 
            orderId: order.id, 
            total 
        }, 'Successfully processed checkout')

        return NextResponse.json(order)
    } catch (error) {
        logger.error({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        }, 'Error processing checkout')
        return new NextResponse('Internal Error', { status: 500 })
    }
} 