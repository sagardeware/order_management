import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '@/hooks/use-cart'
import React from 'react'

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
)

describe('useCart Hook', () => {
    it('should initialize with an empty cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper })
        expect(result.current.cart).toEqual([])
        expect(result.current.totalItems).toBe(0)
    })

    it('should add items to the cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper })

        const item = {
            id: '1',
            name: 'Pizza',
            price: 10,
            quantity: 1,
            image: '/pizza.jpg'
        }

        act(() => {
            result.current.addToCart(item)
        })

        expect(result.current.cart).toHaveLength(1)
        expect(result.current.totalItems).toBe(1)
        expect(result.current.totalPrice).toBe(10)
    })

    it('should update quantity of existing items', () => {
        const { result } = renderHook(() => useCart(), { wrapper })

        const item = { id: '1', name: 'Pizza', price: 10, quantity: 1, image: '/pizza.jpg' }

        act(() => {
            result.current.addToCart(item)
        })

        act(() => {
            result.current.updateQuantity('1', 3)
        })

        expect(result.current.cart[0].quantity).toBe(3)
        expect(result.current.totalPrice).toBe(30)
    })

    it('should remove items from the cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper })

        const item = { id: '1', name: 'Pizza', price: 10, quantity: 1, image: '/pizza.jpg' }

        act(() => {
            result.current.addToCart(item)
        })

        act(() => {
            result.current.removeFromCart('1')
        })

        expect(result.current.cart).toHaveLength(0)
    })
})
