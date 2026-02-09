import { z } from 'zod';

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
});

describe('API Input Validation (Zod Schema)', () => {
    it('should validate correct order data', () => {
        const validOrder = {
            customerName: 'Sagar Deware',
            customerAddress: 'Pune, Maharashtra',
            customerPhone: '9876543210',
            items: [
                { menuItemId: '1', quantity: 2, price: 500 }
            ],
            totalAmount: 1000
        };
        expect(() => orderSchema.parse(validOrder)).not.toThrow();
    });

    it('should fail if phone number is invalid', () => {
        const invalidOrder = {
            customerName: 'Sagar Deware',
            customerAddress: 'Pune, Maharashtra',
            customerPhone: '12345', // Too short
            items: [
                { menuItemId: '1', quantity: 2, price: 500 }
            ],
            totalAmount: 1000
        };
        expect(() => orderSchema.parse(invalidOrder)).toThrow();
    });

    it('should fail if items are empty', () => {
        const invalidOrder = {
            customerName: 'Sagar Deware',
            customerAddress: 'Pune, Maharashtra',
            customerPhone: '9876543210',
            items: [], // At least 1 item required
            totalAmount: 0
        };
        expect(() => orderSchema.parse(invalidOrder)).toThrow();
    });
});
