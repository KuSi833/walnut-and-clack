import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import logger from '@/lib/logger'

export async function DELETE(
    request: Request,
    context: { params: Promise<{ buildId: string }> }
) {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.email) {
            logger.warn({ email: session?.user?.email }, 'Unauthorized attempt to remove from cart')
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const { buildId } = await context.params

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

        // Delete cart item
        await prisma.cartItem.deleteMany({
            where: {
                userId: user.id,
                buildId
            }
        })

        logger.info({ userId: user.id, buildId }, 'Successfully removed item from cart')
        return new NextResponse(null, { status: 204 })
    } catch (error) {
        logger.error({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        }, 'Error removing from cart')
        return new NextResponse('Internal Error', { status: 500 })
    }
} 