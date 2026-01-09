"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Dashboard
                </h2>
                <div className="flex items-center space-x-2">
                    <Button>Download Report</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600">+20.1%</span> from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2,350</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600">+180.1%</span> from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600">+19%</span> from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600">+201</span> since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            You have 265 activities this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {[
                            { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
                            { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
                            { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
                            { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
                            { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                                    {item.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">{item.email}</p>
                                </div>
                                <div className="ml-auto font-medium">{item.amount}</div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="col-span-3 hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Manage your workspace efficiently
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button className="w-full justify-start" variant="outline">
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            Create New Project
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <Users className="mr-2 h-4 w-4" />
                            Invite Team Members
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <Activity className="mr-2 h-4 w-4" />
                            View Analytics
                        </Button>

                        <Separator className="my-4" />

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Storage Used</span>
                                <span className="font-medium">45.2 GB / 100 GB</span>
                            </div>
                            <Progress value={45} className="h-2" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">API Calls</span>
                                <span className="font-medium">8,234 / 10,000</span>
                            </div>
                            <Progress value={82} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                    <CardTitle>Project Status</CardTitle>
                    <CardDescription>
                        Overview of your current projects
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: "Website Redesign", status: "In Progress", progress: 65, color: "bg-blue-500" },
                            { name: "Mobile App Development", status: "In Progress", progress: 40, color: "bg-purple-500" },
                            { name: "API Integration", status: "Completed", progress: 100, color: "bg-green-500" },
                            { name: "Database Migration", status: "Planning", progress: 15, color: "bg-yellow-500" },
                        ].map((project, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{project.name}</span>
                                        <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                                            {project.status}
                                        </Badge>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
