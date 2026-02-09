import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const menuItems = [
        {
            name: 'Classic Margherita Pizza',
            description: 'Fresh mozzarella, tomato sauce, and basil on a thin crust.',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop',
            category: 'Pizza'
        },
        {
            name: 'Gourmet Cheese Burger',
            description: 'Angus beef patty with cheddar, lettuce, tomato, and secret sauce.',
            price: 10.50,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
            category: 'Burgers'
        },
        {
            name: 'Spicy Chicken Wings',
            description: 'Crispy wings tossed in buffalo sauce, served with blue cheese dip.',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=800&auto=format&fit=crop',
            category: 'Appetizers'
        },
        {
            name: 'Garden Fresh Salad',
            description: 'Mixed greens, cucumber, cherry tomatoes, and balsamic glaze.',
            price: 7.25,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
            category: 'Salads'
        },
        {
            name: 'Iced Caramel Macchiato',
            description: 'Espresso with cold milk and sweet caramel drizzle.',
            price: 4.50,
            image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=800&auto=format&fit=crop',
            category: 'Beverages'
        }
    ]

    console.log('Seeding menu items...')

    for (const item of menuItems) {
        await prisma.menuItem.upsert({
            where: { name: item.name },
            update: item,
            create: item,
        })
    }

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
