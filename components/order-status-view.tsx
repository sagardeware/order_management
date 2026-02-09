'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Package, Truck, UtensilsCrossed, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

const statuses = {
    RECEIVED: { label: 'Order Received', progress: 25, icon: Package, color: 'text-blue-500' },
    PREPARING: { label: 'Preparing food', progress: 50, icon: UtensilsCrossed, color: 'text-yellow-500' },
    OUT_FOR_DELIVERY: { label: 'Out for Delivery', progress: 75, icon: Truck, color: 'text-purple-500' },
    DELIVERED: { label: 'Delivered', progress: 100, icon: CheckCircle2, color: 'text-green-500' },
}

interface OrderStatusViewProps {
    orderId: string
    onBack: () => void
}

export function OrderStatusView({ orderId, onBack }: OrderStatusViewProps) {
    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStatus() {
            try {
                const res = await fetch(`/api/orders/${orderId}`)
                if (!res.ok) throw new Error()
                const data = await res.json()
                setOrder(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchStatus()
        const interval = setInterval(fetchStatus, 5000)
        return () => clearInterval(interval)
    }, [orderId])

    if (loading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Checking status...</div>

    if (!order) return (
        <div className="p-8 text-center bg-destructive/10 rounded-lg">
            <p className="text-destructive font-medium">Order not found.</p>
            <Button variant="link" onClick={onBack}>Go back</Button>
        </div>
    )

    const currentStatus = statuses[order.status as keyof typeof statuses]
    const StatusIcon = currentStatus.icon
    const isOnWay = order.status === 'OUT_FOR_DELIVERY'

    return (
        <div className="space-y-6 pb-8">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 -ml-2 text-muted-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Orders
            </Button>

            <div className="flex flex-col items-center text-center space-y-4 pt-2">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-muted/50 border-4 border-muted relative ${currentStatus.color}`}>
                    <StatusIcon className={`w-10 h-10 ${isOnWay ? 'animate-bounce' : ''}`} />
                    {isOnWay && (
                        <div className="absolute -inset-1 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    )}
                </div>
                <div className="space-y-1">
                    <Badge variant="secondary" className="mb-1 uppercase tracking-widest text-[10px]">Current Status</Badge>
                    <h3 className="text-2xl font-black tracking-tight text-gradient">{currentStatus.label}</h3>
                    <p className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded-full inline-block">#{orderId.slice(0, 8).toUpperCase()}</p>
                </div>
            </div>

            {isOnWay && (
                <div className="relative h-20 bg-muted/20 rounded-2xl border border-dashed border-primary/30 overflow-hidden flex items-center px-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse" />
                    <div className="flex justify-between w-full items-center relative z-10">
                        <div className="p-2 bg-background border rounded-lg shadow-sm">
                            <UtensilsCrossed className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 mx-4 relative h-1 bg-muted rounded-full overflow-hidden">
                            <div className="absolute inset-0 bg-primary/20 rounded-full" />
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 animate-delivery-move">
                                <Truck className="w-6 h-6 text-primary -mt-6 -ml-3" />
                            </div>
                        </div>
                        <div className="p-2 bg-background border rounded-lg shadow-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-4 py-4 bg-muted/10 rounded-2xl p-4 border border-muted">
                <div className="flex justify-between text-sm font-bold">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-primary">{currentStatus.progress}%</span>
                </div>
                <Progress value={currentStatus.progress} className="h-3 rounded-full" />

                <div className="grid grid-cols-4 gap-1 relative pt-2">
                    {Object.entries(statuses).map(([key, value]) => {
                        const Icon = value.icon
                        const isActive = currentStatus.progress >= value.progress
                        const isCurrent = order.status === key
                        return (
                            <div key={key} className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${isCurrent ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-110' : isActive ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-muted border-muted text-muted-foreground opacity-50'}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className={`text-[10px] text-center font-bold uppercase tracking-tighter w-full ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                                    {value.label.split(' ')[0]}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b bg-muted/20 flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Order Details</h4>
                    <span className="text-[10px] font-medium text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="p-5 space-y-4">
                    <div className="text-sm space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Package className="w-4 h-4 text-primary" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Customer</p>
                                <p className="font-semibold leading-none">{order.customerName}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Truck className="w-4 h-4 text-primary" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Delivery Address</p>
                                <p className="font-semibold text-xs leading-tight">{order.customerAddress}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-dashed">
                        {order.items.map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-[10px] font-bold">{item.quantity}</span>
                                    <span className="font-medium">{item.menuItem.name}</span>
                                </div>
                                <span className="font-mono text-xs font-bold">₹{(Number(item.price) * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center pt-3 border-t border-solid border-muted">
                            <span className="text-sm font-bold">Total Paid</span>
                            <span className="text-xl font-black text-primary">₹{Number(order.totalAmount).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
