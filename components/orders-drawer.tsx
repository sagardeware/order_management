'use client'

import { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClipboardList, ChevronRight, Package, Clock } from 'lucide-react'
import { OrderStatusView } from './order-status-view'
import { format } from 'date-fns'

const statusColors = {
    RECEIVED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    PREPARING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
}

export function OrdersDrawer() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(false)
    const [offset, setOffset] = useState(0)
    const LIMIT = 10

    useEffect(() => {
        if (isOpen) {
            setOrders([])
            setOffset(0)
            fetchOrders(0)
        }
    }, [isOpen])

    async function fetchOrders(currentOffset: number) {
        if (currentOffset === 0) setLoading(true)
        else setLoadingMore(true)

        try {
            const res = await fetch(`/api/orders?limit=${LIMIT}&offset=${currentOffset}`)
            if (!res.ok) throw new Error()
            const data = await res.json()
            if (currentOffset === 0) {
                setOrders(data.orders)
            } else {
                setOrders(prev => [...prev, ...data.orders])
            }
            setHasMore(data.hasMore)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    const loadMore = () => {
        const nextOffset = offset + LIMIT
        setOffset(nextOffset)
        fetchOrders(nextOffset)
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (!open) {
            setTimeout(() => setSelectedOrderId(null), 300)
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-9 gap-2 px-2 hover:bg-accent transition-colors">
                    <ClipboardList className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block">Orders</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader className="pb-4">
                    <SheetTitle className="text-2xl font-black text-gradient uppercase tracking-tight">
                        {selectedOrderId ? 'Order Details' : 'Order History'}
                    </SheetTitle>
                    {!selectedOrderId && (
                        <SheetDescription className="font-medium text-xs">
                            Track your current and past orders here.
                        </SheetDescription>
                    )}
                </SheetHeader>

                <div className="flex-1 overflow-hidden flex flex-col pt-2">
                    {selectedOrderId ? (
                        <ScrollArea className="flex-1 pr-4">
                            <OrderStatusView
                                orderId={selectedOrderId}
                                onBack={() => setSelectedOrderId(null)}
                            />
                        </ScrollArea>
                    ) : (
                        <>
                            {loading && orders.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-70">
                                    <div className="relative">
                                        <Clock className="h-12 w-12 animate-spin-slow text-primary" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Package className="h-5 w-5 text-primary" />
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">Syncing Orders...</p>
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center p-8">
                                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center border-2 border-dashed border-muted">
                                        <Package className="h-10 w-10 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <h4 className="font-black text-xl tracking-tight uppercase">No orders yet</h4>
                                        <p className="text-sm text-muted-foreground font-medium max-w-[200px] leading-snug">When you place an order, it will appear here for tracking.</p>
                                    </div>
                                    <Button variant="outline" className="rounded-full px-8 font-bold" onClick={() => setIsOpen(false)}>Explore Menu</Button>
                                </div>
                            ) : (
                                <ScrollArea className="flex-1 pr-4">
                                    <div className="space-y-4 pb-8 px-1">
                                        {orders.map((order) => (
                                            <button
                                                key={order.id}
                                                onClick={() => setSelectedOrderId(order.id)}
                                                className="w-full text-left p-4 rounded-2xl border-2 border-muted bg-card hover:bg-accent/50 hover:border-primary/30 transition-all group relative overflow-hidden"
                                            >
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-black text-white bg-muted-foreground px-1.5 py-0.5 rounded font-mono uppercase">#{order.id.slice(0, 8)}</span>
                                                            <span className="text-[10px] text-muted-foreground font-bold">{format(new Date(order.createdAt), 'MMM d, p')}</span>
                                                        </div>
                                                        <Badge variant="outline" className={`${statusColors[order.status as keyof typeof statusColors]} border-transparent font-black tracking-tighter py-0 text-[9px] h-5 rounded-full`}>
                                                            {order.status.replace(/_/g, ' ')}
                                                        </Badge>
                                                    </div>

                                                    <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform">
                                                        <div className="space-y-0.5">
                                                            <h5 className="font-black text-2xl tracking-tighter">₹{Number(order.totalAmount).toFixed(2)}</h5>
                                                            <p className="text-[11px] text-muted-foreground font-semibold line-clamp-1 italic max-w-[220px]">
                                                                {order.items.map((i: any) => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                                                            </p>
                                                        </div>
                                                        <div className="bg-primary/5 p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                                                            <ChevronRight className="h-5 w-5" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-0 group-hover:w-full transition-all duration-300" />
                                            </button>
                                        ))}
                                        {hasMore && (
                                            <Button
                                                variant="outline"
                                                className="w-full h-12 rounded-xl border-dashed font-bold uppercase tracking-widest text-xs"
                                                onClick={loadMore}
                                                disabled={loadingMore}
                                            >
                                                {loadingMore ? <Clock className="h-4 w-4 animate-spin mr-2" /> : null}
                                                {loadingMore ? 'Loading...' : 'Load 10 More Orders'}
                                            </Button>
                                        )}
                                    </div>
                                </ScrollArea>
                            )}
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
