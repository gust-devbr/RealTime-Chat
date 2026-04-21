'use client'

import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function PrivateLayout({ children }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />

                <SidebarInset>
                    <main className="h-full">
                        <SidebarTrigger className="mt-4 ml-2" />
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}