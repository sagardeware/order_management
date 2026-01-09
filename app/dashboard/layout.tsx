import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 w-full">
                <div className="flex items-center gap-2 border-b px-4 py-2">
                    <SidebarTrigger />
                    <div className="flex-1" />
                    <ThemeToggle />
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}
