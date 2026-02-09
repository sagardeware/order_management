'use client'

import { Plus, Minus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import Image from 'next/image'
import { toast } from "sonner"

interface FoodCardProps {
    id: string
    name: string
    description: string
    price: number
    image: string
    category?: string | null
}

export function FoodCard({ id, name, description, price, image, category }: FoodCardProps) {
    const { cart, addToCart, updateQuantity } = useCart()

    const cartItem = cart.find(item => item.id === id)
    const quantity = cartItem?.quantity || 0

    const handleAddToCart = () => {
        addToCart({
            id,
            name,
            price,
            image,
            quantity: 1
        })
        toast.success(`${name} added to cart!`)
    }

    return (
        <Card className="overflow-hidden group transition-all hover:shadow-lg flex flex-col h-full card-hover">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                />
                {category && (
                    <Badge className="absolute top-2 right-2 font-medium">
                        {category}
                    </Badge>
                )}
            </div>
            <div className="flex-1">
                <CardHeader className="p-4">
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg line-clamp-1">{name}</CardTitle>
                        <span className="font-bold text-primary">₹{price.toFixed(2)}</span>
                    </div>
                    <CardDescription className="line-clamp-2 h-10">
                        {description}
                    </CardDescription>
                </CardHeader>
            </div>
            <CardFooter className="p-4 pt-0 mt-auto">
                {quantity > 0 ? (
                    <div className="flex items-center justify-between w-full bg-secondary/50 rounded-lg p-1 border border-primary/20">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary hover:text-white hover:bg-primary transition-all"
                            onClick={() => updateQuantity(id, quantity - 1)}
                        >
                            {quantity === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                        </Button>
                        <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary hover:text-white hover:bg-primary transition-all"
                            onClick={() => updateQuantity(id, quantity + 1)}
                            disabled={quantity >= 10}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <Button onClick={handleAddToCart} className="w-full gap-2 transition-all hover:scale-[1.02] active:scale-95">
                        <Plus className="h-4 w-4" />
                        Add to Cart
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
