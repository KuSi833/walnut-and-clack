import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function DELETE(
    request: Request,
    context: { params: { buildId: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const { buildId } = context.params

        // Get user
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!user) {
            return new NextResponse('User not found', { status: 404 })
        }

        // Delete cart item
        await prisma.cartItem.deleteMany({
            where: {
                userId: user.id,
                buildId: buildId
            }
        })

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error('Error deleting cart item:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
} 