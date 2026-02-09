'use client'

import { ShoppingCart, Plus, Minus, X, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'
import { CheckoutForm } from './checkout-form'

export function CartDrawer() {
    const { cart, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart()
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (!open) {
            // Reset to cart view when closed after animation
            setTimeout(() => setIsCheckingOut(false), 300)
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>{isCheckingOut ? 'Checkout' : 'Your Cart'}</SheetTitle>
                    {!isCheckingOut && (
                        <SheetDescription>
                            {totalItems === 0
                                ? "Your cart is empty. Add some delicious food!"
                                : `You have ${totalItems} items in your cart.`}
                        </SheetDescription>
                    )}
                </SheetHeader>

                <div className="flex-1 overflow-hidden flex flex-col pt-4">
                    {isCheckingOut ? (
                        <ScrollArea className="flex-1 pr-4">
                            <CheckoutForm
                                onBack={() => setIsCheckingOut(false)}
                                onSuccess={() => setIsOpen(false)}
                            />
                        </ScrollArea>
                    ) : (
                        <>
                            <ScrollArea className="flex-1 pr-4">
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-center">
                                            <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <h4 className="text-sm font-medium leading-none">{item.name}</h4>
                                                <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                                                <div className="flex items-center gap-2 pt-1">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <p className="text-sm font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            {totalItems > 0 && (
                                <div className="space-y-4 pt-4 border-t mt-4">
                                    <div className="flex items-center justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span>₹{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <SheetFooter>
                                        <Button onClick={() => setIsCheckingOut(true)} className="w-full h-12 text-md">
                                            Proceed to Checkout
                                        </Button>
                                    </SheetFooter>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
