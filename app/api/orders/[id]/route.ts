import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { updateOrderStatusIfNeeded } from '@/lib/order-utils'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        menuItem: true
                    }
                }
            }
        })

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }

        // Lazy update the status based on time
        const updatedOrder = await updateOrderStatusIfNeeded(order)

        return NextResponse.json(updatedOrder)
    } catch (error) {
        console.error('Error fetching order:', error)
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()
        const { status } = body

        const order = await prisma.order.update({
            where: { id },
            data: { status }
        })

        return NextResponse.json(order)
    } catch (error) {
        console.error('Error updating order:', error)
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }
}
