import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { KeyboardCaseDesign } from '@/types'

export async function GET() {
    try {
        const products = await prisma.keyboardCaseDesign.findMany()
        
        // Convert Prisma types to our expected types
        const formattedProducts = products.map(product => ({
            ...product,
            price: Number(product.price),
            images: product.images as KeyboardCaseDesign['images'],
            woodOptions: product.woodOptions as KeyboardCaseDesign['woodOptions'],
            reviewStats: product.reviewStats as KeyboardCaseDesign['reviewStats']
        }))

        return NextResponse.json(formattedProducts)
    } catch (error) {
        console.error('Error fetching keyboard cases:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
} 