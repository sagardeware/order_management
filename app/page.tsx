'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { FoodCard } from '@/components/food-card'
import { Skeleton } from '@/components/ui/skeleton'

interface MenuItem {
    id: string
    name: string
    description: string
    price: any // Prisma Decimal
    image: string
    category: string | null
}

export default function HomePage() {
    const [menu, setMenu] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await fetch('/api/menu')
                const data = await res.json()
                setMenu(data)
            } catch (error) {
                console.error('Failed to fetch menu:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchMenu()
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container max-w-7xl mx-auto px-4 py-8">
                <section className="mb-12 text-center sm:text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                        Delicious food, <span className="text-primary text-gradient">delivered to you</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Choose from our curated selection of high-quality dishes, prepared fresh just for you.
                    </p>
                </section>

                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {loading ? (
                            Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className=" space-y-4">
                                    <Skeleton className="h-48 w-full rounded-xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            menu.map((item) => (
                                <FoodCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    description={item.description}
                                    price={Number(item.price)}
                                    image={item.image}
                                    category={item.category}
                                />
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}
