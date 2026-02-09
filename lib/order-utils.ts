import { Order, OrderStatus } from '@prisma/client'
import prisma from './prisma'

const STATUS_TIMELINES = {
    PREPARING: 20 * 1000,        // 20 seconds
    OUT_FOR_DELIVERY: 45 * 1000, // 45 seconds total
    DELIVERED: 90 * 1000        // 90 seconds total
}

export function getNewStatus(createdAt: string, currentStatus: OrderStatus): OrderStatus {
    if (currentStatus === 'DELIVERED') return currentStatus

    const elapsed = Date.now() - new Date(createdAt).getTime()

    if (elapsed >= STATUS_TIMELINES.DELIVERED) return 'DELIVERED'
    if (elapsed >= STATUS_TIMELINES.OUT_FOR_DELIVERY) return 'OUT_FOR_DELIVERY'
    if (elapsed >= STATUS_TIMELINES.PREPARING) return 'PREPARING'

    return currentStatus
}

export async function updateOrderStatusIfNeeded(order: any) {
    const newStatus = getNewStatus(order.createdAt, order.status)

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
