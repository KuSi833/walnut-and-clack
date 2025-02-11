import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import logger from '@/lib/logger'

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.email) {
            logger.warn('Unauthorized attempt to add to cart')
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await request.json()
        logger.debug({ body }, 'Received add to cart request')

        const { caseDesignId, selectedWoodOption, totalPrice } = body

        // Get user
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!user) {
            logger.error({ email: session.user.email }, 'User not found')
            return new NextResponse('User not found', { status: 404 })
        }

        logger.debug({ userId: user.id }, 'Found user')

        // Create build and add to cart in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create the build
            logger.debug({ 
                caseDesignId, 
                selectedWoodOption, 
                totalPrice 
            }, 'Creating build')

            const build = await tx.keyboardCaseBuild.create({
                data: {
                    caseDesignId,
                    selectedWoodOption,
                    totalPrice,
                }
            })

            logger.debug({ buildId: build.id }, 'Build created')

            // Add to cart
            logger.debug({ 
                userId: user.id, 
                buildId: build.id 
            }, 'Adding to cart')

            const cartItem = await tx.cartItem.create({
                data: {
                    userId: user.id,
                    buildId: build.id,
                    quantity: 1
                },
                include: {
                    build: {
                        include: {
                            caseDesign: true
                        }
                    }
                }
            })

            logger.debug({ cartItemId: cartItem.id }, 'Added to cart')
            return cartItem
        })

        logger.info({ 
            userId: user.id, 
            cartItemId: result.id 
        }, 'Successfully added item to cart')

        return NextResponse.json(result)
    } catch (error) {
        logger.error({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        }, 'Error adding to cart')
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.email) {
            logger.warn('Unauthorized attempt to fetch cart')
            return new NextResponse('Unauthorized', { status: 401 })
        }

        // Get user's cart items
        const cartItems = await prisma.cartItem.findMany({
            where: {
                user: {
                    email: session.user.email
                }
            },
            include: {
                build: {
                    include: {
                        caseDesign: true
                    }
                }
            }
        })

        logger.debug({ 
            email: session.user.email, 
            itemCount: cartItems.length 
        }, 'Successfully fetched cart items')

        return NextResponse.json(cartItems)
    } catch (error) {
        logger.error({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        }, 'Error fetching cart')
        return new NextResponse('Internal Error', { status: 500 })
    }
} 