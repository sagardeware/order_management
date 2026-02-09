import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const orderSchema = z.object({
    customerName: z.string().min(2).max(50),
    customerAddress: z.string().min(5),
    customerPhone: z.string().regex(/^[6-9]\d{9}$/),
    items: z.array(z.object({
        menuItemId: z.string(),
        quantity: z.number().min(1).max(10),
        price: z.number()
    })).min(1),
    totalAmount: z.number()
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const validatedData = orderSchema.parse(body)

        const order = await prisma.order.create({
            data: {
                customerName: validatedData.customerName,
                customerAddress: validatedData.customerAddress,
                customerPhone: validatedData.customerPhone,
                totalAmount: validatedData.totalAmount,
                items: {
                    create: validatedData.items.map(item => ({
                        menuItemId: item.menuItemId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: {
                items: true
            }
        })

        return NextResponse.json(order, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 })
        }
        console.error('Error creating order:', error)
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }
}
import { updateOrderStatusIfNeeded } from '@/lib/order-utils'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const limit = parseInt(searchParams.get('limit') || '10')
        const offset = parseInt(searchParams.get('offset') || '0')

        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        menuItem: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: limit + 1, // Fetch one extra to check if there are more
            skip: offset,
        })

        const hasMore = orders.length > limit
        const paginatedOrders = hasMore ? orders.slice(0, limit) : orders

        // Lazy update all orders to ensure list is accurate
        const updatedOrders = await Promise.all(
            paginatedOrders.map((order: any) => updateOrderStatusIfNeeded(order))
        )

        return NextResponse.json({
            orders: updatedOrders,
            hasMore
        })
    } catch (error) {
        console.error('Error fetching orders:', error)
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }
}
