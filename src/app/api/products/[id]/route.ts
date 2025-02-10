import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        
        const caseDesign = await prisma.keyboardCaseDesign.findUnique({
            where: { id }
        })

        if (!caseDesign) {
            return new NextResponse('Not Found', { status: 404 })
        }

        return NextResponse.json(caseDesign)
    } catch (error) {
        console.error('Error fetching keyboard case:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
} 