import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await request.json()
        const { buildId, quantity } = body

        // Get user
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!user) {
            return new NextResponse('User not found', { status: 404 })
        }

        // Validate the build exists
        const build = await prisma.keyboardCaseBuild.findUnique({
            where: {
                id: buildId
            }
        })

        if (!build) {
            return new NextResponse('Build not found', { status: 404 })
        }

        // Add to cart
        const cartItem = await prisma.cartItem.create({
            data: {
                userId: user.id,
                buildId,
                quantity
            },
            include: {
                build: {
                    include: {
                        caseDesign: true
                    }
                }
            }
        })

        return NextResponse.json(cartItem)
    } catch (error) {
        console.error('Error adding to cart:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.email) {
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

        return NextResponse.json(cartItems)
    } catch (error) {
        console.error('Error fetching cart:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
} 