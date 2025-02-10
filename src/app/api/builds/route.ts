import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { caseDesignId, selectedWoodOption, totalPrice } = body

        // Validate the case design exists
        const caseDesign = await prisma.keyboardCaseDesign.findUnique({
            where: {
                id: caseDesignId
            }
        })

        if (!caseDesign) {
            return new NextResponse('Case design not found', { status: 404 })
        }

        // Create the build
        const build = await prisma.keyboardCaseBuild.create({
            data: {
                caseDesignId,
                selectedWoodOption,
                totalPrice,
            }
        })

        return NextResponse.json(build)
    } catch (error) {
        console.error('Error creating keyboard case build:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
} 