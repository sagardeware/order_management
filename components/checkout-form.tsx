'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'
import { Loader2, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const checkoutSchema = z.object({
    customerName: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),
    customerPhone: z.string()
        .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number starting with 6-9"),
    street: z.string().min(3, "Street/Area is required"),
    landmark: z.string().optional(),
    city: z.string().min(2, "City is required"),
    pincode: z.string().regex(/^\d{6}$/, "Exactly 6 digits allowed"),
})

type CheckoutValues = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
    onBack: () => void
    onSuccess?: () => void
}

export function CheckoutForm({ onBack, onSuccess }: CheckoutFormProps) {
    const router = useRouter()
    const { cart, totalPrice, clearCart } = useCart()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<CheckoutValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            customerName: '',
            customerPhone: '',
            street: '',
            landmark: '',
            city: '',
            pincode: '',
        },
    })

    async function onSubmit(values: CheckoutValues) {
        if (cart.length === 0) {
            toast.error("Your cart is empty")
            return
        }

        setIsSubmitting(true)

        // Combine address fields
        const fullAddress = `${values.street}${values.landmark ? `, ${values.landmark}` : ''}, ${values.city} - ${values.pincode}`

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: values.customerName,
                    customerPhone: values.customerPhone,
                    customerAddress: fullAddress,
                    items: cart.map(item => ({
                        menuItemId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    totalAmount: totalPrice
                })
            })

            if (!response.ok) throw new Error('Failed to place order')

            toast.success("Order placed! Track it in 'My Orders'.")
            clearCart()
            if (onSuccess) onSuccess()
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-4 py-2">
            <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="mb-2 -ml-2 h-8 gap-1 text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
            </Button>

            <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gradient">Delivery Details</h3>
                <p className="text-xs text-muted-foreground font-medium">Please provide your precise delivery location.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="customerName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sagar Deware" className="h-9" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[10px]" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="customerPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mobile</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">+91</span>
                                            <Input placeholder="9876543210" className="h-9 pl-10" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-[10px]" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Street / Area / Flat No.</FormLabel>
                                <FormControl>
                                    <Input placeholder="A-101, Sunshine Apartments" className="h-9" {...field} />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="landmark"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Landmark (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Near City Mall" className="h-9" {...field} />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mumbai" className="h-9" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[10px]" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pincode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pincode</FormLabel>
                                    <FormControl>
                                        <Input placeholder="400001" maxLength={6} className="h-9" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[10px]" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="pt-4 border-t space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground font-medium">Order Total</span>
                            <span className="font-bold text-lg">₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <Button type="submit" className="w-full h-11 text-md font-bold" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Confirm Order'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
