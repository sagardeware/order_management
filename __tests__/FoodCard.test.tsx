import { render, screen, fireEvent } from '@testing-library/react'
import { FoodCard } from '@/components/food-card'
import { CartProvider } from '@/hooks/use-cart'
import { Toaster } from 'sonner'

const mockItem = {
    id: '1',
    name: 'Test Pizza',
    description: 'A delicious test pizza',
    price: 15.99,
    image: 'https://example.com/pizza.jpg',
    category: 'Pizza'
}

describe('FoodCard', () => {
    it('renders food details correctly', () => {
        render(
            <CartProvider>
                <FoodCard {...mockItem} />
            </CartProvider>
        )

        expect(screen.getByText('Test Pizza')).toBeInTheDocument()
        expect(screen.getByText('A delicious test pizza')).toBeInTheDocument()
        expect(screen.getByText('$15.99')).toBeInTheDocument()
        expect(screen.getByText('Pizza')).toBeInTheDocument()
    })

    it('adds item to cart when button is clicked', () => {
        render(
            <CartProvider>
                <Toaster />
                <FoodCard {...mockItem} />
            </CartProvider>
        )

        const addButton = screen.getByRole('button', { name: /add to cart/i })
        fireEvent.click(addButton)

        // Check if toast appearance is triggered (using partial text as sonner might have wrapper)
        expect(screen.getByText(/added to cart/i)).toBeInTheDocument()
    })
})
