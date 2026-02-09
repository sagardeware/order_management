import { Order, OrderStatus } from '@prisma/client'
import prisma from './prisma'

const STATUS_TIMELINES = {
    PREPARING: 20 * 1000,        // 20 seconds
    OUT_FOR_DELIVERY: 45 * 1000, // 45 seconds total (25s after preparing)
    DELIVERED: 90 * 1000        // 90 seconds total (45s after out for delivery)
}

export async function updateOrderStatusIfNeeded(order: any) {
    if (order.status === 'DELIVERED') return order

    const elapsed = Date.now() - new Date(order.createdAt).getTime()
    let newStatus: OrderStatus = order.status

    if (elapsed >= STATUS_TIMELINES.DELIVERED) {
        newStatus = 'DELIVERED'
    } else if (elapsed >= STATUS_TIMELINES.OUT_FOR_DELIVERY) {
        newStatus = 'OUT_FOR_DELIVERY'
    } else if (elapsed >= STATUS_TIMELINES.PREPARING) {
        newStatus = 'PREPARING'
    }

    if (newStatus !== order.status) {
        return await prisma.order.update({
            where: { id: order.id },
            data: { status: newStatus },
            include: {
                items: {
                    include: {
                        menuItem: true
                    }
                }
            }
        })
    }

    return order
}
