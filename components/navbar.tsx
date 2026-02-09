'use client'

import Link from 'next/link'
import { Utensils } from 'lucide-react'
import { CartDrawer } from './cart-drawer'
import { ThemeToggle } from './theme-toggle'
import { OrdersDrawer } from './orders-drawer'

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary text-white p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                            <Utensils className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">FoodieDash</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <OrdersDrawer />
                    <ThemeToggle />
                    <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
                    <CartDrawer />
                </div>
            </div>
        </header>
    )
}
