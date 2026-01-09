"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Github, Mail } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login - in real app, you'd validate credentials
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <Card className="w-full max-w-md relative backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 shadow-2xl border-slate-200 dark:border-slate-800">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-center text-base">
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <label
                                    htmlFor="remember"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me
                                </label>
                            </div>
                            <Button variant="link" className="px-0 text-purple-600 hover:text-purple-700">
                                Forgot password?
                            </Button>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            className="transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                        </Button>
                        <Button
                            variant="outline"
                            className="transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-center text-muted-foreground">
                        Don't have an account?{" "}
                        <Button variant="link" className="px-1 text-purple-600 hover:text-purple-700">
                            Sign up
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
