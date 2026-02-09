import { getNewStatus } from '@/lib/order-utils'

describe('Order Status Simulation Logic', () => {
    const now = Date.now()

    it('should stay RECEIVED if less than 20 seconds have passed', () => {
        const createdAt = new Date(now - 10 * 1000).toISOString()
        expect(getNewStatus(createdAt, 'RECEIVED')).toBe('RECEIVED')
    })

    it('should transition to PREPARING after 20 seconds', () => {
        const createdAt = new Date(now - 25 * 1000).toISOString()
        expect(getNewStatus(createdAt, 'RECEIVED')).toBe('PREPARING')
    })

    it('should transition to OUT_FOR_DELIVERY after 45 seconds', () => {
        const createdAt = new Date(now - 50 * 1000).toISOString()
        expect(getNewStatus(createdAt, 'PREPARING')).toBe('OUT_FOR_DELIVERY')
    })

    it('should transition to DELIVERED after 90 seconds', () => {
        const createdAt = new Date(now - 100 * 1000).toISOString()
        expect(getNewStatus(createdAt, 'OUT_FOR_DELIVERY')).toBe('DELIVERED')
    })

    it('should NOT regress status if time is modified', () => {
        const createdAt = new Date(now - 10 * 1000).toISOString()
        expect(getNewStatus(createdAt, 'DELIVERED')).toBe('DELIVERED')
    })
})
