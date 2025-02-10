import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        // Get user's orders
        const orders = await prisma.order.findMany({
            where: {
                user: {
                    email: session.user.email
                }
            },
            include: {
                items: {
                    include: {
                        build: {
                            include: {
                                caseDesign: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(orders)
    } catch (error) {
        console.error('Error fetching orders:', error instanceof Error ? error.message : 'Unknown error')
        return new NextResponse('Internal Error', { status: 500 })
    }
} 