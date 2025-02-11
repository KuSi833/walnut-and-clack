import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        
        const reviews = await prisma.review.findMany({
            where: { productId: id },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            },
            orderBy: [
                { helpful: 'desc' },
                { createdAt: 'desc' }
            ]
        })

        return NextResponse.json(reviews)
    } catch (error) {
        console.error('Error fetching reviews:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
} 