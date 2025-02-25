import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { KeyboardCaseDesign } from '@/types'

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        
        const product = await prisma.keyboardCaseDesign.findUnique({
            where: { id }
        })

        if (!product) {
            return new NextResponse('Not Found', { status: 404 })
        }

        // Convert Prisma types to our expected types
        const formattedProduct = {
            ...product,
            price: Number(product.price),
            images: product.images as KeyboardCaseDesign['images'],
            woodOptions: product.woodOptions as KeyboardCaseDesign['woodOptions'],
            reviewStats: product.reviewStats as KeyboardCaseDesign['reviewStats']
        }

        return NextResponse.json(formattedProduct)
    } catch (error) {
        console.error('Error fetching keyboard case:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
} 